import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import illustration from '../../assets/hero-illustration.svg';

const Hero = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  return (
    <section className="container mx-auto my-10 xl:my-0 md:my-8 px-4 md:px-16 flex flex-col-reverse  md:flex-row justify-evenly items-center">
      <div className="flex flex-col items-center lg:items-start justify-center px-2 md:px-0">
        <h1 className="text-5xl xl:text-6xl font-extrabold text-refubookBlue mb-4 text-center lg:text-left">
          {t('Refubook')}
        </h1>
        <h2 className="text-4xl xl:text-5xl font-medium text-refubookRed mb-6 lg:w-2/6 leading-none text-center lg:text-left">
          {t('Express_Freely')}
        </h2>
        <p className="text-base text-grey-800 mb-8 w-full lg:w-3/5 text-center lg:text-left">
          {t('Hero_Text')}
        </p>
        {user ? (
          <Link to="/profile">
            <button
              type="button"
              className="py-1 px-3 md:py-2 md:px-9 bg-refubookBlue text-refubookWhite font-bold text-lg md:text-xl  rounded-full shadow-lg hover:bg-refubookWhite hover:text-refubookBlack transition duration-500 ease-in-out"
            >
              {t('Create_Blog_Post')}
            </button>
          </Link>
        ) : (
          <Link to="/signup">
            <button
              type="button"
              className="py-1 px-3 md:py-2 md:px-9 bg-refubookBlue text-refubookWhite font-bold text-lg md:text-xl  rounded-full shadow-lg hover:bg-refubookWhite hover:text-refubookBlack transition duration-500 ease-in-out"
            >
              {t('Sign_Up')}
            </button>
          </Link>
        )}
      </div>
      <div className="flex justify-center lg:justify-end ">
        <img src={illustration} alt="" />
      </div>
    </section>
  );
};

export default Hero;
