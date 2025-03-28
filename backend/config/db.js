import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`); // Added a checkmark here too

  } catch (error) {
      console.error(`❌ MongoDB Error: ${error.message}`);
      process.exit(1); // Exit the process on connection failure
  }
};

export default connectDB;