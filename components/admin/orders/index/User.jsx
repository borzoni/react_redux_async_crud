import React from 'react'

class User extends React.Component {

  render() {
    
    if (!this.props.data.name) {
      return (
        <td>Не указан!</td>
      )
    }
    return (
      <td>
        <div className="row valign-wrapper">
          <div className="col s2">
            <i className="material-icons vertical-align-middle">perm_identity</i>
          </div>
          <div className="col s10">
            {this.props.data.name.first_name + ' ' + this.props.data.name.last_name}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {this.props.data.telephone + ' | ' + this.props.data.email}
          </div>
        </div>
      </td>
    )
  }
}

export default User;
