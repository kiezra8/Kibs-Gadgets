// src/pages/AllProductsPage.jsx
import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/store';
import ProductCard from '../components/ProductCard';

const CONDITIONS = ['All', 'New', 'Used'];
const SORTS = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Most Reviewed', value: 'reviews' },
];

export default function AllProductsPage({ onProductClick, initialCategory }) {
    const [condition, setCondition] = useState('All');
    const [category, setCategory] = useState(initialCategory || 'all');
    const [sort, setSort] = useState('recommended');
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        let list = [...PRODUCTS];

        // Search
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
        }

        // Category
        if (category !== 'all') list = list.filter(p => p.category === category);

        // Condition
        if (condition !== 'All') list = list.filter(p => p.condition === condition.toLowerCase());

        // Sort
        switch (sort) {
            case 'price_asc': list.sort((a, b) => a.price - b.price); break;
            case 'price_desc': list.sort((a, b) => b.price - a.price); break;
            case 'rating': list.sort((a, b) => b.rating - a.rating); break;
            case 'reviews': list.sort((a, b) => b.reviews - a.reviews); break;
            default: break;
        }

        return list;
    }, [search, category, condition, sort]);

    return (
        <div className="all-products-page">
            {/* Search */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'white', borderRadius: 12, padding: '8px 14px',
                marginBottom: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                border: '1.5px solid #ebebeb',
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Search products…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13, fontFamily: 'inherit' }}
                    id="products-search"
                />
                {search && (
                    <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#aaa', fontSize: 16 }}>✕</button>
                )}
            </div>

            {/* Category filter */}
            <div className="filter-bar">
                <button className={`filter-chip${category === 'all' ? ' active' : ''}`} onClick={() => setCategory('all')}>All</button>
                {CATEGORIES.map(c => (
                    <button key={c.id} className={`filter-chip${category === c.id ? ' active' : ''}`} onClick={() => setCategory(c.id)}>
                        {c.icon} {c.name}
                    </button>
                ))}
            </div>

            {/* Condition filter */}
            <div className="filter-bar" style={{ paddingTop: 0, paddingBottom: 6 }}>
                {CONDITIONS.map(c => (
                    <button key={c} className={`filter-chip${condition === c ? ' active' : ''}`} onClick={() => setCondition(c)}>
                        {c === 'New' ? '🆕' : c === 'Used' ? '♻️' : '🏪'} {c}
                    </button>
                ))}
            </div>

            {/* Sort */}
            <div className="sort-bar">
                <span className="sort-count">{filtered.length} products</span>
                <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)} id="products-sort">
                    {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
            </div>

            {filtered.length === 0 ? (
                <div className="empty-state">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search term</p>
                    <button
                        style={{ marginTop: 8, background: '#e63946', color: 'white', border: 'none', borderRadius: 20, padding: '10px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                        onClick={() => { setCondition('All'); setCategory('all'); setSearch(''); setSort('recommended'); }}
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="product-grid">
                    {filtered.map(p => (
                        <ProductCard key={p.id} product={p} onClick={onProductClick} />
                    ))}
                </div>
            )}
        </div>
    );
}
