import { useState } from 'react';
import './App.scss';

import { postPrompt } from './adapters/api';

const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: false,
        minute: 'numeric'
      });
}

const InitMessage = {
    type: 'bot',
    text: "Hello, I'm Andrew. I'm here to help you with your construction law questions. How can I assist you?",
    sources: [],
    time: getCurrentTime()
}

// [{type: 'loading', content: 'Loading...'}, {type: 'bot', content: 'Bot Message'}, {type: 'personal', content: 'Personal Message'}]
const App = () => {

    const [messages, setMessages] = useState([InitMessage])
    const [inputValue, setInputValue] = useState('');


    const insertMessage = () => {
        if (!inputValue.trim()) return;
        setMessages(prevMessages => [...prevMessages, {type: 'personal', text: inputValue, sources: [], time: getCurrentTime()}, {type: 'loading', content: 'Loading...'}])
        setInputValue('');
    };

    const removeLastMessage = (items) => {
        const newItems = [...items];
        newItems.pop();
        return newItems
      };

    const keepNMessages = (items, n) => {
        return items.slice(-n);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            alert('Please enter a message');
            return;
        }
        insertMessage();
        const result = await postPrompt(inputValue)
        setMessages(prevMessages => keepNMessages([...removeLastMessage(prevMessages), result], 5))
    }

    return(
        <div>
            <div className="chat">
            <div className="chat-title">
                <h1>Roboclause</h1>
                <h2>Andrew</h2>
                <figure className="avatar">
                <img src="https://cdn.pixabay.com/photo/2017/03/31/23/11/robot-2192617_1280.png" alt="Robot Profile" /></figure>
            </div>
            <div className="messages">
                <div className="messages-content">
                    {messages.map((message, index) => (
                    <div key={index}>
                        {message.type === 'loading' ? (
                        <div className={`message ${message.type}`}>
                            <figure className="avatar">
                            <img src="https://cdn.pixabay.com/photo/2017/03/31/23/11/robot-2192617_1280.png" alt="Robot Profile" />
                            </figure>
                            <span></span>
                        </div>
                        ) : (
                        message.type === 'bot' ? 
                        (<div  className={`message ${message.type}`}>
                            <figure className="avatar">
                            <img src="https://cdn.pixabay.com/photo/2017/03/31/23/11/robot-2192617_1280.png" alt="Robot Profile"/>
                            </figure>
                            {message.text}
                            <br/>
                            {message.sources.length > 0 && "Clauses:"}
                                {message.sources.map((source, index) => 
                                    <div className="tooltip">
                                    <p style={{margin:5}}>{source.Clause.toFixed(1)}</p>
                                    <span className="tooltiptext">{source.Clause_Name}</span>
                                </div>
                                )}
                            <div className="timestamp">{message.time}</div>
                        </div>
                        ) : (
                            <div className="message message-personal new">
                                {message.text}
                            </div>
                        )
                        )}
                    </div>
                    ))}
                    
                </div>
            </div>
            <form className="message-box" onSubmit={onSubmit}>
                <input type="text" className="message-input" placeholder="Type message..." value={inputValue} onChange={e => setInputValue(e.target.value)}></input>
                <button type="submit" className="message-submit">Send</button>
            </form>

            </div>
            <div className="bg"></div>
        </div>
    )
};

export default App;