import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { collection, getDocs } from 'firebase/firestore';
import parse from 'html-react-parser';
import { AiOutlinePlus } from 'react-icons/ai';
import { db } from '../../services/firebase.config';

const UserBlogPosts = ({ user }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const postOfUsers = blogs.filter((blog) => blog.author.id === user.uid);
      setBlogPosts(postOfUsers);
      setLoading(false);
    };

    getBlogs();
  }, []);

  const defaultImageUrl =
    'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

  return (
    <div className="bg-refubookWhite mt-32 mb-16  ">
      {loading ? (
        <div className="text-center py-12 px-4 mx-auto flex items-center justify-center container sm:px-6 lg:px-8 bg-refubookWhite">
          <svg
            id="spinner"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            x="0"
            y="0"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4699C2"
              d="M24 42.1c-1.7 0-3.1-1.4-3.1-3.1 0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1zM24 13.4c-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4 2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.4 4.4zM8.4 24c0-.3.3-.6.6-.6s.6.3.6.6-.3.6-.6.6-.6-.3-.6-.6zM35 24c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zM37.9 37.9c-1.6 1.6-4.2 1.6-5.8 0-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0 1.6 1.6 1.6 4.2 0 5.8zM15.2 15.2c-1.2 1.2-3.2 1.2-4.4 0-1.2-1.2-1.2-3.2 0-4.4 1.2-1.2 3.2-1.2 4.4 0 1.2 1.2 1.2 3.2 0 4.4zM32.2 15.8c-1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0 1.6 1.6 1.6 4.1 0 5.7-1.6 1.6-4.2 1.6-5.7 0z"
            />
          </svg>
        </div>
      ) : (
        <div className="md:container mx-auto px-4 sm:px-6 lg:px-8 max-w-sm">
          <div className="flex justify-between items-center mb-5 px-5">
            <h2 className="md:text-2xl text-lg font-semibold text-refubookBlack">
              {t('Your_Blog_Posts')}
            </h2>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-refubookActiveNav text-refubookWhite"
              onClick={() => navigate('/write')}
            >
              <AiOutlinePlus className="text-2xl" />
            </button>
          </div>

          {blogPosts?.length > 3 ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              grabCursor
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper w-full"
            >
              {blogPosts?.map((post) => (
                <SwiperSlide
                  key={post.id}
                  className="border-2 border-refubookGray rounded-lg p-2 shadow-sm max-w-xs md:max-w-3xl"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-40 w-full object-cover rounded"
                      src={post.headerPhoto || defaultImageUrl}
                      alt=""
                    />
                  </div>
                  <div className=" bg-refubookWhite p-3 flex flex-col justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-refubookActiveNav">
                        {new Date(
                          post.date.seconds * 1000
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-xl font-semibold text-refubookBlack">
                        {post.title}
                      </p>
                      <div className="flex flex-col max-h-36">
                        <div className="ql-editor truncate ">
                          {parse(post.content, {
                            replace: (domNode) => {
                              if (domNode.name === 'img') {
                                domNode.attribs.class += ' hidden';
                              } else if (domNode.name === 'p') {
                                domNode.attribs.class += ' text-sm';
                              } else if (domNode.name === 'h1') {
                                domNode.attribs.class +=
                                  ' text-2xl font-semibold';
                              } else if (domNode.name === 'h2') {
                                domNode.attribs.class += ' text-xl font-medium';
                              }

                              return domNode;
                            },
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className="sr-only">{user?.displayName}</span>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user?.photoURL}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-refubookLightBlack">
                            {user?.displayName}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className=" mt-2 bg-refubookActiveNav text-refubookWhite px-4 py-2 rounded-md text-sm font-medium hover:bg-refubookActiveNavHover focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        <span className="sr-only">Read more</span>
                        <p className="text-sm font-medium text-refubookWhite">
                          Read more
                        </p>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto">
              {blogPosts?.map((post) => (
                <div
                  key={post.id}
                  className="border-2 border-refubookGray rounded-lg p-2 shadow-sm max-w-xs md:max-w-3xl flex flex-col justify-between"
                >
                  <div className="flex-shrink-0 flex flex-col gap-2">
                    <img
                      className="h-40 w-full object-cover rounded"
                      src={post.headerPhoto || defaultImageUrl}
                      alt=""
                    />
                    <p className="text-sm font-medium text-refubookActiveNav">
                      {new Date(post.date.seconds * 1000).toLocaleDateString()}
                    </p>

                    <p className="md:text-2xl text-lg text-center mb-3 border-b font-semibold text-refubookBlack">
                      {post.title}
                    </p>
                    <div className="ql-editor ">
                      {parse(post.content, {
                        replace: (domNode) => {
                          if (domNode.name === 'img') {
                            domNode.attribs.class += ' hidden';
                          } else if (domNode.name === 'p') {
                            domNode.attribs.class += ' text-sm truncate';
                          } else if (domNode.name === 'h1') {
                            domNode.attribs.class += ' text-2xl font-semibold';
                          } else if (domNode.name === 'h2') {
                            domNode.attribs.class += ' text-xl font-medium';
                          }

                          return domNode;
                        },
                      })}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{user?.displayName}</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user?.photoURL}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-refubookLightBlack">
                          {user?.displayName}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className=" mt-2 bg-refubookActiveNav w-fit text-refubookWhite px-4 py-2 rounded-md text-sm font-medium hover:bg-refubookActiveNavHover focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <span className="sr-only">Read more</span>
                      <p className="text-sm font-medium text-refubookWhite">
                        Read more
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {blogPosts?.length === 0 ||
        (!blogPosts && (
          <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-refubookWhite">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No Blog Posts
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new blog post.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => navigate('/write')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <AiOutlinePlus
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Create Blog Post
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserBlogPosts;
