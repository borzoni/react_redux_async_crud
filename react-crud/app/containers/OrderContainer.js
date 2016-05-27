import { connect } from 'react-redux'
import {deleteOrder, updateOrderStatus, renderForm } from '../actions/orders';

import Order from '../components/orders_list/Order';


const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: (id) => dispatch(deleteOrder(id)),
    updateOrderStatus:(id, evt) => dispatch(updateOrderStatus(id, evt.target.value)),
    renderForm:(path) => dispatch(renderForm(path))
  }
}


const OrderContainer = connect(null, mapDispatchToProps)(Order)

export default OrderContainer;
