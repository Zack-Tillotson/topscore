import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import LoggerMiddleware from 'redux-logger';
import rootReducer from './reducer';

const middleware = [
  ThunkMiddleware
];

if(__DEBUG__) {
  middleware.push(LoggerMiddleware({
    level: 'info',
    predicate: (state, action) => true
  }));
}

const finalCreateStore = compose(
  applyMiddleware(...middleware)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducer', () =>
      store.replaceReducer(require('./reducer')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}