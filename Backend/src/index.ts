
import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from '@prisma/client';
import { chat_route } from "./routes/chat_route";
import {auth_route} from "./routes/auth_route";
const prisma = new PrismaClient();
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", async ({ roomName, password, isMakeRoom }) => {
    socket.join(roomName);
    console.log(`User joined room: ${roomName}`);

    if (isMakeRoom) {
      // Creating a new chat room
      const chatRoom = await prisma.chatRoom.create({
        data: {
          createdBy: 1,   
          password: password,
          chatRoomName: roomName,
        },
      });

      io.to(roomName).emit("received-message", `Room ${roomName} created successfully.`);
    } else {
      io.to(roomName).emit("received-message", `User joined ${roomName}.`);
    }
  });

  socket.on("message", ({ room, message }) => {
    console.log(`Message sent to room ${room}:`, message);

    // Emit to all connected users in all rooms
    io.emit("received-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

app.use("/api/v1", chat_route);
app.use("/api/v1",auth_route)

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

httpServer.listen(4000, () => console.log(`Server is running on PORT 4000`));
