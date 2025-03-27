import Service from "../models/service.js";
import User from "../models/user.js"; // Import User model
import { v4 as uuidv4 } from "uuid"; // ✅ Import UUID

// ✅ Clients create a service request
export const createServiceRequest = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Fetch user details from database
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({ error: "User not found. Please re-login." });
    }

    if (!user.location || !user.location.city) {
      return res.status(400).json({ error: "User location not available. Please update your profile." });
    }

    // ✅ Create new service request with stored location
    const newService = new Service({
      serviceId: uuidv4(),
      clientId: req.user.uid,
      clientName: user.name,
      title,
      description,
      category,
      location: user.location, // ✅ Store the location from the user profile
    });

    await newService.save();
    res.status(201).json({ message: "Service request created successfully", service: newService });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ Clients view their own service requests
export const getClientServices = async (req, res) => {
  try {
    const clientId = req.user.uid;

    // ✅ Fetch services with createdAt, status, and interestedExperts count
    const clientServices = await Service.find({ clientId })
      .sort({ createdAt: -1 })
      .select("title description category location status createdAt interestedExperts selectedExpert");

    res.status(200).json(clientServices);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


// ✅ Experts view open service requests in their city (Now includes Client Details)
export const getCityServices = async (req, res) => {
  try {
    const expertId = req.user.uid;
    const expertCity = req.user.location.city;

    // ✅ Fetch services in the same city
    const openServices = await Service.find({ "location.city": expertCity, status: "Open" });

    // ✅ Mark if this expert is selected
    const updatedServices = openServices.map((service) => ({
      ...service._doc,
      isSelectedExpert: service.selectedExpert?.expertId === expertId, // ✅ Check if the logged-in expert is selected
    }));

    res.status(200).json(updatedServices);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


// ✅ Experts express interest in a service request
export const expressInterest = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const expertId = req.user.uid;

    // ✅ Find the service request
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service request not found" });
    }

    // ✅ Check if Expert already expressed interest
    if (!service.interestedExperts) {
      service.interestedExperts = []; // Ensure field exists
    }
    const alreadyInterested = service.interestedExperts.some(exp => exp.expertId === expertId);
    if (alreadyInterested) {
      return res.status(400).json({ error: "You have already expressed interest in this service request." });
    }

    // ✅ Fetch Expert's details
    const expert = await User.findOne({ uid: expertId });
    if (!expert) {
      return res.status(404).json({ error: "Expert not found." });
    }

    // ✅ Add Expert to interested list
    const expertData = {
      expertId: expert.uid,
      expertName: expert.name || "Unknown",
      expertEmail: expert.email || "No email",
      expertLocation: expert.location?.city || "Unknown"
    };

    service.interestedExperts.push(expertData);
    await service.save();

    res.status(200).json({ message: "Interest expressed successfully!", service });

  } catch (error) {
    console.error("❌ Error in expressInterest:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};




// ✅ Clients get list of interested Experts with Details
export const getInterestedExperts = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const clientId = req.user.uid;

    // ✅ Find the service request
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service request not found" });
    }

    // ✅ Ensure the requester is the Client who created the service
    if (service.clientId !== clientId) {
      return res.status(403).json({ error: "Unauthorized. You are not the owner of this service request." });
    }

    res.status(200).json({ message: "Interested Experts fetched successfully!", interestedExperts: service.interestedExperts });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


// ✅ Close a service (Client only)
// ✅ Toggle service status (Client only)
export const toggleServiceStatus = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const clientId = req.user.uid;

    // ✅ Find the service request
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // ✅ Ensure only the owner (client) can toggle it
    if (service.clientId !== clientId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    // ✅ Toggle between "Open" and "Completed"
    service.status = service.status === "Completed" ? "Open" : "Completed";
    await service.save();

    res.status(200).json({ message: `Service status updated to ${service.status}`, service });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


//submitting contact by the expert on selecting by the client
export const submitContact = async (req, res) => {
  try {
    const { serviceId, expertId, contactNumber } = req.body;

    // ✅ Find the service request
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // ✅ Ensure the expert is selected
    if (!service.selectedExpert || service.selectedExpert.expertId !== expertId) {
      return res.status(403).json({ error: "You are not selected for this service" });
    }

    // ✅ Update the selected expert’s contact number
    service.selectedExpert.contactNumber = contactNumber;
    await service.save();

    // ✅ Return updated service object
    res.json({ message: "Contact number submitted successfully", service });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
