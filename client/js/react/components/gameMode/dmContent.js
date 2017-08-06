import React from 'react';

const DM = ({ dm, content }) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <h1>{ dm.get('text') }</h1>
    <p style={{minHeight: '300px', flexBasis: 1}}>
      { content }
    </p>
    <p id="dmClose" className="commandItem">
      Close
    </p>
  </div>
);

export default DM;
