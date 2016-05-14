import React from 'react'
import User from './User';
import { Router, Link, browserHistory, Route, IndexRoute } from 'react-router';
import Moment from 'moment';
import Locale from 'moment/locale/ru';

class Delivery extends React.Component {
  render() {
    if (!this.props.data.delivery) {
      return (
        <td>Не указан!</td>
      )
    }
    return (
      <td>
        {this.props.data.delivery.name}
        <p>{this.props.data.shipping}</p>
      </td>
    )
  }
}


class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let data = {
      order: {
        status: event.target.value
      }
    }
    $.ajax({
      method: 'PUT',
      url: `/api/v1/orders/${event.target.id}`,
      data: data,
      beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', 'Token df7db80f8e8c4784dc548208eb3fd188');
        xhr.setRequestHeader('Accept', 'application/json');
      },
      success: data => (console.log(data), this.props.updateParent()),
      error: error => console.log(error)
    })

  }


  componentDidUpdate() {
    $('select').material_select()
    // $(this.refs.status).on('change',this.handleChange);
    // console.log(this.refs.status)
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: `/api/v1/orders/statuses`,
      beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', 'Token df7db80f8e8c4784dc548208eb3fd188');
        xhr.setRequestHeader('Accept', 'application/json');
      },
      success: data => (console.log(data), this.setState({ statuses: data })),
      error: error => console.log(error)
    })
  }


  render() {
    return (
      <tbody>
        {
          this.props.data.map(
            order =>
            <tr key={order.id}>
              <td>
                # {order.id}
                <p>{Moment(order.created_at).format('Do MMMM Y, hh:mm:ss')}</p>
                <Link to={`/admin/orders/${order.id}/edit`}>ред.</Link>

              </td>
              <td>
                <div className="row">
                  <div className="input-field">
                    <p>Статус заказа: {order.status}</p>
                    <select value={ order.status } id={ order.id } onChange={ this.handleChange } className="browser-default" >
                      {
                        this.state.statuses.map(
                          status =>
                          <option value={status.key}>{status.value}</option>
                        )
                      }
                      <option value='neworder'>Новый заказ</option>
                      <option value='pendingorder'>В обработке</option>
                      <option value='sentorder'>Отправлен</option>
                      <option value='completedorder'>Выполнен</option>
                    </select>
                  </div>
                </div>
              </td>
              <User data = { order.user } />
              <td>
                <div className="row">
                  <div className="col s12">
                    {order.total}
                  </div>
                </div>
              </td>
              <Delivery data = { order } />
              <td>
                <ul className="collection with-header">
                  <li className="collection-header"><p>В заказе:</p></li>
                  {order.receipts.map(receipt =>
                    <li className="collection-item" key={receipt.id}>
                      <p>
                        {receipt.product.name}
                        <span className="secondary-content">{receipt.quantity}</span>
                      </p>
                    </li>
                  )}
                </ul>
              </td>
              <td>Наличными</td>
            </tr>
          )
        }
      </tbody>
    )
  }
}

export default Order;
