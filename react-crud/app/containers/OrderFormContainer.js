import OrderForm from '../components/order_form/OrderForm.js';
import {
  createOrder, resetNewOrder, fetchOrder, updateOrder
}
from '../actions/orders';
import {reduxForm} from 'redux-form'

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (data) => dispatch(createOrder(data)),
    resetMe: () => {
      dispatch(resetNewOrder());
    },
    fetchOrder: (id) => dispatch(fetchOrder(id)),
    updateOrder: (data) => dispatch(updateOrder(data)),
  }
}


function mapStateToProps(state, ownProps) {
  return {
    error_notification: state.orders.current.error,
    initialValues: state.orders.current.value,
    fetching: state.orders.current.loading
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'OrderForm',
  fields: ['delivery.shipping', 'delivery.id', 'id', 'receipts[].id', 'receipts[].quantity','receipts[].unit_price',]
}, mapStateToProps, mapDispatchToProps)(OrderForm);
