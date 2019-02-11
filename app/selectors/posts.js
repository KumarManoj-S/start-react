import { statusTypes } from '../constants/status';

export const getAllPosts = (state) => {
  const { posts } = state;
  if (posts && posts.status === statusTypes.SUCCESS) return posts.data;
  return undefined;
};

export const isGetPostsAPIRunning = (state) => {
  const { posts } = state;
  if (posts && posts.status === statusTypes.IN_PROGRESS) return true;
  return false;
};
