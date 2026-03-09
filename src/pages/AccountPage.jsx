// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CREDENTIALS, formatPrice } from '../data/store';

export default function AccountPage({ onAdminClick }) {
    const { isAdmin, loginAdmin, logoutAdmin, cart, wishlist, cartTotal } = useApp();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await loginAdmin(username, password);
        if (success) {
            setShowLoginModal(false);
            setUsername('');
            setPassword('');
            setError('');
        } else {
            setError('Invalid Nhost credentials. Please try again.');
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
                <div className="account-avatar">👤</div>
                <h2 className="account-name">Welcome to KIBS!</h2>
                <p className="account-email">Uganda's #1 Gadget Store</p>

                {isAdmin ? (
                    <button
                        className="admin-badge"
                        onClick={onAdminClick}
                        style={{ display: 'block', margin: '12px auto 0' }}
                    >
                        🔐 Admin Dashboard
                    </button>
                ) : (
                    <button
                        className="admin-badge"
                        onClick={() => setShowLoginModal(true)}
                    >
                        🔑 Admin Login
                    </button>
                )}

                {isAdmin && (
                    <button
                        onClick={logoutAdmin}
                        style={{
                            marginTop: 8, background: 'none', border: '1.5px solid rgba(255,255,255,0.4)',
                            borderRadius: 20, padding: '4px 14px', color: 'rgba(255,255,255,0.7)',
                            fontSize: 11, cursor: 'pointer', fontFamily: 'inherit',
                        }}
                    >
                        Logout Admin
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
                <p style={{ marginTop: 1 }}>Version 1.0.0 · © 2025 KIBS</p>
            </div>

            {/* Admin Login Modal */}
            {showLoginModal && (
                <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
                    <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                        <div className="modal-handle" />
                        <h2 className="modal-title">🔐 Admin Login</h2>
                        <p style={{ fontSize: 13, color: '#757575', marginBottom: 16 }}>
                            Enter your admin credentials to manage the store.
                        </p>
                        <form className="admin-login-form" onSubmit={handleLogin}>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter admin email"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    id="admin-username"
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
                                    id="admin-password"
                                    required
                                />
                            </div>
                            {error && (
                                <p style={{ color: '#e63946', fontSize: 12, fontWeight: 600 }}>❌ {error}</p>
                            )}
                            <button type="submit" className="btn-primary" id="admin-login-btn">
                                Login to Admin
                            </button>
                            <button
                                type="button"
                                className="btn-outline"
                                onClick={() => setShowLoginModal(false)}
                            >
                                Cancel
                            </button>
                        </form>
                        <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 12 }}>
                            Use your Nhost account email: israelezrakisakye@gmail.com
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
