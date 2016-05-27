let db = {orders: [
          {id:0, created_at: new Date(), status: 'pendingorder', user:{name: {first_name: "A", last_name: "B"}, telephone: "760342", email: "new@mail.ru"}, total: 356, delivery: {shipping: "2", id: "DDDD"} },
          {id:1, created_at: new Date(), status: 'sentorder', total: 358, delivery: {shipping: "1", id: "AAD"}} 
          ]}
let lastId = 1;          

export default {
  fetchOrders: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
           //reject({message: "invalid"});return
          console.log("successfully resolving");
          resolve({orders: [...db.orders]}); //or resolve({..db})
      }, 1000);
    })
  },
  createOrder: (order) => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
          //reject({message: "invalid"});return
          console.log("successfully resolving");
          lastId = lastId + 1;
          order = {...order, id: lastId, created_at: new Date()}
          db = {orders : [...db.orders, order]}
          resolve(order);
      }, 1000);
    })
  },
  fetchOrder: (id) => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
          //reject({message: "invalid"});return
          console.log("successfully resolving");
          let order = _.find(db.orders, {id: parseInt(id)})
          resolve({...order});
      }, 1000);
    })
  },
  updateOrder: (order) => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
          //reject({message: "invalid"});return
          console.log("successfully resolving");
          let idx = _.findIndex(db.orders, {id: order.id})
          db ={orders: [...db.orders.slice(0, idx), 
                        {...db.orders[idx], ...order},
                        ...db.orders.slice(idx + 1)]}             
          resolve({...db.orders[idx]});
      }, 1000);
    })
  },
  deleteOrder: (id) => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
          ///reject({message: "invalid"});return
          console.log("successfully resolving");
          let idx = _.findIndex(db.orders, {id: parseInt(id)})
          let order = {...db.orders[idx]}
          db ={orders: [...db.orders.slice(0, idx), 
                        ...db.orders.slice(idx + 1)]}             
          resolve(order);
      }, 1000);
    })
  },
  updateOrderStatus: (id, status) => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
          //reject({message: "invalid"});return
          console.log("successfully resolving");
          let idx = _.findIndex(db.orders, {id: parseInt(id)})
          let order = {...db.orders[idx]}
          order.status = status
          db ={orders: [...db.orders.slice(0, idx), 
                       order,
                        ...db.orders.slice(idx + 1)]}             
          resolve(order);
      }, 1000);
    })
  }
  
  
}
