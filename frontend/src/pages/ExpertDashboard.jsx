import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import moment from "moment";
import {
  FaListAlt,
  FaUsers,
  FaCheckCircle,
  FaTags,
  FaMapMarkerAlt,

} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HowtoUse from "../components/HowtoUse";

const ExpertDashboard = () => {
  const { user } = useAuth();
  const [openServices, setOpenServices] = useState([]);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  // ✅ Fetch open services (Sorted by Newest First)
  useEffect(() => {
    const fetchOpenServices = async () => {
      if (!user || !user.token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/service/city-services",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch services");
        }

        const data = await res.json();
        setOpenServices(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // ✅ Stop loading after data fetch
      }
    };

    fetchOpenServices();
  }, [user]);

  // ✅ Express Interest
  const handleExpressInterest = async (serviceId) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/service/express-interest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ serviceId }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to express interest.");
      }

      toast.success("✅ Expressed Interest successfully!");
    } catch (err) {
      toast.error(err.message)
    }
  };

  // ✅ Submit Contact Number
  const submitContact = async () => {
    if (!contact) {
      alert("Please enter a contact number.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/service/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          serviceId: selectedService,
          expertId: user.uid,
          contactNumber: contact,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit contact.");
      }

      toast.success("✅ Contact Sent to Client!")
      setContact("");
      setSelectedService(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Calculate total selected services
  const selectedServicesCount = openServices.filter(
    (service) => service.selectedExpert?.expertId === user.uid
  ).length;

  return (
    <div className="flex pt-[70px]">
      {/* ✅ Sidebar - Only visible on large screens */}
      <aside className="hidden lg:flex w-64 bg-main text-white flex-col items-center py-8 px-4 fixed left-0 top-[70px] h-full shadow-lg">
        <h3 className="text-2xl font-bold mb-6">Stats</h3>

        <div className="w-full space-y-4">
          {/* ✅ Total Services */}
          <div className="flex items-center bg-white/20 p-4 rounded-lg w-full">
            <FaListAlt className="text-secondary text-xl mr-3" />
            <p className="text-lg">
              Total Services:{" "}
              <strong>
                {loading ? <Skeleton width={30} /> : openServices.length}
              </strong>
            </p>
          </div>

          {/* ✅ Total Interested Experts */}
          <div className="flex items-center bg-white/20 p-4 rounded-lg w-full">
            <FaUsers className="text-secondary text-xl mr-3" />
            <p className="text-lg">
              Interested Experts:{" "}
              <strong>
                {loading ? (
                  <Skeleton width={30} />
                ) : (
                  openServices.reduce(
                    (acc, service) =>
                      acc + (service.interestedExperts?.length || 0),
                    0
                  )
                )}
              </strong>
            </p>
          </div>

          {/* ✅ Total Services Selected By Clients */}
          <div className="flex items-center bg-white/20 p-4 rounded-lg w-full">
            <FaCheckCircle className="text-secondary text-xl mr-3" />
            <p className="text-lg">
              Selected By Clients:{" "}
              <strong>
                {loading ? <Skeleton width={30} /> : selectedServicesCount}
              </strong>
            </p>
          </div>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <div className="lg:ml-64 pt-5 pb-16 min-h-screen bg-gray-100 w-full">
        <div className="xl:max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 mt-6 text-center text-gray-900">
            Browse Available Services
          </h2>

          {error && <p className="text-close text-center">{error}</p>}

          <div className="space-y-6">
            {loading
              ? // ✅ Skeleton Loading for Cards
                [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-6 relative border-l-4 border-main"
                  >
                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                      <Skeleton width={150} />
                    </p>
                    <h3 className="text-xl font-semibold">
                      <Skeleton width="80%" />
                    </h3>
                    <p className="text-gray-600">
                      <Skeleton count={2} />
                    </p>
                    <div className="text-sm text-gray-500 mt-2">
                      <p className="flex items-center">
                        <FaTags className="text-secondary mr-2" />
                        <Skeleton width={100} />
                      </p>
                      <p className="flex items-center">
                        <FaMapMarkerAlt className="text-secondary mr-2" />
                        <Skeleton width={120} />
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <Skeleton width="40%" height={35} />
                      <Skeleton width="40%" height={35} />
                    </div>
                  </div>
                ))
              : openServices.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white shadow-lg rounded-lg p-6 relative border-l-4 border-main"
                  >
                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                      Posted by{" "}
                      <span className="font-semibold ml-1">
                        {service.clientName}
                      </span>{" "}
                      •{" "}
                      {moment(service.createdAt).format("MMMM Do YYYY, h:mm A")}
                    </p>

                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <p className="flex items-center">
                        <FaTags className="text-secondary mr-2" />
                        <strong>Category:</strong> {service.category}
                      </p>
                      <p className="flex items-center">
                        <FaMapMarkerAlt className="text-secondary mr-2" />
                        <strong>Location:</strong>{" "}
                        {service.location?.city || "Not provided"}
                      </p>
                    </div>

                    {/* ✅ Show message if expert is selected */}
                    {service.selectedExpert?.expertId === user.uid && (
                      <p className="text-reopen font-semibold mt-3">
                        ✅ The client has selected you and wants to connect!
                      </p>
                    )}

                    {/* ✅ Buttons for Express Interest & Contact Submission */}
                    <div className="mt-4 flex space-x-3">
                      {service.selectedExpert?.expertId === user.uid ? (
                        <button
                          onClick={() => setSelectedService(service._id)}
                          className={`px-4 py-2 text-white rounded-lg transition ${
                            service.selectedExpert?.contactNumber
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                          disabled={!!service.selectedExpert?.contactNumber}
                        >
                          {service.selectedExpert?.contactNumber
                            ? "Contact Provided"
                            : "Submit Contact"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleExpressInterest(service._id)}
                          className="btn-main"
                        >
                          Express Interest
                        </button>
                      )}
                    </div>
                  </div>
                ))}
          </div>
          {/* How to Use Guide */}
          <HowtoUse />
        </div>
        
      </div>

      {/* ✅ Contact Submission Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Submit Contact Number
            </h3>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button onClick={submitContact} className="btn-main">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExpertDashboard;
