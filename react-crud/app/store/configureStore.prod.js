import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(history, initialState={}) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0

  const enhancer = applyMiddleware(thunkMiddleware, routerMiddleware(history));
  return createStore(rootReducer, initialState, enhancer);
};
