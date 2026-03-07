// src/components/TopHeader.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function TopHeader({ onSearchClick, onCartClick }) {
    const { cartCount } = useApp();

    return (
        <header className="top-header">
            <div className="logo-text">KIBS<span> Gadgets</span></div>

            <div className="search-bar" onClick={onSearchClick} style={{ cursor: 'pointer', flex: 1, maxWidth: 200 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input readOnly placeholder="Search gadgets…" style={{ cursor: 'pointer' }} />
            </div>

            <div className="header-icons">
                {/* Wishlist */}
                <button className="header-icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
                {/* Cart */}
                <button className="header-icon-btn" onClick={onCartClick} style={{ position: 'relative' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {cartCount > 0 && <span className="cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>}
                </button>
            </div>
        </header>
    );
}
