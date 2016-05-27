import React from 'react';
import { connect } from 'react-redux'
import { renderForm } from '../actions/orders'

const AddTodo = ({dispatch}) => (
     <button className="btn btn-error" onClick={() => dispatch(renderForm("/orders/new"))} style={{cursor: "pointer", margin: "10px"}}>Добавить Заказ</button>
  )

export default connect()(AddTodo)

