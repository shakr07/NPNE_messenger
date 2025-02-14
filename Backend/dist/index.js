"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const chat_route_1 = require("./routes/chat_route");
const auth_route_1 = require("./routes/auth_route");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
    socket.on("join-room", (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomName, password, isMakeRoom }) {
        socket.join(roomName);
        console.log(`User joined room: ${roomName}`);
        if (isMakeRoom) {
            // Creating a new chat room
            const chatRoom = yield prisma.chatRoom.create({
                data: {
                    createdBy: 1,
                    password: password,
                    chatRoomName: roomName,
                },
            });
            io.to(roomName).emit("received-message", `Room ${roomName} created successfully.`);
        }
        else {
            io.to(roomName).emit("received-message", `User joined ${roomName}.`);
        }
    }));
    socket.on("message", ({ room, message }) => {
        console.log(`Message sent to room ${room}:`, message);
        // Emit to all connected users in all rooms
        io.emit("received-message", message);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});
app.use("/api/v1", chat_route_1.chat_route);
app.use("/api/v1", auth_route_1.auth_route);
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});
httpServer.listen(4000, () => console.log(`Server is running on PORT 4000`));
