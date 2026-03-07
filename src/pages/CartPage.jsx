// src/pages/CartPage.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/store';

export default function CartPage({ onClose }) {
    const { cart, removeFromCart, updateQty, cartTotal, cartCount, getImg, addToCart } = useApp();

    if (cart.length === 0) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                    <div className="modal-handle" />
                    <h2 className="modal-title">🛒 My Cart</h2>
                    <div className="empty-state" style={{ padding: '40px 20px' }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <h3>Your cart is empty</h3>
                        <p>Browse our products and add items to cart</p>
                    </div>
                    <button className="btn-primary" onClick={onClose}>Continue Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-sheet" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                <div className="modal-handle" />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <h2 className="modal-title" style={{ marginBottom: 0 }}>🛒 Cart ({cartCount})</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#aaa' }}>✕</button>
                </div>

                {cart.map(item => {
                    const img = getImg('product', item.id, item.defaultImg);
                    return (
                        <div className="cart-item" key={item.id} id={`cart-item-${item.id}`}>
                            <img className="cart-item-img" src={img} alt={item.name} />
                            <div className="cart-item-info">
                                <p className="cart-item-name" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</p>
                                <p className="cart-item-price">{formatPrice(item.price)}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#e63946', padding: 0 }}
                                >🗑️</button>
                                <div className="cart-qty-ctrl">
                                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                                    <span className="cart-qty-val">{item.qty}</span>
                                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Summary */}
                <div style={{ background: '#f7f7f7', borderRadius: 12, padding: 14, margin: '10px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#757575' }}>
                            <span>Subtotal ({cartCount} items)</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#757575' }}>
                            <span>Delivery</span>
                            <span style={{ color: '#2ecc71', fontWeight: 600 }}>FREE</span>
                        </div>
                        <div style={{ borderTop: '1.5px solid #ddd', paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 15 }}>
                            <span>Total</span>
                            <span style={{ color: '#e63946' }}>{formatPrice(cartTotal)}</span>
                        </div>
                    </div>
                </div>

                <button
                    className="btn-primary"
                    onClick={() => {
                        const message = `*NEW ORDER - KIBS GADGETS*\n\n` +
                            cart.map(item => `${item.qty}x ${item.name} (${formatPrice(item.price)})`).join('\n') +
                            `\n\n*Total:* ${formatPrice(cartTotal)}\n\nPlease confirm my order!`;

                        const encodedMessage = encodeURIComponent(message);
                        window.open(`https://wa.me/256756439671?text=${encodedMessage}`, '_blank');
                        onClose();
                    }}
                    id="checkout-btn"
                >
                    Checkout · {formatPrice(cartTotal)}
                </button>
                <button className="btn-outline" onClick={onClose} style={{ marginTop: 10 }}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}
