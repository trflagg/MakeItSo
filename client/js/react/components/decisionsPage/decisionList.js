import React from 'react';
import Decision from './decision';

const DecisionList = ({ decisions, onCommandClick }) => (
  <div className="decisionList">
    {decisions &&
      decisions.map((decision) => (
        <Decision
          key = {decision._id}
          decision = {decision}
          onCommandClick = {onCommandClick}
        />
      ))}
  </div>
)

export default DecisionList;
