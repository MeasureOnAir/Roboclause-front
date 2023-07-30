import React from 'react';
import Message from '../Message/Message';
import './MessageList.css';

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message key={index} sender={message.sender} text={message.text} />
      ))}
    </div>
  );
}

export default MessageList;
