import React from 'react';

import Header from './header';
import GameScreen from './gameScreen';
import CommandHolder from './commandHolder';

const SimpleScreen = (props) => (
  <div>
    <Header {...props} />
    <div className="gameScreen screen">
      <div id="simpleScreen">
        <GameScreen
          lastResult = {props.ship.get('lastResult')}
        />
         <div id="commands">
          <div id="rootCommands">
            <CommandHolder
              commandHolder = {props.ship}
              onCommandClick={props.onCommandClick}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SimpleScreen;
