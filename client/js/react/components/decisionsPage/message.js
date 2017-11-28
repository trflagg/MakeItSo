import React from 'react';

const Message = ({ message }) => (
  <li key={message.full_path()}>
    {message.full_path()}
  </li>
);

export default Message;
