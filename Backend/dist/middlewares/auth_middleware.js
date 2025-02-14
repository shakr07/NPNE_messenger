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
exports.signUp = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const signUp = (email, firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email, " ", firstName, " ", lastName);
        const user = yield prisma.user.findFirst({
            where: { email },
        });
        if (user) {
            console.log("findFirst: ", user);
            return { message: "User already exists" };
        }
        // Create user if not found
        const newUser = yield prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
            },
        });
        console.log("NewUser: ", newUser);
        return { message: "User created successfully", user: newUser };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.signUp = signUp;
