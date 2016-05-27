import * as types from '../constants/ActionTypes'
import api from '../api/orders'
import dic from '../api/dictionaries'
import { push } from 'react-router-redux';

export function fetchOrders() {
  return (dispatch) => {
    dispatch(fetchOrdersInProgress());
    return Promise.all([api.fetchOrders(),dic.fetchStatuses()]).then(
      items => dispatch(fetchOrdersSuccess(items)),
      error => dispatch(fetchOrdersFailure(error))
    )
  };
}

function fetchOrdersInProgress() {
  return {
    type: types.FETCH_ORDERS_IN_PROGRESS
  };
}

function fetchOrdersSuccess(items) {
  return {
    type: types.FETCH_ORDERS_SUCCESS,
    payload: {data: {orders: items[0].orders, statuses: items[1].statuses}}
  };
}

function fetchOrdersFailure(error) {
  return {
    type: types.FETCH_ORDERS_FAILURE,
    payload: error
  };
}

export function resetNewOrder() {
  return {
    type: RESET_NEW_ORDER
  }
};

function createOrderSuccess(data) {
  return {
    type: types.CREATE_ORDER_SUCCESS,
    payload: data
  };
}

function createOrderFailure(error) {
  return {
    type: types.CREATE_ORDER_FAILURE,
    payload: error
  };
}

function createOrderInProgress(error) {
  return {
    type: types.CREATE_ORDER_IN_PROGRESS,
  };
}

export function createOrder(data) {
  return (dispatch) => {
    dispatch(createOrderInProgress());
    return api.createOrder(data).then(
      items => {dispatch(createOrderSuccess(items)), dispatch(push("/"))},
      error => dispatch(createOrderFailure(error))
    )
  };
};

function updateOrderSuccess(data) {
  return {
    type: types.UPDATE_ORDER_SUCCESS,
    payload: data
  };
}

function updateOrderFailure(error) {
  return {
    type: types.UPDATE_ORDER_FAILURE,
    payload: error
  };
}

export function updateOrder(data) {
  return (dispatch) => {
    dispatch(updateOrderInProgress())
    console.log("UPDATE")
    return api.updateOrder(data).then(
      items => {dispatch(updateOrderSuccess(items)), dispatch(push("/"))},
      error => dispatch(updateOrderFailure(error))
    )
  };
};

function updateOrderInProgress() {
  return {
    type: types.UPDATE_ORDER_IN_PROGRESS,
  };
}


export function fetchOrder(id) {
  return (dispatch) => {
    dispatch(fetchOrderInProgress());
    return api.fetchOrder(id).then(
      items => dispatch(fetchOrderSuccess(items)),
      error => dispatch(fetchOrderFailure(error))
    )
  };
};

function fetchOrderSuccess(data) {
  return {
    type: types.FETCH_ORDER_SUCCESS,
    payload: {data: data}
  };
}

function fetchOrderFailure(error) {
  return {
    type: types.FETCH_ORDER_FAILURE,
    payload: error
  };
}

function fetchOrderInProgress() {
  return {
    type: types.FETCH_ORDER_IN_PROGRESS
  };
}

export function deleteOrder(id) {
  return (dispatch) => {
    dispatch(deleteOrderInProgress(id));
    return api.deleteOrder(id).then(
      items => dispatch(deleteOrderSuccess(items)),
      error => dispatch(deleteOrderFailure(error))
    ).catch((e)=>{console.log(e.stack)})
  };
};

function deleteOrderInProgress(data) {
  return {
    type: types.DELETE_ORDER_IN_PROGRESS,
    payload: {data: data}
  };
}

function deleteOrderSuccess(data) {
  return {
    type: types.DELETE_ORDER_SUCCESS,
    payload: {data: data}
  };
}

function deleteOrderFailure(error) {
  return {
    type: types.DELETE_ORDER_FAILURE,
    payload: error
  };
}

export function updateOrderStatus(id, status) {
  return (dispatch) => {
    dispatch(updateOrderStatusInProgress(id));
    return api.updateOrderStatus(id, status).then(
      items => dispatch(updateOrderStatusSuccess(items)),
      error => dispatch(updateOrderStatusFailure(error))
    )
  };
};

function updateOrderStatusInProgress(data) {
  return {
    type: types.UPDATE_ORDER_STATUS_IN_PROGRESS,
    payload: {data: data}
  };
}

function updateOrderStatusSuccess(data) {
  return {
    type: types.UPDATE_ORDER_STATUS_SUCCESS,
    payload: {data: data}
  };
}

function updateOrderStatusFailure(error) {
  return {
    type: types.UPDATE_ORDER_STATUS_FAILURE,
    payload: error
  };
}

export function renderForm(path) {
  return (dispatch) => {
      dispatch(prepareForm())
      dispatch(push(path))
  }
};

function prepareForm() {
  return {
    type: types.PREPARE_FORM
  };
}

