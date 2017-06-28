import React from 'react';

export default class Header extends React.Component {
  render() {
    const {profile, ship} = this.props;

    return (
      <div id="header">
        <div id="subheader">
          <h1>Cpt. {profile.name} of the {ship.shipName}</h1>
          <h2>{ship.location}</h2>
          <h2>{ ship.chapter }</h2>
        </div>
      </div>
    );
  }
}
