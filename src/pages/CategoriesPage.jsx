// src/pages/CategoriesPage.jsx
import React from 'react';
import { useApp } from '../context/AppContext';

export default function CategoriesPage({ onCategorySelect }) {
    const { getImg, categories } = useApp();

    return (
        <div style={{ padding: '10px 10px 10px' }}>
            <div style={{ marginBottom: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a' }}>All Categories</h2>
                <p style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>
                    Browse new & used gadgets by category
                </p>
            </div>

            <div className="categories-grid">
                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className="category-card"
                        id={`cat-${cat.id}`}
                        onClick={() => onCategorySelect(cat.id)}
                    >
                        <img
                            src={getImg('category', cat.id, cat.defaultImg)}
                            alt={cat.name}
                            loading="lazy"
                        />
                        <div className="category-card-overlay">
                            <p className="category-card-name">
                                {cat.icon} {cat.name}
                            </p>
                            <p className="category-card-count">{cat.count} products</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* New & Used Toggle Info */}
            <div style={{
                background: 'white',
                borderRadius: 12,
                padding: 14,
                marginTop: 12,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 10 }}>🏷️ Product Conditions</h3>
                <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{
                        flex: 1, background: 'rgba(230,57,70,0.08)', borderRadius: 10,
                        padding: '10px 12px', borderLeft: '3px solid #e63946'
                    }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#e63946' }}>🆕 New</p>
                        <p style={{ fontSize: 11, color: '#757575', marginTop: 3, lineHeight: 1.4 }}>
                            Brand new, sealed in original packaging. Full warranty included.
                        </p>
                    </div>
                    <div style={{
                        flex: 1, background: 'rgba(255,140,0,0.08)', borderRadius: 10,
                        padding: '10px 12px', borderLeft: '3px solid #ff8c00'
                    }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#ff8c00' }}>♻️ Used</p>
                        <p style={{ fontSize: 11, color: '#757575', marginTop: 3, lineHeight: 1.4 }}>
                            Verified pre-owned gadgets. Tested & fully functional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
