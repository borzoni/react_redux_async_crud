import React, { Component } from 'react';
import OrderContainer from '../../containers/OrderContainer'
import AddOrder from '../../containers/AddOrder';

class OrderList extends Component {
  componentWillMount() {
    this.props.fetchOrders();
  }
  
  
  renderOrders(orders, statuses) {
    return orders.map(order => (<OrderContainer key={order.id} {...order} statuses={statuses}/>))
  }
  
  
  render() {
    const { orders, loading, error, statuses } = this.props.orderList;
    if(loading) {
      return <div className="container"><h1>Orders</h1><h3>Loading...</h3></div>      
    } else if(error) {
      console.log(error)
      return <div className="alert alert-danger">Error: {error}</div>
    }
    return(
       <div className="container">
        <h1>Orders</h1>
        <AddOrder />
        <div className="row">
          <div className="col s12">
            <table className="floatThead bordered highlight">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Статус</th>
                  <th>Заказчик</th>
                  <th>Сумма заказа</th>
                  <th>Доставка</th>
                  <th>Заказ</th>
                  <th>Оплата</th>
                </tr>
              </thead>
              <tbody>
               { this.renderOrders(orders, statuses) }
              </tbody> 
            </table>     
          </div>
        </div>
      </div>)
  }
} 
export default OrderList;
