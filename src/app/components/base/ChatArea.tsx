"use client";
import React, { useEffect, useState } from "react";
import "./ChatArea.css";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

interface ChatAreaProps {
  messages: any[];
}

const ChatArea = ({ messages = [] }: ChatAreaProps) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(messages); // Store chat messages

  useEffect(() => {
    // Listen for incoming messages
    socket.on("received-message", (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, { content: msg }]);
    });
  
    return () => {
      socket.off("received-message");
    };
  }, []);
  
  const sendMessage = async () => {
    try {
      const roomName = localStorage.getItem("roomName");
      if (!roomName) return;
  
      // Send message via API
      await axios.post("http://localhost:4000/api/v1/get_Messages", {
        data: {
          message,
          sendBy: "shashank7@gmail.com",
          RoomName: roomName,
        },
      });
  
      // Emit message to the room
      socket.emit("message", { room: roomName, message });
  
      // Update local state instantly
      setChatMessages((prevMessages) => [...prevMessages, { content: message }]);
    } catch (error) {
      console.error(error);
    }
  };
  

  const submitMessage = (): void => {
    console.log(message);
    sendMessage();
    setMessage("");
  };

  const textMessage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <p>
          You are now chatting in room:{" "}
          <strong>{chatMessages.length > 0 ? chatMessages[0]?.roomName : "Unnamed Room"}</strong>
        </p>
      </div>
      <div className="chat-messages">
        {chatMessages.length > 0 ? (
          chatMessages.map((msg, index) => (
            <div key={index} className="message">
              {msg.content}
            </div>
          ))
        ) : (
          <div className="no-chat-message">No chat available at this moment</div>
        )}
      </div>
      <div className="chat-input">
        <input type="text" value={message} placeholder="Write a message..." onChange={textMessage} />
        <button onClick={submitMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatArea;
