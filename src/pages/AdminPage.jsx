// src/pages/AdminPage.jsx
import React, { useState, useRef } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/store';
import { useApp } from '../context/AppContext';

export default function AdminPage({ onBack }) {
    const { updateProductImage, updateCategoryImage, getImg } = useApp();
    const [tab, setTab] = useState('categories'); // 'categories' | 'products'
    const [successMap, setSuccessMap] = useState({});

    const handleImageChange = (type, id, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            if (type === 'category') updateCategoryImage(id, dataUrl);
            else updateProductImage(id, dataUrl);

            // Show success
            setSuccessMap(prev => ({ ...prev, [`${type}_${id}`]: true }));
            setTimeout(() => setSuccessMap(prev => ({ ...prev, [`${type}_${id}`]: false })), 2500);
        };
        reader.readAsDataURL(file);
        e.target.value = ''; // reset so same file can be reselected
    };

    return (
        <div className="admin-page">
            {/* Header */}
            <div className="admin-header">
                <button
                    onClick={onBack}
                    style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: 'white', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    ←
                </button>
                <div className="admin-header-icon">
                    <span style={{ fontSize: 24 }}>🔐</span>
                </div>
                <div>
                    <div className="admin-header-title">Admin Dashboard</div>
                    <div className="admin-header-sub">Manage product & category images</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab${tab === 'categories' ? ' active' : ''}`}
                    onClick={() => setTab('categories')}
                    id="admin-tab-categories"
                >
                    🏷️ Categories
                </button>
                <button
                    className={`admin-tab${tab === 'products' ? ' active' : ''}`}
                    onClick={() => setTab('products')}
                    id="admin-tab-products"
                >
                    📦 Products
                </button>
            </div>

            {/* Info Banner */}
            <div style={{
                background: 'rgba(230,57,70,0.08)',
                borderRadius: 10,
                padding: '10px 14px',
                marginBottom: 12,
                borderLeft: '3px solid #e63946',
                fontSize: 12,
                color: '#666',
                lineHeight: 1.5,
            }}>
                <strong style={{ color: '#e63946' }}>📸 How to update images:</strong> Tap <em>"Change Image"</em> next to any item and select a photo from your device. The image updates immediately and is saved locally.
            </div>

            {/* CATEGORIES TAB */}
            {tab === 'categories' && CATEGORIES.map(cat => (
                <div className="admin-card" key={cat.id} id={`admin-cat-${cat.id}`}>
                    <img
                        className="admin-card-img"
                        src={getImg('category', cat.id, cat.defaultImg)}
                        alt={cat.name}
                    />
                    <div className="admin-card-info">
                        <div className="admin-card-name">{cat.icon} {cat.name}</div>
                        <div className="admin-card-sub">{cat.count} products</div>
                        <label className="admin-change-img-btn">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleImageChange('category', cat.id, e)}
                                id={`cat-img-${cat.id}`}
                            />
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Change Image
                        </label>
                        {successMap[`category_${cat.id}`] && (
                            <p className="img-change-success">✅ Image updated!</p>
                        )}
                    </div>
                </div>
            ))}

            {/* PRODUCTS TAB */}
            {tab === 'products' && PRODUCTS.map(prod => (
                <div className="admin-card" key={prod.id} id={`admin-prod-${prod.id}`}>
                    <img
                        className="admin-card-img"
                        src={getImg('product', prod.id, prod.defaultImg)}
                        alt={prod.name}
                    />
                    <div className="admin-card-info">
                        <div className="admin-card-name" style={{ fontSize: 12 }}>{prod.name}</div>
                        <div className="admin-card-sub">
                            <span className={`product-badge ${prod.condition === 'new' ? 'badge-new' : 'badge-used'}`} style={{ position: 'static', fontSize: 9 }}>
                                {prod.condition}
                            </span>
                            {' · '}{prod.category}
                        </div>
                        <label className="admin-change-img-btn">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleImageChange('product', prod.id, e)}
                                id={`prod-img-${prod.id}`}
                            />
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Change Image
                        </label>
                        {successMap[`product_${prod.id}`] && (
                            <p className="img-change-success">✅ Image updated!</p>
                        )}
                    </div>
                </div>
            ))}

            <div style={{ height: 20 }} />
        </div>
    );
}
