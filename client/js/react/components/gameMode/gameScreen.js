import React from 'react';

const GameScreen = ({lastResult}) => (
  <div className="output" >
    <p>
      { lastResult }
    </p>
  </div>
);

export default GameScreen;
