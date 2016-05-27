import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import OrderReducer from './orders_reducer';
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  orders: OrderReducer,
  form: formReducer, // <-- redux-form
  routing
});

export default rootReducer;
