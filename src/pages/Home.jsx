import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import "../styles/Home_style.css";

import Products_data from "../Product_data/Products_data.js"

function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const card_data = Products_data;
  const featuredProducts = card_data.slice(0, 8);
  const newProducts = card_data.slice(8);
  // Premium collection - mix of top-rated products
  const premiumProducts = card_data.filter((item, index) => 
    item.rating >= 4.5 || item.badge === "Top Rated" || item.badge === "Premium" || item.badge === "Editor's Pick"
  ).slice(0, 6);

  const testimonials = [
    { text: "The belt and badge I got were tough and looked perfect for parade day!", author: "Cadet A. Singh", rating: 5 },
    { text: "Fast delivery and excellent quality. Highly recommend for all cadets!", author: "Cadet R. Kumar", rating: 5 },
    { text: "Best place to buy NCC accessories. Everything is regulation-approved!", author: "Cadet P. Sharma", rating: 5 }
  ];

  // Animate stats counter
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                stat.textContent = target;
              }
            };
            updateCounter();
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []);

  return (
    <section className="home" id="home">
      <nav className="mobile-nav" aria-label="Quick section links">
        <span className="mobile-nav_brand">NCC Store</span>
        <div className="mobile-nav_links">
          <a href="/">Home</a>
          <a href="/About">About</a>
          <a href="/Services">Serumvices</a>
          <a href="#categories">Categories</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>
      <div className="hero">
        <h1>Welcome to NCC Accessories Store</h1>
        <p>Find the best quality NCC uniforms, badges, belts, parade items & more — all in one place.</p>
        {/* <a href="#products" className="btn">Explore Products</a> */}
      </div>

      {/* Special Offer Banner */}
      <div className="special-offer">
        <div className="offer-content">
          <span className="offer-badge">🔥 Limited Time Offer</span>
          <h3>Get 15% OFF on Orders Above ₹2000</h3>
          <p>Use code: <strong>NCC2024</strong></p>
          <div className="countdown">
            <span>Ends soon!</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number" data-target="5000">0</div>
          <div className="stat-label">+ Happy Cadets</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-target="150">0</div>
          <div className="stat-label">+ Units Served</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-target="98">0</div>
          <div className="stat-label">% Satisfaction Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-target="24">0</div>
          <div className="stat-label">Hour Support</div>
        </div>
      </div>

      <div id="products" className="products">
        <div className="products-header">
          <h2>Featured Accessories</h2>
          <div className="products-tags">
            <span className="tag active">Best Sellers</span>
            <span className="tag">New Arrivals</span>
            <span className="tag">Cadet Favorites</span>
            <span className="tag">Limited Stock</span>
          </div>
        </div>
        <div className="Card_container">
          <div className="products-row">
            {featuredProducts.map((item, index) => (
              <Card
                key={`${item.title}-${index}`}
                imageUrl={item.imageUrl}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                mrp={item.mrp}
                rating={item.rating}
                reviews={item.reviews}
                badge={item.badge}
                ctaText={item.ctaText}
                productIndex={index}
              />
            ))}
          </div>
        </div>
      </div>

      {newProducts.length > 0 && (
        <div className="new-products-section" id="new-arrivals">
          <div className="new-products-header">
            <div>
              <p className="section-eyebrow">Fresh For Parade Season</p>
              <h3>New Arrival Essentials</h3>
            </div>
            <a href="#contact" className="new-products-cta">Need custom kits? Talk to us →</a>
          </div>
          <div className="new-products-grid">
            {newProducts.map((item, index) => {
              const actualIndex = index + featuredProducts.length;
              return (
                <Card
                  key={`${item.title}-${actualIndex}`}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  price={item.price}
                  mrp={item.mrp}
                  rating={item.rating}
                  reviews={item.reviews}
                  badge={item.badge}
                  ctaText={item.ctaText}
                  productIndex={actualIndex}
                />
              )
            })}
          </div>
        </div>
      )}

      {premiumProducts.length > 0 && (
        <div className="premium-collection-section" id="premium">
          <div className="premium-header">
            <div className="premium-header-content">
              <span className="premium-badge">⭐ Premium Collection</span>
              <h2>Top-Rated Cadet Essentials</h2>
              <p>Handpicked by our team for exceptional quality & cadet satisfaction</p>
            </div>
          </div>
          <div className="premium-products-container">
            {premiumProducts.map((item, index) => {
              const actualIndex = card_data.findIndex(p => p.title === item.title);
              return (
                <div key={`premium-${item.title}-${index}`} className="premium-card">
                  <div className="premium-card-image">
                    <img src={item.imageUrl} alt={item.title} />
                    {item.badge && (
                      <span className="premium-card-badge">{item.badge}</span>
                    )}
                  </div>
                  <div className="premium-card-content">
                    <div className="premium-card-rating">
                      <span className="premium-stars">{'★'.repeat(Math.round(item.rating))}{'☆'.repeat(5 - Math.round(item.rating))}</span>
                      <span className="premium-rating-text">{item.rating}</span>
                      <span className="premium-reviews">({item.reviews} reviews)</span>
                    </div>
                    <h3 className="premium-card-title">{item.title}</h3>
                    <p className="premium-card-subtitle">{item.subtitle}</p>
                    <div className="premium-card-price">
                      <span className="premium-price-current">{item.price}</span>
                      {item.mrp && item.mrp !== item.price && (
                        <span className="premium-price-mrp">{item.mrp}</span>
                      )}
                    </div>
                    <div className="premium-card-actions">
                      <button 
                        className="premium-btn-primary"
                        onClick={() => {
                          const phone = "919968362118";
                          const message = `Hi, I want to order: ${item.title} - ${item.price}`;
                          const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
                          window.open(url, "_blank");
                        }}
                      >
                        Order Now
                      </button>
                      <Link to={`/product-details/${actualIndex}`} className="premium-btn-secondary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="why-us">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✔ Regulation-Certified Accessories</li>
          <li>✔ Nationwide Shipping Across India</li>
          <li>✔ Bulk & Institutional Orders Available</li>
        </ul>
      </div>

      {/* Featured Badges Section */}
      <div className="featured-badges" id="why-us">
        <h2>Why Cadets Trust Us</h2>
        <div className="badges-grid">
          <div className="badge-item">
            <div className="badge-icon">✓</div>
            <h4>100% Authentic</h4>
            <p>Regulation-approved products only</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon">🚚</div>
            <h4>Fast Delivery</h4>
            <p>5-7 days across India</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon">💳</div>
            <h4>Secure Payment</h4>
            <p>Multiple payment options</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon">🔄</div>
            <h4>Easy Returns</h4>
            <p>7-day return policy</p>
          </div>
        </div>
      </div>

      {/* Interactive Testimonial Carousel */}
      <div className="testimonial">
        <h2>What Our Cadets Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-slide active">
            <div className="testimonial-stars">
              {'★'.repeat(testimonials[0].rating)}{'☆'.repeat(5 - testimonials[0].rating)}
            </div>
            <blockquote>"{testimonials[0].text}"</blockquote>
            <cite>— {testimonials[0].author}</cite>
          </div>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="quick-categories" id="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">🎩</div>
            <h3>Headwear</h3>
            <p>Caps, Berets & More</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👔</div>
            <h3>Uniforms</h3>
            <p>Complete Sets</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🎖️</div>
            <h3>Badges</h3>
            <p>Official Badges</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👢</div>
            <h3>Footwear</h3>
            <p>DMS Boots & More</p>
          </div>
        </div>
      </div>

      <div className="contact-section" id="contact">
        <h2>Need Assistance?</h2>
        <p>Contact our support team for product recommendations, order tracking, or institutional bulk purchases.</p>
        <div className="contact-actions">
          <a href="/contact" className="btn">Contact Form</a>
          <a href="tel:+919968362118" className="contact-link">Call +91 99683 62118</a>
        </div>
      </div>

      {/* Floating Action Button */}
      <a href="/contact" className="fab" aria-label="Quick contact">
        <span className="fab-icon">💬</span>
        <span className="fab-text">Need Help?</span>
      </a>
    </section>
  );
}

export default Home;

