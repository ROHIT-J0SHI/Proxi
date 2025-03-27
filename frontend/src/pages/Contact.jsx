import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUser, FaComment } from 'react-icons/fa';
import contactimg from '../assets/contactimg.jpg'; // Adjust the path if needed

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div
      className="py-12 px-6 min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${contactimg})` }}
    >
      <div className="max-w-6xl w-full p-8 lg:p-12 flex flex-col gap-20 lg:flex-row items-center bg-opacity-80">
        <div className="lg:w-1/2 w-full p-6 md:ml-16 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 mt-10 md:mt-0">Contact Us</h2>
          <p className="text-md md:text-lg  text-gray-600 mb-6">
            Have questions or need assistance? We are here to assist. Just fill out the form and our team will reach out to you shortly.
          </p>
          <div className="space-y-4 md:mt-16">
            <p className=" text-gray-700 font-semibold">
              📞 +123 456 7890
            </p>
            <p className="text-lg text-gray-700 font-semibold ">
              📩 rohitjoshii55555@gmail.com
            </p>
            <p className="text-lg text-gray-700 font-semibold ">
              ⌛ Chat Time: 9am - 6pm
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 w-full p-6">
          {success && (
            <p className="text-center text-green-500 text-lg font-semibold mb-4">
              We have received your message!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-main" />
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-4 bg-bg rounded-lg text-sm"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-main" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-4 bg-bg rounded-lg text-sm"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-main" />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile No."
                value={formData.mobile}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-4 bg-bg rounded-lg text-sm"
              />
            </div>

            <div className="relative">
              <FaComment className="absolute left-3 top-3 text-main" />
              <textarea
                name="message"
                rows="4"
                required
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-4 bg-bg rounded-lg text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn-main py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
