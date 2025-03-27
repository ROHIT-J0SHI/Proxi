import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import axios from "axios";

dotenv.config();

// ✅ Fetch coordinates from OpenStreetMap (Nominatim API)
const getCoordinates = async (city) => {
  try {
    console.log(`🌍 Fetching coordinates for city: ${city}`);

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: { q: city, format: "json", limit: 1 },
      }
    );

    console.log("🔍 Nominatim API Response:", response.data);

    if (response.data.length > 0) {
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
        city,
      };
    }

    console.log("❌ No location data found!");
    return null;
  } catch (error) {
    console.error("❌ Error fetching coordinates:", error.message);
    return null;
  }
};

// ✅ Register a new user in MongoDB
export const registerUser = async (req, res) => {
  try {
    const { uid, email, name, role, location } = req.body;

    // ✅ Check if the user already exists
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // ✅ Fetch user's coordinates based on city
    const coordinates = await getCoordinates(location.city);

    // ✅ Create and save the new user
    const newUser = new User({
      uid,
      email,
      name,
      role,
      location: coordinates || location, // Store exact coordinates if available
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ Authenticate User & Store in Database
export const authenticateUser = async (req, res) => {
  try {
    console.log("📥 Incoming Login Request:", req.body);

    const { idToken } = req.body; // ✅ Only expect idToken

    if (!idToken) {
      return res.status(400).json({ error: "ID Token is required" });
    }

    // ✅ Decode Firebase ID Token
    const decodedToken = jwt.decode(idToken);
    console.log("🔍 Decoded Token:", decodedToken);

    const uid = decodedToken.user_id || decodedToken.sub;
    const email = decodedToken.email;

    if (!uid || !email) {
      return res.status(401).json({ error: "Invalid token data" });
    }

    // ✅ Fetch user from database
    let user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: "User not found. Please sign up." });
    }

    console.log("✅ User Found in DB:", user);

    // ✅ Generate JWT including stored user details
    const jwtToken = jwt.sign(
      {
        uid,
        email,
        name: user.name,   // ✅ Fetch name from DB
        role: user.role,    // ✅ Fetch role from DB
        location: user.location, // ✅ Fetch location from DB
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "User authenticated successfully",
      uid,
      email,
      name: user.name,
      role: user.role,
      location: user.location,
      token: jwtToken,
    });

  } catch (error) {
    console.error("❌ Authentication Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
