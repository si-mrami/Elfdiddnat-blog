import express from "express";
import { signin, signup } from "../Controllers/auth.js";

const authRouter = express.Router();

// Login route
authRouter.post("/signin", signin);

// Signup route
authRouter.post("/signup", signup);

// Export the router
export default authRouter;
