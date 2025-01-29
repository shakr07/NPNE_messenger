"use client";
import React, { useEffect, useState } from "react";
import socketInstance from "../socket";
import Sidebar from "../components/base/Sidebar";
import ChatArea from "../components/base/ChatArea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DialogBox from "../components/base/DialogBox";

function Page() {
  const [socketID, setSocketID] = useState(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isMakeRoom, setIsMakeRoom] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to Server", socketInstance.id);
      setSocketID(socketInstance.id);
    };

    socketInstance.on("connect", handleConnect);

    return () => {
      socketInstance.off("connect", handleConnect);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (data) => {
      console.log("Received message from room:", data);
    };

    socketInstance.on("received-message", handleMessage);

    return () => {
      socketInstance.off("received-message", handleMessage);
    };
  }, []);

  const handleClickMakeRoom = () => {
    console.log("Make Room clicked");
    setIsMakeRoom(true);
    setOpen(true);
  };

  const handleClickJoinRoom = () => {
    console.log("Join Room clicked");
    setIsMakeRoom(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("Page - isMakeRoom:", isMakeRoom);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Button
        variant="outline"
        style={{ marginTop: "100px" }}
        onClick={handleClickMakeRoom}
      >
        Make a room
      </Button>
      <Button variant="outline" onClick={handleClickJoinRoom}>
        Join a room
      </Button>
      <ChatArea />

      {open && (
        <DialogBox open={open} handleClose={handleClose} isMakeRoom={isMakeRoom} />
      )}
    </div>
  );
}

export default Page;
