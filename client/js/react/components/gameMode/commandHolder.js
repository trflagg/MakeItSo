import React from 'react';

import Command from './command';

const CommandHolder = ({commandHolder}) => (
  <div>
    { commandHolder.get('childMessageCount') > 0 &&
      commandHolder.get('text')  &&
      <div className="commandTextDiv">
        <p className="commandItem">
          { commandHolder.get('text') }
          <span className="glyphicon glyphicon-play" />
        </p>
        <p className="commandItemLevel">
          Level { commandHolder.get('level') }
        </p>
      </div>
    }
    <ul className="command-list">
      {commandHolder.get('children').models.map((child) => (
        <li key={child.id}>
          <Command
            text={child.get('text')}
          />
        </li>
      ))}
    </ul>
 </div>
);

export default CommandHolder;
