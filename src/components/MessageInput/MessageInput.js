import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleSendClick() {
    if (text) {
      onSendMessage(text);
      setText('');
    }
  }

  return (
    <div className="message-input">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Type a message"
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
}

export default MessageInput;
