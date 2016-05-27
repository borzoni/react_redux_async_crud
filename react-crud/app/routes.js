import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import OrdersIndex from './pages/OrdersIndex';
import OrderNew from './pages/OrderNew';
import OrderEdit from './pages/OrderEdit';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={OrdersIndex} />
    <Route path="/orders/new" component={OrderNew} />
    <Route path="/orders/:id/edit" component={OrderEdit} />
  </Route>
);
