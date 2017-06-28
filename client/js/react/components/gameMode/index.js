import React from 'react';
import Header from './header';

export default class GameMode extends React.Component {
  render() {
    return (
      <div id="gameMode">
        <Header {...this.props}/>
      </div>
    );
  }
}

