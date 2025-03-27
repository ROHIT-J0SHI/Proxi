import express from "express";
import { authenticateUser, registerUser } from "../controllers/authController.js";

const authRoutes = express.Router();

// Authenticate user with Firebase ID Token
authRoutes.post("/auth", authenticateUser);

//route to store user data after signup
authRoutes.post("/auth/register", registerUser);

export default authRoutes;
