import {
  put, takeLatest, call
} from 'redux-saga/effects';
import { GET_ALL_POSTS, GET_ALL_POSTS_DONE, GET_ALL_POSTS_FAILED } from '../actions/posts';
import { getAllPosts } from '../api/posts';

function* fetchAllPosts() {
  try {
    const data = yield call(getAllPosts);
    yield put({ type: GET_ALL_POSTS_DONE, payload: data });
  } catch (err) {
    yield put({ type: GET_ALL_POSTS_FAILED });
  }
}

export default function* actionWatcher() {
  yield [
    takeLatest(GET_ALL_POSTS, fetchAllPosts),
  ];
}
