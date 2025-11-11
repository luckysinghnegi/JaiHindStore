import React, { useEffect } from 'react'
import Products_data from '../Product_data/Products_data.js'
import { useParams } from 'react-router-dom'
import '../styles/Product_details_style.css'

function Product_details() {
    const { id } = useParams()
    const index = Number(id)
    const product = Number.isInteger(index) ? Products_data[index] : undefined

    const rounded = Math.max(0, Math.min(5, Math.round(product?.rating || 0)))
    const stars = '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [id])

    const handleWhatsApp = () => {
        const phone = "919968362118"
        const message = `Hi, I want to order: ${product?.title} - ${product?.price}`
        const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
    }

    if (!product) {
        return (
            <div className="product-details-error">
                <h2>Product not found</h2>
                <p>The product you're looking for doesn't exist.</p>
            </div>
        )
    }

    return (
        <div className="product-details-page">
            <div className="product-details-container">
                {/* Left Side - Product Images */}
                <div className="product-image-section">
                    <div className="main-image-container">
                        <img src={product.imageUrl} alt={product.title} className="main-product-image" />
                    </div>
                </div>

                {/* Right Side - Product Details */}
                <div className="product-info-section">
                    <h1 className="product-title">{product.title}</h1>

                    <div className="product-rating">
                        <span className="rating-stars">{stars}</span>
                        <span className="rating-text">{product.rating} out of 5</span>
                        <a href="#reviews" className="rating-link">See all reviews</a>
                    </div>

                    <div className="product-price-section">
                        <span className="price-current">{product.price}</span>
                        {product.mrp && product.mrp !== product.price && (
                            <>
                                <span className="price-mrp">{product.mrp}</span>
                                <span className="price-save">
                                    {(() => {
                                        const mrpValue = parseInt(product.mrp.replace(/[₹,]/g, '')) || 0
                                        const priceValue = parseInt(product.price.replace(/[₹,]/g, '')) || 0
                                        const savings = mrpValue - priceValue
                                        const discount = mrpValue > 0 ? Math.round((savings / mrpValue) * 100) : 0
                                        return savings > 0 ? `You Save: ₹${savings} (${discount}%)` : ''
                                    })()}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="product-description">
                        <p>{product.subtitle}</p>
                    </div>

                    <div className="product-features">
                        <h3>About this item</h3>
                        <ul>
                            <li>100% Authentic NCC Regulation Approved</li>
                            <li>Premium Quality Material</li>
                            <li>Fast Delivery Across India</li>
                            <li>Easy Returns & Exchange Policy</li>
                        </ul>
                    </div>

                    <div className="product-actions">
                        <button className="btn-add-to-cart" onClick={handleWhatsApp}>
                            Add to Cart
                        </button>
                        <button className="btn-buy-now" onClick={handleWhatsApp}>
                            Buy Now
                        </button>
                    </div>

                    <div className="product-shipping-info">
                        <p className="shipping-text">🚚 <strong>FREE Delivery</strong> on orders over ₹500</p>
                        <p className="shipping-location">Deliver to <strong>Delhi - 110001</strong></p>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="product-specifications">
                <h2>Product Specifications</h2>
                <div className="specs-grid">
                    <div className="spec-item">
                        <span className="spec-label">Brand</span>
                        <span className="spec-value">Jai Hind Store</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Material</span>
                        <span className="spec-value">Premium Quality</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Certification</span>
                        <span className="spec-value">NCC Approved</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Warranty</span>
                        <span className="spec-value">7 Days Replacement</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product_details