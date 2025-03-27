import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; 
import protectedRoutes from "./routes/protectedRoutes.js"; 
import serviceRoutes from "./routes/serviceRoutes.js";

dotenv.config();

const app = express();

const startServer = async () => {
    try {
        await connectDB();

        app.use(cors({ origin: "http://localhost:5173", credentials: true }));
        app.use(express.json());

        app.use("/api", authRoutes); 
        app.use("/api", protectedRoutes); 
        app.use("/api", serviceRoutes);

        console.log("✅ Service Routes Loaded!");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

    } catch (error) {
        console.error("❌ Server startup error:", error);
        process.exit(1);
    }
};

startServer();