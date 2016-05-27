const User = ({ name, telephone, email}) => {
  if (!name) {
    return (<p>Не указан!</p>)
  }
  return (
    <div>
      <div className="row valign-wrapper">
        <div className="col s2">
          <i className="material-icons vertical-align-middle"></i>
        </div>
        <div className="col s10">
          {name.first_name + ' ' + name.last_name}
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          {telephone + ' | ' + email}
        </div>
      </div>
    </div>  
  )
}
export default User;
