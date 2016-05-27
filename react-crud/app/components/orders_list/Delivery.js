const Delivery = ({ id, shipping}) => {
  if (!id) {
    return (
      <p>Не указан!</p>
    )
  }
  return (<div>
      {id}
      <p>{shipping}</p>
    </div>
  )
}
export default Delivery;
