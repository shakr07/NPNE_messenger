"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import socketInstance from "@/app/socket";
import axios from "axios";
import ChatArea from "./ChatArea";

interface MycomponentProps {
  handleClose: () => void;
  open: boolean;
  isMakeRoom: boolean;
}

function DialogBox({ open, handleClose, isMakeRoom }: MycomponentProps) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<any[]>([]); // Store messages here

  const fetchMessages = async (roomName: string) => {
    console.log("api runs: ",roomName);
    
    try {
      const response = await axios.post("http://localhost:4000/api/v1/getChat", {
        roomName,
      });
      console.log("API response:", response.data);
      setMessages(response.data); 
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !password) {
      alert("Please enter both room name and password.");
      return;
    }
    console.log("Submitting - Name:", name, "Password:", password, "isMakeRoom:", isMakeRoom);
    console.log("fetchMessage: ",name);
    fetchMessages(name); 
    if (isMakeRoom) {
      socketInstance.emit("message", { room: name, message: `Room ${name} created.` });
    }
    
    localStorage.removeItem('roomName');
    localStorage.setItem('roomName', name);
    socketInstance.emit("join-room", {
      roomName: name,
      password,
      isMakeRoom,
    });
    setPassword("");
    setName("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isMakeRoom ? "Make Chat Room" : "Join Chat Room"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isMakeRoom
            ? "Create a new chat room. Make sure to share the room name and password."
            : "Enter the room name and password to join."}
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Chat Room Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
      {messages.length >=0 && <ChatArea messages={messages} />} {/* Render ChatArea when messages are available */}
    </Dialog>
  );
}

export default DialogBox;
