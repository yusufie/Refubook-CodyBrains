import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from '../Signuppart';

jest.mock('react-router-dom', () => ({
  Link: 'Link',
}));
jest.mock('react-redux', () => ({
  useSelector: () => ({
    user: {
      name: 'test',
    },
  }),
}));

describe('SignUp', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SignUp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
