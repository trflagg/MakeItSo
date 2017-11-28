import React from 'react';
import Decision from './decision';

const DecisionList = ({ decisions }) => (
  <div className="decisionList">
    {decisions &&
      decisions.map((decision) => (
        <Decision
          key = {decision._id}
          decision = {decision}
        />
      ))}
  </div>
)

export default DecisionList;
