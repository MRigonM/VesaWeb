import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="pt-12 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Contact Header */}
      <motion.section
        className="w-full py-20 bg-purple-700 text-white text-center shadow-inner px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-extrabold mb-4 tracking-wide">Contact Us</h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          We are ready to help you! Fill out the form below to contact us.
        </p>
      </motion.section>

      {/* Form Section */}
      <motion.section
        className="max-w-4xl w-full py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center">
            Contact Form
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6 text-left">
              <label htmlFor="name" className="block font-medium mb-2 text-gray-800">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                placeholder="Write your name"
              />
            </div>

            <div className="mb-6 text-left">
              <label htmlFor="email" className="block font-medium mb-2 text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6 text-left">
              <label htmlFor="message" className="block font-medium mb-2 text-gray-800">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                placeholder="Enter your message"
              />
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-4 px-8 py-3 bg-purple-700 text-white rounded-xl font-semibold shadow-md hover:bg-purple-800 transition"
              >
                Send Message
              </motion.button>
            </div>

            {submitted && (
              <p className="mt-6 text-center text-green-600 font-semibold">
                Thank you for contacting us! We will get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section
        className="w-full py-20 bg-purple-700 text-white text-center shadow-inner px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6">Contact Information</h2>
        <p className="mb-2 text-lg">Email: contact@mycompany.com</p>
        <p className="mb-2 text-lg">TEL: +383 123 456 789</p>
        <p className="text-lg">Address: Prishtine, Kosove</p>
      </motion.section>
    </div>
  );
}
