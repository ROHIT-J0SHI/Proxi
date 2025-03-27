import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config(); // Load environment variables

const serviceAccount = JSON.parse(
  readFileSync(process.env.FIREBASE_ADMIN_SDK, "utf8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
