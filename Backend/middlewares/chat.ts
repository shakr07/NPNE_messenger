import express, { Router, Express, Application } from "express";
const app: Application = express();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getChat = async (roomName: string) => {
  const room = await prisma.chatRoom.findFirst({
    where: {
      chatRoomName: roomName,
    },
  });

  if (room) {
    const messages = await prisma.message.findMany({
      where: {
        chatRoomId: room.chatRoomId, 
      },
    });
    return messages;
  }
  return null;
};
export const get_Messages = async (sendBy: string, message: string, roomName: string) => {
  try {
    console.log("Room Name:", roomName);
    
    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        chatRoomName: roomName,  
      },
    });

    if (!chatRoom) {
      return { message: "Room ID not found" };
    }

    const user = await prisma.user.findFirst({
      where: { email: sendBy},
    });

    if (!user) {
      return { message: "User not found" };
    }


    const msg = await prisma.message.create({
      data: {
        sentBy:1,  
        message: message,
        chatRoomId: chatRoom.chatRoomId,
      },
    });

    console.log("Message Sent:", msg);
    return msg;

  } catch (error) {
    console.error("Error:", error);
    return { error: "Something went wrong" };
  }
};
