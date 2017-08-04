import React from 'react';

const DM = ({ dm, content }) => (
  <div>
    <h1>{ dm.get('text') }</h1>
    <div>
      { content }
    </div>
  </div>
);

export default DM;
