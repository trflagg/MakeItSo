import React from 'react';

export default class Header extends React.Component {
  render() {
    const {profile, ship} = this.props;

    return (
      <div id="header">
        <div id="subheader">
          <h1>Cpt. {profile.name} of the {ship.shipName}</h1>
          <h2>{ ship.location || "Andromedae/Cygni Warp Transfer"}</h2><br/>
          <h2>{ ship.chapter || "Prologue" }</h2>
        </div>
      </div>
    );
  }
}
