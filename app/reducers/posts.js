import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_DONE,
  GET_ALL_POSTS_FAILED
} from '../actions/posts';

import {statusTypes} from '../constants/status';

const initialState = {
  status: statusTypes.NONE,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        status: statusTypes.IN_PROGRESS
      };
    case GET_ALL_POSTS_DONE:
      return {
        ...state,
        status: statusTypes.SUCCESS,
        data: action.payload,
      };
    case GET_ALL_POSTS_FAILED:
      return {
        ...state,
        status: statusTypes.FAILED,
      };
    default:
      return state;
  }
};
