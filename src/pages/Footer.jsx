import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer_style.css";

const Footer = ({
  storeName = "Jai Hind Store",
  supportEmail = "support@jaihindstore.com",
  phone = "+91 98765 43210",
  address = "Delhi, India",
}) => {
  const year = new Date().getFullYear();
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-left">
          <h3>{storeName}</h3>
          <p>Official NCC Accessories — Quality you wear with pride <span aria-hidden="true">🇮🇳</span></p>
        </div>

        <nav className="footer-center" aria-label="Quick links">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/terms">Terms & Policy</Link></li>
          </ul>
        </nav>

        <address className="footer-right">
          <h4>Contact Info</h4>
          <p>Email: <a href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
          <p>Phone: <a href={telHref}>{phone}</a></p>
          <p>{address}</p>

          <div className="social-icons" aria-label="Social links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
          </div>
        </address>
      </div>

      <div className="footer-bottom">
        <p>© {year} {storeName} — All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

