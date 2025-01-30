"use client"
import React, { useEffect, useState } from "react";
import "./ChatArea.css";
import { log } from "node:console";
import axios from 'axios';
/// /  const [name, setName] = useState<string>("");

const ChatArea = () => {  
  const storedName = localStorage.getItem("roomName");
  if (storedName) {
    //setName(storedName);
    console.log("Chat room name retrieved:", storedName);
  }

  const fetchMessage=async()=>{
    try {
      const messAge=await axios.get('http://localhost:4000/api/v1/getChat')
    } catch (error) {
      
    }
  }
 // console.log("chatarea");
  
  return (
    <div className="chat-area">
      <div className="chat-header">
        <p>You are now chatting in room: <strong>"name"</strong></p>
      </div>
      <div className="chat-messages">
        <div className="message sent">Chat with an agent</div>
        <div className="message received">How can I help you today?</div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Write a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatArea;
