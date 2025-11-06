import React from "react";
import "../styles/Contact_style.css";

function Contact() {
  return (
    <section className="contact">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions or ready to place your order? We’re here to help.</p>
      </div>

      <div className="contact-info">
        <div className="info-card">
          <h3>Email Us</h3>
          <p>support@jaihindstore.com</p>
        </div>
        <div className="info-card">
          <h3>Call Us</h3>
          <p>+91 98765 43210</p>
        </div>
        <div className="info-card">
          <h3>Visit Us</h3>
          <p>Delhi, India</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send a Message</h2>
        <form action="#" method="POST">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Write your message…" required></textarea>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;


