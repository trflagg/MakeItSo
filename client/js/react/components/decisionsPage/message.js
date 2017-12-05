import React from 'react';

const Message = ({ message, onClick }) => (
  <li className='decision-message' key={message.full_path()} onClick={() => onClick(message)}>
    {message.full_path()}
  </li>
);

export default Message;
