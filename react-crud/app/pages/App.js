import React from 'react';
import { Component } from 'react';
import Root from '../components/App';

export default class App extends Component {
  render() {
    return (
    <Root>
      {this.props.children}
    </Root>);
  }
}
