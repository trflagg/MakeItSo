import React from 'react';

const Decision = ({ decision, onCommandClick }) => (
  <div>
    <h2 onClick={() => onCommandClick(decision)}>
      {decision.message}
    </h2>
  </div>
);

export default Decision;
