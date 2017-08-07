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
    <div className="content"
      dangerouslySetInnerHTML={{
        __html: content
      }}
    />
  </div>
);

export default DM;
