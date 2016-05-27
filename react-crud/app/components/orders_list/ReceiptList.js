import React from 'react'
import Receipt from './Receipt'

const ReceiptList = ({receipts}) => {
  if (receipts && receipts.length > 0) {
    return(<ul className="collection with-header">
    <li className="collection-header"><p>В заказе:</p></li>
      {receipts.map(receipt =>
        <Receipt
          key={receipt.id}
          {...receipt}
        />
      )} 
  </ul>)
  }
  else{
    return(<p>Не указан!</p>)
  }
}

export default ReceiptList
