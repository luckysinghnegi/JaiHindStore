import React, { useState, useEffect, useId } from "react";
import "../styles/Contact_style.css";
import { db } from "../Firebase_data_base/Firebase";
import { collection, addDoc } from "firebase/firestore";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const id = useId();

  // Test Firebase connection on mount
  useEffect(() => {
    console.log("Firebase db initialized:", db ? "Yes" : "No");
    if (!db) {
      setError("Firebase not initialized. Please check configuration.");
    }
  }, []);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Clear messages when user starts typing
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!", { name, email, message, id});

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Attempting to save to Firestore...");
      const docRef = await addDoc(collection(db, "contacts"), {
        id: id,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      setSuccess("Message sent successfully! We'll get back to you soon.");
      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);

      // More specific error messages
      let errorMsg = "Failed to send message. ";
      if (err.code === 'permission-denied') {
        errorMsg += "Permission denied. Please check Firebase Firestore rules.";
      } else if (err.code === 'unavailable') {
        errorMsg += "Service unavailable. Please check your internet connection.";
      } else if (err.message) {
        errorMsg += err.message;
      } else {
        errorMsg += "Please try again.";
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions or ready to place your order? We're here to help.</p>
      </div>

      <div className="contact-info">
        <div className="info-card">
          <h3>Email Us</h3>
          <p>support@jaihindstore.com</p>
        </div>
        <div className="info-card">
          <h3>Call Us</h3>
          <p><a href="tel:+919968362118">+91 99683 62118</a></p>
        </div>
        <div className="info-card">
          <h3>Visit Us</h3>
          <p>Delhi, India</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send a Message</h2>
        {error && (
          <div className="error-message">
            {error}
            <button
              type="button"
              className="close-btn"
              onClick={() => setError("")}
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}
        {success && (
          <div className="success-message">
            {success}
            <button
              type="button"
              className="close-btn"
              onClick={() => setSuccess("")}
              aria-label="Close success message"
            >
              ×
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={name}
            onChange={handleNameChange}
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={handleEmailChange}
            disabled={loading}
          />
          <textarea
            name="message"
            placeholder="Write your message…"
            required
            value={message}
            onChange={handleMessageChange}
            disabled={loading}
          ></textarea>
          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;


