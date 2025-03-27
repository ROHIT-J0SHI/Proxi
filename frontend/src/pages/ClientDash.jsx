import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaListAlt,
  FaPlusCircle,
  FaMapMarkerAlt, FaChevronDown, FaRedoAlt, FaChevronUp, FaTimes
} from "react-icons/fa";

import { MdAccessTime, MdEmail } from "react-icons/md";
import HowItWorks from "../components/HowitWorks";
import HowtoUse from "../components/HowtoUse";

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [totalInterestedExperts, setTotalInterestedExperts] = useState(0);

  // ✅ Fetch client's own services
  useEffect(() => {
    const fetchServices = async () => {
      if (!user || !user.token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/service/client-services",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch services");
        }

        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
  }, [user, refresh]);

  useEffect(() => {
    const interestedCount = services.reduce(
      (acc, s) => acc + (s.interestedExperts?.length || 0),
      0
    );
    setTotalInterestedExperts(interestedCount);
  }, [services]);

  // ✅ Fetch interested experts for a service
  const fetchInterestedExperts = async (serviceId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/service/interested-experts/${serviceId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Failed to fetch interested experts."
        );
      }

      const data = await res.json();

      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId
            ? { ...service, interestedExperts: data.interestedExperts || [] }
            : service
        )
      );

      setExpandedService((prev) => (prev === serviceId ? null : serviceId)); // Toggle the view
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Select an expert
  const selectExpert = async (serviceId, expert) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/service/select-expert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            serviceId,
            expertId: expert.expertId,
            expertName: expert.expertName,
            expertEmail: expert.expertEmail,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to select expert.");
      }

      alert("Expert selected successfully!");
      setRefresh((prev) => !prev); // Refresh dashboard
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Close or Reopen a service
  const toggleServiceStatus = async (serviceId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Completed" ? "Open" : "Completed";
  
      const res = await fetch(
        `http://localhost:5000/api/service/toggle-status/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ status: newStatus }), // ✅ Send status in request body
        }
      );
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || `Failed to ${newStatus.toLowerCase()} the service.`
        );
      }
  
      alert(`Service ${newStatus.toLowerCase()} successfully!`);
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId
            ? { ...service, status: newStatus }
            : service
        )
      ); // ✅ Update UI immediately
    } catch (err) {
      alert(err.message);
    }
  };
  

  return (
    <div className="flex min-h-screen pt-[70px]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-main text-white flex-col items-center py-8 px-4 fixed left-0 top-[70px] h-full shadow-lg">
        <h3 className="text-2xl font-bold mb-6">Dashboard</h3>
        <div className="w-full space-y-4">
          <div className="flex items-center bg-white/20 p-4 rounded-lg w-full">
            <FaListAlt className="text-secondary text-xl mr-3" />
            <p className="text-lg">
              Total Services: <strong>{services.length}</strong>
            </p>
          </div>
          <div className="flex items-center bg-white/20 p-4 rounded-lg w-full">
            <FaUsers className="text-secondary text-xl mr-3" />
            <p className="text-lg">
              Interested Experts: <strong>{totalInterestedExperts}</strong>
            </p>
          </div>
        </div>
        <button
          className="btn-main mt-8 flex items-center px-4 py-2"
          onClick={() => navigate("/create-service")}
        >
          <FaPlusCircle className="mr-2" /> Create Service
        </button>
      </aside>

      <div className="w-full lg:ml-[260px] px-6 sm:px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          My Requests
        </h2>

        {/* Mobile Button */}
        <div className="lg:hidden flex justify-center mb-4">
          <button
            className="btn-main flex items-center px-4 py-2"
            onClick={() => navigate("/create-service")}
          >
            <FaPlusCircle className="mr-2" /> Create Service
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Service Details with CTAs */}
{services.length === 0 ? (
  <p className="text-center text-gray-500">No service requests found. Please create one.</p>
) : (
  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
    {services.map((service) => (
      <div
        key={service._id}
        className=" shadow-lg rounded-2xl p-6 flex flex-col justify-between"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              service.status === "Open"
                ? "bg-green-100 text-reopen"
                : "bg-red-100 text-close"
            }`}
          >
            {service.status}
          </span>

          {/* Date & Time Display */}
          <div className="flex items-center space-x-2 text-gray-500 text-xs md:text-sm font-light">
            <MdAccessTime className="text-gray-500" />
            <span>
              {new Date(service.createdAt).toLocaleDateString()} •{" "}
              {new Date(service.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-3">
          <h3 className="text-xl font-semibold text-main">{service.title}</h3>
          <p className="text-gray-600 italic">{service.description}</p>
        </div>

        {/* Category, Location & Interested Experts */}
        <div className="mt-3 space-y-2 text-gray-700">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-secondary" />
            <strong>Location:</strong> {service.location?.city || "Not provided"}
          </p>
          <p className="flex items-center gap-2">
            <FaListAlt className="text-secondary" />
            <strong>Category:</strong> {service.category}
          </p>
          <p className="flex items-center gap-2">
            <FaUsers className="text-secondary" />
            <strong>Interested Experts:</strong> {service.interestedExperts?.length || 0}
          </p>
        </div>

        {/* Buttons Section */}
{/* Buttons Section */}
<div className="mt-4 flex flex-col sm:flex-row gap-4">
  <button
    onClick={() => fetchInterestedExperts(service._id)}
    className="btn-main flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base"
  >
    {expandedService === service._id ? (
      <>
        <FaChevronUp className="text-white" /> Hide Experts
      </>
    ) : (
      <>
        <FaChevronDown className="text-white" /> View Interested Experts
      </>
    )}
  </button>

  <button
  onClick={() => toggleServiceStatus(service._id, service.status)}
  className={`group btn-bordered flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base border-2 
    ${
      service.status === "Completed"
        ? "border-reopen text-reopen group-hover:bg-reopen group-hover:text-white"
        : "border-close text-close group-hover:bg-close group-hover:text-white"
    }
  `}
>
  {service.status === "Completed" ? (
    <>
      <FaRedoAlt className="group-hover:text-white text-reopen" /> Reopen Service
    </>
  ) : (
    <>
      <FaTimes className="group-hover:text-white text-close" /> Close Service
    </>
  )}
</button>

</div>


        {/* Interested Experts List */}
        {expandedService === service._id && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            {service.interestedExperts?.length > 0 ? (
              <ul className="space-y-3">
                {service.interestedExperts.map((expert) => (
                  <li
                    key={expert.expertId}
                    className="bg-white p-3 rounded-lg shadow-md"
                  >
                    <p className="flex items-center gap-2 text-gray-700 font-medium">
                      <b>Name: </b> {expert.expertName}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <b>Email: </b> {expert.expertEmail}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <b>Location:</b> {expert.expertLocation}
                    </p>
                    <button
                      onClick={() => selectExpert(service._id, expert)}
                      className="text-accent"
                    >
                      Select Expert
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No one has shown interest yet.</p>
            )}
          </div>
        )}

        {/* Selected Expert Contact */}
        {service.selectedExpert && (
          <p className="mt-4 text-gray-700 flex items-center gap-2">
            <strong>Selected Expert Contact:</strong>{" "}
            {service.selectedExpert.contactNumber || "Not provided yet"}
          </p>
        )}
      </div>
    ))}
  </div>
)}


{/* ✅ How to Use Section */}
      <HowtoUse />

      </div>
    </div>
  );
};

export default ClientDashboard;
