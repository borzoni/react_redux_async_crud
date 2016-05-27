import {
	FETCH_ORDERS_IN_PROGRESS, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, CREATE_ORDER_IN_PROGRESS, CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, FETCH_ORDER_IN_PROGRESS,FETCH_ORDER_SUCCESS, FETCH_ORDER_FAILURE, UPDATE_ORDER_IN_PROGRESS, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE, DELETE_ORDER_IN_PROGRESS, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE,UPDATE_ORDER_STATUS_IN_PROGRESS, PREPARE_FORM
} from '../constants/ActionTypes';

import order from './order_reducer'


	const INITIAL_STATE = {orderList: {orders: [], error:null, loading: false, statuses:[]}, 
	  current: {error: null, loading: false, value: null}}; 
	
// current  - order of interest, just for easytracking the order with which we are working(it's convinient even when we return to the main view, as we may need the results for notifications or smth else, and it's good that we can easily track the last item, we worked with, so we don't set it to null, even when we return to collection view). We can also update collection with  a reducer composition, but it's of no use since we refetch from backend on every meaningful action.

//in current: value - is the value from api(primarly used in forms to decide whether we need to render initial values or not). Form value we can get from form reducer from redux-form.

//In another situation it may be better to store all metadata in collection(here - orderList) and update it with a separate reducer via reducer 
// composition, as it is shown for status updates success path(we don't redirect or change route in this action, just sync with backend and update current collection without refetching, as we can easily get the data of interest without fetching the whole list).

//The borderline is as simple, as how much sync u need for the component of the interest. In our case, we have a collection view and updaters, which sync all the work with backend, after this we just return to the collection view, and remount/refetch. So we don't need to track changes in our list, because we refetch the new data on every meaningfull action.

//When we have a component/page where we can/need to stay out of sync with backend for a meaningfull time(as an example - a rich editing tool, text editor, complex components with "save when u are done" logic), we use more of the reducer composition style. 

const deleteFromOrders = (state, order) => {
  let idx = _.findIndex(state.orderList.orders, {id: order.id})
  return [...state.orderList.orders.slice(0,idx), ...state.orderList.orders.slice(idx+1)]
}
export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_ORDERS_IN_PROGRESS:
  	return { ...state, orderList: {orders:[], error: null, loading: true}, current: {...state.current, error: null, loading: false, value: null}}; 
  case FETCH_ORDERS_SUCCESS:
    return { ...state, orderList: {orders: action.payload.data.orders, error:null, loading: false,  statuses: action.payload.data.statuses}};
  case FETCH_ORDERS_FAILURE:
    return { ...state, orderList: {order: [], error: action.payload.message, loading: false }};  
  
  case FETCH_ORDER_IN_PROGRESS:
    return { ...state,  current: {...state.current, error: null, loading: true, value: null} }; 
  case FETCH_ORDER_SUCCESS:
    return { ...state, current: {...state.current, loading: false, value: action.payload.data}}; 
  case FETCH_ORDER_FAILURE:
    return { ...state, current: {...state.current, error: action.payload.message, loading: false}};    
  
  case CREATE_ORDER_IN_PROGRESS:
    return { ...state,  current: {...state.current, error: null, loading: true, value: null} };
  case CREATE_ORDER_SUCCESS:
     return { ...state,  current: {...state.current, loading: false, value: action.payload.data}};   
  case CREATE_ORDER_FAILURE:
     return { ...state, current: {...state.current, error: action.payload.message, loading: false}};
  
  case UPDATE_ORDER_IN_PROGRESS:
    return { ...state,  current: {...state.current, error: null, loading: true}}; //igore is true, show edited form data
  case UPDATE_ORDER_SUCCESS:
     return { ...state,  current:{ ...state.current, loading: false, value: action.payload.data}};   
  case UPDATE_ORDER_FAILURE:
     return { ...state, current: { ...state.current, error: action.payload.message, loading: false}}; //ignore is true, show edited form data
  
  case DELETE_ORDER_IN_PROGRESS:
    return { ...state,  current:{...state.current,  error: null, loading: true, value: action.payload.data }}; //here data is an id, it's enough if we want to show a spinner
  case DELETE_ORDER_SUCCESS:
     return { ...state, orderList: {...state.orderList, orders: deleteFromOrders(state, action.payload.data)}, current:{ ...state.current, loading: false, value: action.payload.data}}; 
  case DELETE_ORDER_FAILURE:
     return { ...state, current: {...state.current, error: action.payload.message, loading: false}};   
  
  case UPDATE_ORDER_STATUS_IN_PROGRESS: 
    return { ...state,  current:{ ...state.current, error: null, loading: true, value: action.payload.data,}}; //data is an id and a new status  
  case UPDATE_ORDER_STATUS_SUCCESS:
    return { ...state, orderList: {...state.orderList, orders: state.orderList.orders.map(o => order(o, action))}, current:{...state.current, loading: false, value: action.payload.data}};  
  case UPDATE_ORDER_STATUS_FAILURE:
    return { ...state, current: { ...state.current, error: action.payload.message, loading: false}}; 
    
  case PREPARE_FORM:
     return { ...state, current: { ...state.current, error: null, loading: false, value: null}};          
  default:
    return state;
  }
}
