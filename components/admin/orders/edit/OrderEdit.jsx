import React from 'react';

class Receipt extends React.Component {
  render() {
    console.log(this.props.data)
    return(
      <tbody>
        {this.props.data.map(
          receipt =>
          <tr key={receipt.id}>
            <td>
              <div className="row">
                <div className="input-field col s5">
                  <input type="text" id="id" name="id" ref="id" defaultValue={receipt.id} className="validate" />
                  <label className="active" for="id">Товар</label>
                </div>
                <div className="input-field col s1">
                  <input type="text" id="quantity" name="quantity" ref="quantity" defaultValue={receipt.quantity} className="validate" />
                  <label className="active" for="quantity">Количество</label>
                </div>
                <div className="input-field col s1">
                  <input type="text" id="unit_price" ref="unit_price" name="unit_price" defaultValue={receipt.unit_price} className="validate" />
                  <label className="active" for="unit_price">Цена</label>
                </div>
                <div className="input-field col s1">
                  <input type="text" id="unit_price" ref="unit_price" name="unit_price" defaultValue={receipt.unit_price} className="validate" />
                  <label className="active" for="unit_price">Цена</label>
                </div>
              </div>
            </td>

          </tr>
        )}
      </tbody>
    )
  }
}




class OrderEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  componentDidMount() {
    console.log(this.props.params.orderId);
    $.ajax({
      url: `/api/v1/orders/${this.props.params.orderId}`,
      beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', 'Token df7db80f8e8c4784dc548208eb3fd188');
        xhr.setRequestHeader('Accept', 'application/json');
      },
      success: data => (console.log(data), this.setState({ data: data })),
      error: error => console.log(error)
    })

  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('кликнули!')
    let data = {
      order: {
        status: 'pendingorder',
        subtotal: 1000,
        shipping: this.refs.shipping.value,
        delivery_id: this.refs.delivery_id.value,
      }
    }
    console.log(data)



    $.ajax({
      method: 'PUT',
      url: `/api/v1/orders/${this.props.params.orderId}`,
      data: data,
      beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', 'Token df7db80f8e8c4784dc548208eb3fd188');
        xhr.setRequestHeader('Accept', 'application/json');
      },
      success: data => (console.log(data), this.setState({ data: data })),
      error: error => console.log(error)
    })


  }


  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        { this.state.data.map(order =>
          <div key={order.id}>
            {order.id}
            {order.status}
            <div className="row">
              <div className="col s12">
                {order.shipping}
                <p>{order.delivery.id}</p>
                <div className="input-field col s5">
                  <input type="text" name="delivery_id" ref="delivery_id" defaultValue={order.delivery.id} className="validate" />
                  <label className="active" for="delivery_id">Доставка</label>
                </div>

                <div className="input-field col s5">
                  <input type="text" name="shipping" ref="shipping" defaultValue={order.shipping} className="validate" />
                  <label className="active" for="shipping">Стоимость доставки</label>
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Товар</th>
                </tr>
              </thead>
              <Receipt data = {order.receipts} />
            </table>
            <button className="btn" type="submit">Сохранить</button>
          </div>

        )}
      </form>
    )
  }

}

export default OrderEdit;
