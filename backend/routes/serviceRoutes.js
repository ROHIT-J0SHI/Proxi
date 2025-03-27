import express from "express";
import { authenticateJWT, authorizeRole } from "../middlewares/authMiddleware.js";
import {
  createServiceRequest,
  getClientServices,
  getCityServices,
  expressInterest,
  getInterestedExperts, 
  toggleServiceStatus,
  submitContact
} from "../controllers/serviceController.js";
import Service from "../models/service.js";

const serviceRoutes = express.Router();

// ✅ Clients create a service request
serviceRoutes.post("/service/create", authenticateJWT, authorizeRole(["Client"]), createServiceRequest);

// ✅ Clients fetch their own service requests
serviceRoutes.get("/service/client-services", authenticateJWT, authorizeRole(["Client"]), getClientServices);

// ✅ Experts fetch open services in the same city (Includes Client Details)
serviceRoutes.get("/service/city-services", authenticateJWT, authorizeRole(["Expert"]), getCityServices);

// ✅ Experts express interest in a service request
serviceRoutes.post("/service/express-interest", authenticateJWT, authorizeRole(["Expert"]), expressInterest);

// ✅ Clients get list of interested Experts (Includes Expert Details)
serviceRoutes.get("/service/interested-experts/:serviceId", authenticateJWT, authorizeRole(["Client"]), getInterestedExperts);

// ✅ Toggle service status (Client only)
serviceRoutes.put("/service/toggle-status/:serviceId", authenticateJWT, authorizeRole(["Client"]), toggleServiceStatus);

//save selected expert contact deatils 
serviceRoutes.post("/service/submit-contact", authenticateJWT, authorizeRole(["Expert"]), submitContact);


//client selects an exepert
serviceRoutes.post("/service/select-expert", async (req, res) => {
    try {
      const { serviceId, expertId, expertName, expertEmail } = req.body;
  
      if (!serviceId || !expertId) {
        return res.status(400).json({ error: "Service ID and Expert ID are required." });
      }
  
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
  
      // ✅ Ensure selectedExpert field exists before setting data
      service.selectedExpert = { expertId, expertName, expertEmail };
      
      await service.save();
  
      res.json({ message: "Expert selected successfully", service });
    } catch (error) {
      console.error("❌ Error in select-expert:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });
  


export default serviceRoutes;
