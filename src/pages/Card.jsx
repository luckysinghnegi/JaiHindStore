import React from 'react'
import '../styles/Card_style.css'

function Card({
  imageUrl = '',
  title = 'Product title',
  subtitle = '',
  price = '₹0',
  mrp = '',
  rating = 0,
  onClick,
  ctaText = 'Add to Cart'
}) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)))
  const stars = '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded)

  const handleWhatsApp = () => {
    const phone = "919968362118";   // Your number with country code (91)
    const message = `Hi, I saw your product: ${title} and I want to order it.`;
    const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="scroll-container">

      <div className="card" role="article" onClick={onClick}>
        <div className="card-image">
          <img src={imageUrl} alt={title} loading="lazy" />
        </div>
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
          <div className="card-rating" aria-label={`Rating ${rounded} out of 5`}>{stars}</div>
          <div className="card-price">
            <span className="card-price-current">{price}</span>
            {mrp ? <span className="card-price-mrp">{mrp}</span> : null}
          </div>
          <div className="card-actions">
            <button type="button" className="btn" onClick={handleWhatsApp}>{ctaText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card


