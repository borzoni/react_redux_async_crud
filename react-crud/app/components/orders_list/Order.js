import {Link} from 'react-router';
import React, { Component } from 'react';
import Moment from 'moment';
import Locale from 'moment/locale/ru';
import OrderList from './OrderList'
import Delivery from './Delivery'
import ReceiptList from './ReceiptList'
import User from './User'

class Order extends Component { 
  render() {
    const {  id, created_at, status, user, receipts, delivery, total, statuses } = this.props;
    return(
      <tr>
         <td>
           <p>{Moment(created_at).format('Do MMMM Y, hh:mm:ss')}</p>
           <a onClick={() => this.props.renderForm(`/orders/${id}/edit`)} style={{cursor: "pointer", margin: "10px"}}>ред</a>
           <a onClick={() => this.props.deleteOrder(id)} style={{cursor: "pointer", margin: "10px"}}>Удалить</a>
         </td>
         <td>
           <div className="row">
             <div className="input-field">
               <p>Статус заказа: {status}</p>
               <select value={ status } onChange={this.props.updateOrderStatus.bind(this, id)} id={ id } className="browser-default" >
                 {
                   statuses.map((status, idx) =>
                     <option key={idx} value={status.key}>{status.value}</option>
                   )
                 }
               </select>
             </div>
           </div>
         </td>
         <td>         
           <User {...user} />
         </td>         
         <td>
           <div className="row">
             <div className="col s12">
               {total}
             </div>
           </div>
         </td>
         <td>
           <Delivery {...delivery } />
         </td>  
         <td>
           <ReceiptList  receipts={receipts||[]} />
         </td>
         <td>     
         </td>
         <td>Наличными</td>
       </tr>
    );
  }
}
export default Order;    
