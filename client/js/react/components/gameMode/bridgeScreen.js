import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';

const BridgeScreen = (props) => (
  <div>
    <Header {...props} />
    <div className="gameScreen screen">
      <div id="bridgeScreen" className="container-fluid">
        <div id="mainBody" className="right">
          <GameScreen
            lastResult = {props.ship.get('lastResult')}
          />
           <div id="commands">
            <CommandHolder
              id="rootCommands"
              commandHolder = {props.ship}
              onCommandClick= {props.onCommandClick}
            />
            <CommandHolder
              id="shipCommands"
              commandHolder = {props.ship.get('shipControls')}
              onCommandClick= {props.onCommandClick}
            />
            <CommandHolder
              id="crewCommands"
              commandHolder = {props.ship.get('crew')}
              onCommandClick= {props.onCommandClick}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BridgeScreen;
