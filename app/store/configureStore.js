import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';
import historyObject from '../history';

export const history = historyObject;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const configureStore = (initialState) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(sagas);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};


export default configureStore;
