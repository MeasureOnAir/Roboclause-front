import React, { useState } from 'react';
import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';
import './ChatWindow.css';
import { postData } from '../../adapters/api';

function ChatWindow() {
  const [messages, setMessages] = useState([]);

  function handleSendMessage(text) {
    // add the new message to the list of messages
    setMessages(messages => [...messages, { sender: 'User', text }]);
    // send the message to the server, process the response, etc.
    postData(text).then(response => {
      setMessages(messages => [...messages, { sender: 'Bot', text: response }]);
    });
  }

  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatWindow;
