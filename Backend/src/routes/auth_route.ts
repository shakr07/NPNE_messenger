import { Request, Response, Router } from "express";
import { signUp } from "../middlewares/auth_middleware";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log("request: ",);
    //const { email, firstName, lastName } = req.body;

    const signit = await signUp(req.body.data.email,req.body.data.firstName,req.body.data.lastName);

    if (signit.message === ". already exists") {
      return res.status(400).json({
        message: "User already joined",
      });
    } else {
      return res.status(201).json({
        message: "User registered successfully",
        user: signit.user,
      });
    }
  } catch (error:any) {
    console.error("Error in signup:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export { router as auth_route };
