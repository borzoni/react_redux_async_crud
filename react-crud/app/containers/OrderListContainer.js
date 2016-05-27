import { connect } from 'react-redux'
import { fetchOrders, deleteOrder } from '../actions/orders';

import OrderList from '../components/orders_list/OrderList';


const mapStateToProps = (state) => {
  console.log(state)
  return { 
    orderList: state.orders.orderList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders())
  }
}


const OrderListContainer = connect(mapStateToProps, mapDispatchToProps)(OrderList)

export default OrderListContainer
