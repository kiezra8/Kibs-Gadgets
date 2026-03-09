// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/store';

export default function AccountPage({ onAdminClick }) {
    const { isAdmin, nhostUser, login, signup, logout, cart, wishlist, cartTotal } = useApp();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let success = false;
            if (isLoginView) {
                success = await login(email, password);
            } else {
                success = await signup(email, password, name);
            }

            if (success) {
                setShowAuthModal(false);
                setEmail('');
                setPassword('');
                setName('');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const menuSections = [
        {
            title: 'My Orders',
            items: [
                { icon: '📦', color: '#4CAF50', label: 'My Orders', sub: 'Track and manage orders' },
                { icon: '❤️', color: '#e63946', label: 'My Wishlist', sub: `${wishlist.length} saved items` },
                { icon: '🛒', color: '#ff8c00', label: 'My Cart', sub: `${cart.length} items · ${formatPrice(cartTotal)}` },
            ]
        },
        {
            title: 'Account',
            items: [
                { icon: '👤', color: '#2196F3', label: 'Profile Settings', sub: 'Edit your info' },
                { icon: '📍', color: '#9C27B0', label: 'Delivery Addresses', sub: 'Manage saved locations' },
                { icon: '💳', color: '#009688', label: 'Payment Methods', sub: 'Cards & mobile money' },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: '📞', color: '#FF5722', label: 'Contact Support', sub: 'Get help from our team' },
                { icon: '⭐', color: '#FFC107', label: 'Rate & Review', sub: 'Share your experience' },
                { icon: '❓', color: '#607D8B', label: 'FAQ', sub: 'Frequently asked questions' },
            ]
        }
    ];

    return (
        <div className="account-page">
            {/* Hero */}
            <div className="account-hero">
                <div className="account-avatar">{nhostUser ? (nhostUser.displayName?.[0] || '👤') : '👤'}</div>
                <h2 className="account-name">
                    {nhostUser ? `Hello, ${nhostUser.displayName || 'User'}!` : 'Welcome to KIBS!'}
                </h2>
                <p className="account-email">
                    {nhostUser ? nhostUser.email : "Uganda's #1 Gadget Store"}
                </p>

                {nhostUser ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                        {isAdmin && (
                            <button className="admin-badge" onClick={onAdminClick}>
                                🔐 Admin Dashboard
                            </button>
                        )}
                        <button
                            onClick={logout}
                            style={{
                                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: 20, padding: '6px 16px', color: 'white',
                                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                                width: 'fit-content', margin: '0 auto'
                            }}
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <button
                        className="admin-badge"
                        style={{ marginTop: 16 }}
                        onClick={() => {
                            setIsLoginView(true);
                            setShowAuthModal(true);
                        }}
                    >
                        🔑 Login / Sign Up
                    </button>
                )}
            </div>

            {/* Stats */}
            <div className="account-stats">
                <div className="account-stat">
                    <div className="account-stat-num">{cart.length}</div>
                    <div className="account-stat-label">In Cart</div>
                </div>
                <div className="account-stat">
                    <div className="account-stat-num">{wishlist.length}</div>
                    <div className="account-stat-label">Wishlist</div>
                </div>
                <div className="account-stat">
                    <div className="account-stat-num">0</div>
                    <div className="account-stat-label">Orders</div>
                </div>
                <div className="account-stat">
                    <div className="account-stat-num">⭐4.9</div>
                    <div className="account-stat-label">Rating</div>
                </div>
            </div>

            {/* Menu Sections */}
            {menuSections.map(section => (
                <div className="account-section" key={section.title}>
                    <div className="account-section-title">{section.title}</div>
                    {section.items.map(item => (
                        <div className="account-menu-item" key={item.label}>
                            <div className="account-menu-icon" style={{ background: `${item.color}18` }}>
                                <span style={{ fontSize: 18 }}>{item.icon}</span>
                            </div>
                            <div className="account-menu-text">
                                <div className="account-menu-label">{item.label}</div>
                                <div className="account-menu-sub">{item.sub}</div>
                            </div>
                            <div className="account-menu-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {/* App info */}
            <div style={{ textAlign: 'center', padding: '20px 20px 10px', color: '#aaa', fontSize: 11 }}>
                <p style={{ fontWeight: 700, color: '#666', fontSize: 14 }}>KIBS Gadgets</p>
                <p style={{ marginTop: 2 }}>Uganda's Premier Gadget Marketplace</p>
                <p style={{ marginTop: 1 }}>Version 1.0.1 · © 2026 KIBS</p>
            </div>

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
                    <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                        <div className="modal-handle" />
                        <h2 className="modal-title">{isLoginView ? '👋 Welcome Back' : '✨ Join KIBS'}</h2>
                        <p style={{ fontSize: 13, color: '#757575', marginBottom: 16 }}>
                            {isLoginView
                                ? 'Login to access your orders and wishlist.'
                                : 'Create an account to start shopping at KIBS.'}
                        </p>

                        <form className="admin-login-form" onSubmit={handleAuth}>
                            {!isLoginView && (
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <p style={{ color: '#e63946', fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
                                    ❌ {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : (isLoginView ? 'Login' : 'Create Account')}
                            </button>

                            <button
                                type="button"
                                className="btn-outline"
                                style={{ marginTop: 8 }}
                                onClick={() => setIsLoginView(!isLoginView)}
                            >
                                {isLoginView ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

