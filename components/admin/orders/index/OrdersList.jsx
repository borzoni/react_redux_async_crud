import React from 'react';
import Order from './Order';

class OrdersList extends React.Component {

  constructor(props) {
    super(props)
    this.state = { data: [] }
    this.updateParent = this.updateParent.bind(this)
  }

  updateParent() {
    $.ajax({
      url: '/api/v1/orders',
      beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', 'Token df7db80f8e8c4784dc548208eb3fd188');
                xhr.setRequestHeader('Accept', 'application/json');
              },
      success: data => this.setState({ data: data }),
      error: error => console.log(error)
    })
  }
  componentDidMount() {

    $.ajax({
      url: '/api/v1/orders',
      beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', 'Token df7db80f8e8c4784dc548208eb3fd188');
                xhr.setRequestHeader('Accept', 'application/json');
              },
      success: data => this.setState({ data: data }),
      error: error => console.log(error)
    })
  }

  render() {
    return (
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
            <Order data = { this.state.data } updateParent = { this.updateParent }  />
          </table>
        </div>
      </div>
    )
  }

}

export default OrdersList;
