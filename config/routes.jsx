import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import OrdersList from '../components/admin/orders/index/OrdersList';
import OrderEdit from '../components/admin/orders/edit/OrderEdit';
import { Router, Link, browserHistory, Route, IndexRoute } from 'react-router';

export default (
  <Route path="/admin/orders" component={ Main }>
    <IndexRoute component={ OrdersList } />
    <Route path="/admin/orders" component={ OrdersList } />
    <Route path="/admin/orders/:orderId/edit" component={ OrderEdit } />
  </Route>
);
