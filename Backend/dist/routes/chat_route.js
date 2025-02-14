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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat_route = void 0;
// routes/chat_route.ts
const express_1 = require("express");
const chat_js_1 = require("../middlewares/chat.js");
const router = (0, express_1.Router)();
exports.chat_route = router;
router.post('/getChat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const roomName = req.body.roomName;
    console.log("Roomname: ", roomName);
    if (!roomName) {
        return res.status(400).json({ message: "roomName is required" });
    }
    try {
        const messages = yield (0, chat_js_1.getChat)(roomName);
        res.json({ messages });
    }
    catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).json({ message: "Error fetching chat messages" });
    }
}));
router.post('/get_Messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = req.body.data;
        console.log("RoomName", Data.RoomName);
        const Response = yield (0, chat_js_1.get_Messages)(Data.sendBy, Data.message, Data.oomName);
        res.json({
            message: "Successs",
            response: Response
        });
    }
    catch (error) {
        console.log(error);
    }
}));
