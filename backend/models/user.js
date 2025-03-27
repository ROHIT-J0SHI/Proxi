import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["Client", "Expert"], required: true },
  location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    city: { type: String, required: false }
  }
});

const User = mongoose.model("User", userSchema);
export default User;
