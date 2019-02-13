import { fetchLink } from './helper';

export const getAllPosts = () => {
  const link = {
    href: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET'
  };

  return fetchLink(link);
};
