// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/store';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const BANNERS = [
    {
        title: 'Top Smartphones',
        sub: 'New arrivals from Samsung, iPhone & more',
        badge: '🔥 HOT DEALS',
        bg: 'linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)',
        img: 'https://images.unsplash.com/photo-1710943745791-b7c64a1bfb36?w=480&q=80',
    },
    {
        title: 'Laptops Up to 30% Off',
        sub: 'New & refurbished deals on top brands',
        badge: '💻 LAPTOPS',
        bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=480&q=80',
    },
    {
        title: 'Premium Audio',
        sub: 'Speakers, Headphones & more',
        badge: '🎧 AUDIO',
        bg: 'linear-gradient(135deg, #6a0dad 0%, #9b59b6 100%)',
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=480&q=80',
    },
];

const PROMOS = [
    '🔥 FREE DELIVERY on orders over UGX 500K',
    '✅ 100% Authentic Gadgets Guaranteed',
    '💳 Pay on Delivery Available',
    '🔄 7-Day Return Policy',
    '📦 Same-Day Delivery in Kampala',
    '⭐ Over 500 Happy Customers',
];

export default function HomePage({ onProductClick, onCategoryClick, onNavigate }) {
    const { getImg } = useApp();
    const [bannerIdx, setBannerIdx] = useState(0);
    const [activeCat, setActiveCat] = useState('all');
    const [hours, setHours] = useState(5);
    const [mins, setMins] = useState(23);
    const [secs, setSecs] = useState(47);

    // Banner auto-rotate
    useEffect(() => {
        const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 4000);
        return () => clearInterval(t);
    }, []);

    // Flash sale countdown
    useEffect(() => {
        const t = setInterval(() => {
            setSecs(s => {
                if (s > 0) return s - 1;
                setMins(m => {
                    if (m > 0) return m - 1;
                    setHours(h => h > 0 ? h - 1 : 23);
                    return 59;
                });
                return 59;
            });
        }, 1000);
        return () => clearInterval(t);
    }, []);

    const pad = n => String(n).padStart(2, '0');
    const flashProducts = PRODUCTS.filter(p => p.discount >= 15).slice(0, 6);
    const filteredProducts = activeCat === 'all'
        ? PRODUCTS.slice(0, 8)
        : PRODUCTS.filter(p => p.category === activeCat).slice(0, 8);

    return (
        <div className="home-page">
            {/* Promo strip */}
            <div className="promo-strip">
                <div className="promo-strip-track">
                    {[...PROMOS, ...PROMOS].map((p, i) => (
                        <span className="promo-strip-item" key={i}>
                            {p}
                            <span style={{ opacity: 0.4, margin: '0 10px' }}>|</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Hero Banner */}
            <div className="banner-carousel">
                {BANNERS.map((b, i) => (
                    <div key={i} className={`banner-slide${bannerIdx === i ? ' active' : ''}`}>
                        <img src={b.img} alt={b.title} style={{ objectPosition: 'center top' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />
                        <div className="banner-content">
                            <div className="banner-badge">{b.badge}</div>
                            <h1 className="banner-title">{b.title}</h1>
                            <p className="banner-sub">{b.sub}</p>
                            <button className="banner-btn" onClick={() => onNavigate('products')}>Shop Now →</button>
                        </div>
                    </div>
                ))}
                <div className="banner-dots">
                    {BANNERS.map((_, i) => (
                        <div key={i} className={`banner-dot${bannerIdx === i ? ' active' : ''}`} onClick={() => setBannerIdx(i)} />
                    ))}
                </div>
            </div>

            {/* Categories Scroll */}
            <div className="section-header">
                <h2 className="section-title">Shop by Category</h2>
                <button className="section-more" onClick={() => onNavigate('categories')}>View All →</button>
            </div>
            <div className="category-home-grid">
                {CATEGORIES.map(cat => (
                    <div
                        key={cat.id}
                        className={`category-chip${activeCat === cat.id ? ' active' : ''}`}
                        onClick={() => setActiveCat(activeCat === cat.id ? 'all' : cat.id)}
                    >
                        <img
                            className="category-chip-img"
                            src={getImg('category', cat.id, cat.defaultImg)}
                            alt={cat.name}
                        />
                        <span className="category-chip-name">{cat.name}</span>
                    </div>
                ))}
            </div>

            {/* Flash Sale */}
            <div className="flash-sale-header">
                <span className="flash-title">⚡ Flash Sale</span>
                <div className="flash-timer">
                    <span className="timer-box">{pad(hours)}</span>
                    <span className="timer-sep">:</span>
                    <span className="timer-box">{pad(mins)}</span>
                    <span className="timer-sep">:</span>
                    <span className="timer-box">{pad(secs)}</span>
                </div>
                <button className="section-more" onClick={() => onNavigate('products')} style={{ marginLeft: 'auto' }}>All →</button>
            </div>

            <div className="product-grid">
                {flashProducts.map(p => (
                    <ProductCard key={p.id} product={p} onClick={onProductClick} />
                ))}
            </div>

            {/* Recommended */}
            <div className="section-header">
                <h2 className="section-title">
                    {activeCat === 'all' ? 'Recommended For You' : `${CATEGORIES.find(c => c.id === activeCat)?.name || ''} Products`}
                </h2>
                <button className="section-more" onClick={() => onNavigate('products')}>See All →</button>
            </div>
            <div className="product-grid">
                {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} onClick={onProductClick} />
                ))}
            </div>

            {/* Bottom spacer */}
            <div style={{ height: 20 }} />
        </div>
    );
}
