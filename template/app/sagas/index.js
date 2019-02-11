import { all } from 'redux-saga/effects';
import postsActionWatcher from './posts';

export default function* rootSaga() {
  yield all([
    postsActionWatcher(),
  ]);
}
