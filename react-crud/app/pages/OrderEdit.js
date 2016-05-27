import React, { Component } from 'react';
import OrderFormContainer from '../containers/OrderFormContainer';

class OrderEdit extends Component {
  render() {
    return (
        <OrderFormContainer id={this.props.params.id}/>
    );
  }
}


export default OrderEdit;
