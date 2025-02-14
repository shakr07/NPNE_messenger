import express, { Router, Express, Application } from "express";
const app: Application = express();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signUp=async(email:string,firstName:string,lastName:string)=>{
    try {
        console.log(email," ",firstName," ",lastName)
      const user = await prisma.user.findFirst({
        where: { email },
      });
  
      if (user) {
        console.log("findFirst: ",user)
        return { message: "User already exists" };
      }
  
      // Create user if not found
      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
        },
      });
      console.log("NewUser: ",newUser);
      return { message: "User created successfully", user: newUser };
    
    } catch (error:any) {
      return { error: error.message };
    }
  };