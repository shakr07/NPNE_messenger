import React from "react";
import "./ChatArea.css";

const ChatArea = () => {
  return (
    <div className="chat-area">
      <div className="chat-header">
        <p>You are now chatting with xyz</p>
      </div>
      <div className="chat-messages">
        <div className="message sent">Chat with an agent</div>
        <div className="message received">
          How can I help you today?
        </div>
        <div className="message sent">Just want to say you guys are doing a fantastic job! 🎉</div>
        <div className="message sent">Just want to say you guys are doing a fantastic job! 🎉</div>
        <div className="message sent">Just want to say you guys are doing a fantastic job! 🎉</div>
        <div className="message sent">Just want to say you guys are doing a fantastic job! 🎉</div>
        <div className="message received">
          How can I help you today?
        </div><div className="message received">
          How can I help you today?
        </div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Write a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatArea;
