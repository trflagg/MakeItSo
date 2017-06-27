import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div id="subheader">
          <h1>{this.props.shipName}</h1>
          <h2>{this.props.chapter} - {this.props.location}</h2>
        </div>
      </div>
    );
  }
}
