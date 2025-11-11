import React,{useEffect} from "react";
import "../styles/Services_style.css";

function Services() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return (
    <section className="services">
      <div className="services-hero">
        <h1>Our Services for NCC Cadets</h1>
        <p>From uniforms to parade kits — everything a cadet needs, delivered with precision and reliability.</p>
      </div>

      <div className="service-list">
        <div className="service-card">
          <h3>Uniform Supply & Fitting</h3>
          <p>Regulation-approved NCC uniforms — custom fitting available for schools, colleges & units.</p>
        </div>
        <div className="service-card">
          <h3>Accessories & Parade Kits</h3>
          <p>Belts, badges, berets, lanyards and more — designed to meet NCC styles and standards.</p>
        </div>
        <div className="service-card">
          <h3>Bulk & Institutional Orders</h3>
          <p>Order for entire units or camps — special pricing, fast dispatch, and unit branding available.</p>
        </div>
      </div>

      <div className="why-choose-us">
        <h2>Why Choose Jai Hind Store?</h2>
        <ul>
          <li>✔ 100% regulation-compliant products</li>
          <li>✔ Fast delivery across India</li>
          <li>✔ Dedicated support for units & cadets</li>
        </ul>
      </div>

      <div className="cta">
        <a href="/contact" className="btn">Request a Quote</a>
      </div>

      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>What sizes are available?</h4>
          <p>We stock standard NCC sizes and also offer tailoring for units — contact us with requirements.</p>
        </div>
        <div className="faq-item">
          <h4>How quickly will my order arrive?</h4>
          <p>Typical delivery is within 5-7 business days for metro areas; bulk or custom orders may take longer.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;

