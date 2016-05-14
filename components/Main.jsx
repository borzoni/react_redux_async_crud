import React from 'react';
import ReactDOM from 'react-dom';
import OrdersList from '../components/admin/orders/index/OrdersList';
import OrderEdit from '../components/admin/orders/edit/OrderEdit';
import Materialize from 'react-materialize';

class Main extends React.Component {

  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    )
  }
}

export default Main;
