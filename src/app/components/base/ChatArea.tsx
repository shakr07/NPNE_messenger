"use client";
import React, { useState } from "react";
import "./ChatArea.css";

interface ChatAreaProps {
  messages: any[];  
}

const ChatArea = ({ messages = [] }: ChatAreaProps) => {
  const [message, setMessage] = useState("");

  const submitMessage = (): void => {
    console.log(message);
    setMessage(""); 
  };

  const textMessage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <p>
          You are now chatting in room: <strong>{messages.length > 0 ? messages[0]?.roomName : "Unnamed Room"}</strong>
        </p>
      </div>
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              {msg.content}
            </div>
          ))
        ) : (
          <div className="no-chat-message">No chat available at this moment</div>
        )}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          value={message} 
          placeholder="Write a message..." 
          onChange={textMessage} 
        />
        <button onClick={submitMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatArea;
