import React from 'react';
import './Message.css';

const Message = ({ text, type }) => (
  <div className={`message ${type}`}>
    {text}
  </div>
);

export default Message;
