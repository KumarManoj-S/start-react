import { fetchLink } from './helper';

export const getAllPosts = () => {
  const getUserInfoLink = {
    href: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET'
  };

  return fetchLink(getUserInfoLink);
};
