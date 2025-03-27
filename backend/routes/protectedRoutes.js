import express from "express";
import { authenticateJWT, authorizeRole } from "../middlewares/authMiddleware.js";

const protectedRoutes = express.Router();

// ✅ Only Clients can access this route
protectedRoutes.get("/client", authenticateJWT, authorizeRole(["Client"]), (req, res) => {
  res.json({ message: "Welcome to the Client Dashboard!", user: req.user });
});

// ✅ Only Experts can access this route
protectedRoutes.get("/expert", authenticateJWT, authorizeRole(["Expert"]), (req, res) => {
  res.json({ message: "Welcome to the Expert Dashboard!", user: req.user });
});

// ✅ Both Clients & Experts can access this route
protectedRoutes.get("/common", authenticateJWT, authorizeRole(["Client", "Expert"]), (req, res) => {
  res.json({ message: "Welcome to the Common Dashboard!", user: req.user });
});

export default protectedRoutes;
