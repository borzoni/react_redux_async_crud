const Receipt = ({ id, quantity}) => (
  <li className="collection-item">
    <p>
      {id}
      <span className="secondary-content">{quantity}</span>
    </p>
  </li>  
)
export default Receipt

