const order = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ORDER_STATUS_SUCCESS':
      if (state.id !== action.payload.data.id){
        return state
      }
      return {...state, ...action.payload.data}   
   
    default:
      return state
  }
}

export default order;
