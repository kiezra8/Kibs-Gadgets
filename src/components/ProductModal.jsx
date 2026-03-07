// src/components/ProductModal.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/store';

export default function ProductModal({ product, onClose }) {
    const { addToCart, toggleWishlist, isWishlisted, getImg } = useApp();
    if (!product) return null;

    const wishlisted = isWishlisted(product.id);
    const img = getImg('product', product.id, product.defaultImg);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                <div className="modal-handle" />

                <img src={img} alt={product.name} className="modal-product-img" />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                    <div>
                        <h2 className="modal-product-name">{product.name}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className={`product-badge ${product.condition === 'new' ? 'badge-new' : 'badge-used'}`} style={{ position: 'static', fontSize: 11 }}>
                                {product.condition === 'new' ? 'New' : 'Used'}
                            </span>
                            <div className="product-rating">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <span style={{ fontSize: 12, fontWeight: 600 }}>{product.rating}</span>
                                <span className="rating-count">({product.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, lineHeight: 1, color: '#999', padding: 4 }}
                        onClick={onClose}
                    >✕</button>
                </div>

                <p className="modal-product-price">
                    {formatPrice(product.price)}
                    {product.oldPrice && (
                        <span style={{ fontSize: 14, color: '#aaa', textDecoration: 'line-through', marginLeft: 10, fontWeight: 400 }}>
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </p>

                <p className="modal-product-desc">{product.description}</p>

                {product.specs && (
                    <div>
                        {Object.entries(product.specs).map(([k, v]) => (
                            <div className="modal-spec-row" key={k}>
                                <span className="modal-spec-label">{k}</span>
                                <span className="modal-spec-val">{v}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="modal-actions">
                    <button className="btn-outline" onClick={() => { toggleWishlist(product); }}>
                        {wishlisted ? '❤️ Wishlisted' : '🤍 Wishlist'}
                    </button>
                    <button className="btn-primary" onClick={() => { addToCart(product); onClose(); }}>
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
