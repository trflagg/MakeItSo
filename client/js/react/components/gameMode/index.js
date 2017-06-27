import React from 'react';
import Header from './header';

export default class GameMode extends React.Component {
  render() {
    return (
      <div id="gameMode">
        <Header
          shipName = {this.props.ship.shipName}
          chapter = {"Prologue"}
          location = {this.props.ship.location}
        />
      </div>
    );
  }
}

