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
exports.get_Messages = exports.getChat = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getChat = (roomName) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prisma.chatRoom.findFirst({
        where: {
            chatRoomName: roomName,
        },
    });
    if (room) {
        const messages = yield prisma.message.findMany({
            where: {
                chatRoomId: room.chatRoomId,
            },
        });
        return messages;
    }
    return null;
});
exports.getChat = getChat;
const get_Messages = (sendBy, message, roomName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Room Name:", roomName);
        const chatRoom = yield prisma.chatRoom.findFirst({
            where: {
                chatRoomName: roomName,
            },
        });
        if (!chatRoom) {
            return { message: "Room ID not found" };
        }
        const user = yield prisma.user.findFirst({
            where: { email: sendBy },
        });
        if (!user) {
            return { message: "User not found" };
        }
        const msg = yield prisma.message.create({
            data: {
                sentBy: 1,
                message: message,
                chatRoomId: chatRoom.chatRoomId,
            },
        });
        console.log("Message Sent:", msg);
        return msg;
    }
    catch (error) {
        console.error("Error:", error);
        return { error: "Something went wrong" };
    }
});
exports.get_Messages = get_Messages;
