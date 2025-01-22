"use client";
import React, { useEffect, useState } from "react";
import socketInstance from "../socket";
import Sidebar from "../components/base/Sidebar";
import ChatArea from "../components/base/ChatArea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';  // Import useRouter
import DialogBox from "../components/base/DialogBox"

function Page() {
  const [socketID, setSocketID] = useState(null);
  const router = useRouter();  // Initialize the router
  const [open, setOpen] = useState(false);

  // Function to open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Listen for the 'connect' event
    socketInstance.on("connect", () => {
      console.log("Connected to Server", socketInstance.id);
      setSocketID(socketInstance.id);
    });

    // Clean up the connection when the component unmounts
    // return () => {
    //   socketInstance.disconnect();
    // };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Button variant="outline" style={{ marginTop: "100px" }} onClick={handleClickOpen}>
        Make a room
      </Button>
      <Button variant="outline">Join a room</Button>
      <ChatArea />

      {/* Render DialogBox here and pass props */}
      <DialogBox open={open} handleClose={handleClose} />
    </div>
  );
}

export default Page;
