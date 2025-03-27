import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // ✅ Import UUID for unique ID generation

const serviceSchema = new mongoose.Schema({
  serviceId: { type: String, unique: true, default: uuidv4 }, // ✅ Generate unique serviceId
  clientId: { type: String, required: true },
  clientName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    city: { type: String, required: true }
  },
  status: { type: String, enum: ["Open", "Accepted", "Completed"], default: "Open" },
  createdAt: { type: Date, default: Date.now },

  // ✅ Add this to store interested experts
  interestedExperts: [
    {
      expertId: String,
      expertName: String,
      expertEmail: String,
      expertLocation: String
    }
  ],

  selectedExpert: {
    expertId: { type: String, default: null },
    expertName: { type: String, default: null },
    expertEmail: { type: String, default: null },
    contactNumber: { type: String, default: null } // Contact number after submission
  }
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
