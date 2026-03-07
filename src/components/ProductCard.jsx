// src/components/ProductCard.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/store';

export default function ProductCard({ product, onClick }) {
    const { addToCart, toggleWishlist, isWishlisted, getImg } = useApp();
    const wishlisted = isWishlisted(product.id);
    const img = getImg('product', product.id, product.defaultImg);

    const handleCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleWish = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div className="product-card" onClick={() => onClick(product)} id={`product-${product.id}`}>
            <div className="product-card-img-wrap">
                <img src={img} alt={product.name} loading="lazy" />
                <span className={`product-badge ${product.condition === 'new' ? 'badge-new' : 'badge-used'}`}>
                    {product.condition === 'new' ? 'New' : 'Used'}
                </span>
                {product.discount > 0 && (
                    <span className="product-badge badge-sale" style={{ top: product.condition ? 30 : 6, left: 6 }}>
                        -{product.discount}%
                    </span>
                )}
                <button
                    className={`product-wishlist${wishlisted ? ' active' : ''}`}
                    onClick={handleWish}
                    aria-label="Toggle wishlist"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? '#e63946' : 'none'} stroke={wishlisted ? '#e63946' : '#666'} strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            <div className="product-card-info">
                <p className="product-name">{product.name}</p>
                <div className="product-price-row">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                        <span className="product-old-price">{formatPrice(product.oldPrice)}</span>
                    )}
                </div>
                {product.oldPrice && (
                    <div className="product-price-row" style={{ marginTop: 2 }}>
                        <span className="product-discount">Save {formatPrice(product.oldPrice - product.price)}</span>
                    </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                    <div className="product-rating">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#333' }}>{product.rating}</span>
                        <span className="rating-count">({product.reviews})</span>
                    </div>
                    <button className="add-cart-btn" onClick={handleCart} aria-label="Add to cart">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
