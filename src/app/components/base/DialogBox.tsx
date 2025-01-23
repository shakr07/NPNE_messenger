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

interface MycomponentProps{
  handleClose:()=>void;
  open:boolean
}


function DialogBox({ open, handleClose }:MycomponentProps) {
  const [passWord,setpassWord]=useState('');
  const [Name,setName]=useState('');
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: any) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
        
          // Safely extract password and name, ensuring they are strings
          const password = formJson.password as string;
          const name = formJson.name as string;
        
          // Assign the extracted values to the state
          setpassWord(password);
          setName(name);
        
          // Optionally log values to debug
          // console.log(password, name);
          socketInstance.emit("join-room", {roomName:Name,Password:passWord});
          // Close the form or modal
          handleClose();
          
          
        },
      }}
    >
      <DialogTitle>Make Chat Room</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Ensure that the password is memorable so that anyone can join using it.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Chat room Name"
          type="text"
          fullWidth
          variant="standard"
        />
         <TextField
          autoFocus
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
