import React from 'react'

class Receipt extends React.Component {

  render() {
    return (
      <tr>
        <td><b>#{this.props.id}</b> {this.props.created}</td>

      </tr>
    )
  }
}

export default Receipt;
