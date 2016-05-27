import React, { Component } from 'react'
import { reduxForm, addArrayValue } from 'redux-form'
import {Link} from 'react-router';

class OrderForm extends Component {
  componentWillMount() {
    if (this.props.id) {this.props.fetchOrder(this.props.id)}
  }
  
  render() {
    const {
      addValue,
      fields: { delivery, receipts },
      handleSubmit,
      resetForm,
      error_notification,
      submitting,
      fetching
    } = this.props
    const action = (this.props.id ?  this.props.updateOrder.bind(this): this.props.createOrder.bind(this))
    return (<form className="form container" onSubmit={handleSubmit(action)}>
        {this.props.fetching && <div><h3>Processing...</h3></div> }
        {error_notification && <div className="alert alert-danger">Error: { error_notification}</div>}
        <div className="row">
          <h3>Обработка Заказа</h3>
          <div className="col s12">
            <div className="input-field col s5">
               <input type="text" {...delivery.id}  className="validate" />
               <label className="active" for="delivery_id">Доставка</label>
            </div>

            <div className="input-field col s5">
              <input type="text"  className="validate" {...delivery.shipping}/>
              <label className="active" for="shipping">Стоимость доставки</label>
            </div>
          </div>
          <h5>Товары</h5>
          <button type="button" className="btn" onClick={() => {
            receipts.addField()   
          }}><i/>Добавить товар
          </button>
          {!receipts.length && <div>Нет товаров</div>}
          {receipts.map((receipt, index) => <div key={index}>
              <label>Товар #{index + 1}</label>
              <div className="row">
                <div className="input-field col s5">
                  <input type="text"{...receipt.id} className="validate" />
                  <label className="active" for="id">Название</label>
                </div>
                <div className="input-field col s2">
                  <input type="text" {...receipt.quantity} className="validate" />
                  <label className="active" for="quantity">Кол-во</label>
                </div>
                <div className="input-field col s1">
                  <input type="text" {...receipt.unit_price} className="validate" />
                  <label className="active" for="unit_price">Цена</label>
                </div>
                <button type="button" className="btn col s2 btn-danger" onClick={() => {
                  receipts.removeField(index) 
                }}><i/> Удалить
                </button>
              </div> 
            </div>)}
        </div>
        <button type="submit" className="btn btn-primary"  style={{margin: 10 + 'px'}} disabled={submitting} >Сохранить</button>
        <Link to="/" className="btn btn-error"  style={{margin: 10 + 'px'}}>Отмена</Link>
      </form>);  
  }
}   

              

export default OrderForm;
