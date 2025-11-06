import React from "react";
import "../styles/About_style.css";

function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <h1>About Jai Hind Store</h1>
        <p>Serving cadets across India with top-quality NCC uniforms & accessories since [Year].</p>
      </div>

      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>To deliver regulation-approved NCC gear at honest prices and build confidence, discipline & uniformity among cadets.</p>
      </div>

      <div className="about-story">
        <h2>Our Story</h2>
        <p>Founded by an ex-cadet, we understand the needs of parade-day, camps & training. We started in Delhi, and today ship across India.</p>
        <ul className="about-values">
          <li>Integrity in every stitch.</li>
          <li>Fast shipment & trusted service.</li>
          <li>Custom and institutional orders handled.</li>
        </ul>
      </div>

      <div className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Founder" />
            <h3>Founder Name</h3>
            <p>Ex NCC cadet with 10+ years of field and uniform experience.</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Operations Head" />
            <h3>Operations Head</h3>
            <p>Ensures quality control & timely dispatch.</p>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <p>Ready to gear up for your next parade?</p>
        <a className="btn" href="/products">Browse Products</a>
      </div>
    </section>
  );
}

export default About;


