import React from 'react';

import './dmContent.scss';

const DM = ({ subject, content, onClose }) => (
  <div id="dmContent">
    <div className="contentHeader">
      <h2>Subject: { subject }</h2>
      <p id="dmClose" onClick={ onClose }>
        Close
      </p>
    </div>
    <p className="content">
      { content }
    </p>
  </div>
);

export default DM;
