import React from 'react';
import './Message.css';

function Message({ sender, text }) {
  return (
    <div className="message">
      <div className="sender">{sender}</div>
      <div className="text">{text}</div>
    </div>
  );
}

export default Message;