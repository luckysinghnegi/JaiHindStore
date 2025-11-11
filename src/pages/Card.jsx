import React from 'react'
import '../styles/Card_style.css'
import { Link } from 'react-router-dom'

function Card({
  imageUrl = '',
  title = 'Product title',
  subtitle = '',
  price = '₹0',
  mrp = '',
  rating = 0,
  reviews = 0,
  badge = '',
  onClick,
  ctaText = 'Add to Cart',
  productIndex
}) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)))
  const stars = '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded)
  const formattedRating = Number.isFinite(rating) ? rating.toFixed(1) : rating

  const handleWhatsApp = () => {
    const phone = "919968362118";   // Your number with country code (91)
    const message = `Hi, I saw your product: ${title} and I want to order it.`;
    const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="card" role="article" onClick={onClick}>
      {badge ? <span className="card-badge">{badge}</span> : null}
      <div className="card-image">
        <img src={imageUrl} alt={title} loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
        <div className="card-rating" aria-label={`Rating ${rounded} out of 5`}>
          <span className="card-stars">{stars}</span>
          <span className="card-rating-value">{formattedRating}</span>
          {reviews ? <span className="card-reviews">({reviews} reviews)</span> : null}
        </div>
        <div className="card-price">
          <span className="card-price-current">{price}</span>
          {mrp ? <span className="card-price-mrp">{mrp}</span> : null}
        </div>
      </div>
      <div className="Button_container">
        <button type="button" className="btn" onClick={(e) => {
          e.stopPropagation();
          handleWhatsApp();
        }}>
          {ctaText}
        </button>
        <Link to={`/product-details/${productIndex}`} onClick={(e) => e.stopPropagation()}>
          <button type="button" className="btn btn-details">
            Product Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Card


