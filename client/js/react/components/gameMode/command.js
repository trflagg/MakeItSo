import React from 'react';

const Command = ({ command, onClick }) => (
  <div className="commandTextDiv" onClick={() => {onClick(command)}}>
    <p className="commandItem">
      {command.get('text')}
    </p>
    { command.get('level') &&
      <p className="commandItemLevel">
        Level { command.get('level') } Required
      </p>
    }
  </div>
);

export default Command;
