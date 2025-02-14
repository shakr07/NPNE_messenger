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
exports.auth_route = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const router = (0, express_1.Router)();
exports.auth_route = router;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("request: ");
        //const { email, firstName, lastName } = req.body;
        const signit = yield (0, auth_middleware_1.signUp)(req.body.data.email, req.body.data.firstName, req.body.data.lastName);
        if (signit.message === ". already exists") {
            return res.status(400).json({
                message: "User already joined",
            });
        }
        else {
            return res.status(201).json({
                message: "User registered successfully",
                user: signit.user,
            });
        }
    }
    catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}));
