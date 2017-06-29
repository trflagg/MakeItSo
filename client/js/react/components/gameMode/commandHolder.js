import React from 'react';

import Command from './command';

const CommandHolder = ({commandHolder}) => (
  <div>
    { commandHolder.childMessageCount > 0 &&
      commandHolder.text  &&
      <div className="commandTextDiv">
        <p className="commandItem">
          { commandHolder.text }
          <span className="glyphicon glyphicon-play" />
        </p>
        <p className="commandItemLevel">
          Level { commandHolder.level }
        </p>
      </div>
    }
    <ul className="command-list">
      {Object.keys(commandHolder._messages).map((text) => (
        <li key={commandHolder._messages[text].message}>
          <Command
            text={text}
            messageData={commandHolder._messages[text]}
          />
        </li>
      ))}
    </ul>
 </div>
);

export default CommandHolder;
