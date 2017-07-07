import React from 'react';

const Command = ({ command, onClick }) => (
  <div className="commandTextDiv" onClick={() => {onClick(command)}}>
    <p className="commandItem">
      {command.get('text')}
    </p>
  </div>
);

export default Command;
