// src/App.jsx
import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';

import TopHeader from './components/TopHeader';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import ProductModal from './components/ProductModal';
import CartPage from './pages/CartPage';

import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AllProductsPage from './pages/AllProductsPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';

function AppInner() {
    const [page, setPage] = useState('home'); // home | categories | products | account | admin
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(null);

    // Top header shows on all except admin
    const showHeader = page !== 'admin';
    const showNav = page !== 'admin';

    const handleNavigate = (target) => {
        setPage(target);
        setCategoryFilter(null);
    };

    const handleCategorySelect = (catId) => {
        setCategoryFilter(catId);
        setPage('products');
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="app-wrapper">
            <Toast />

            {/* Top Header */}
            {showHeader && (
                <TopHeader
                    onSearchClick={() => setPage('products')}
                    onCartClick={() => setShowCart(true)}
                />
            )}

            {/* Page Content */}
            <main className="page-content" style={!showHeader ? { paddingTop: 0 } : {}}>
                {page === 'home' && (
                    <HomePage
                        onProductClick={handleProductClick}
                        onCategoryClick={handleCategorySelect}
                        onNavigate={handleNavigate}
                    />
                )}
                {page === 'categories' && (
                    <CategoriesPage onCategorySelect={handleCategorySelect} />
                )}
                {page === 'products' && (
                    <AllProductsPage
                        onProductClick={handleProductClick}
                        initialCategory={categoryFilter}
                    />
                )}
                {page === 'account' && (
                    <AccountPage onAdminClick={() => setPage('admin')} />
                )}
                {page === 'admin' && (
                    <AdminPage onBack={() => setPage('account')} />
                )}
            </main>

            {/* Bottom Navigation */}
            {showNav && (
                <BottomNav
                    activePage={page}
                    onNavigate={handleNavigate}
                />
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            {/* Cart Modal */}
            {showCart && (
                <CartPage onClose={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <AppInner />
        </AppProvider>
    );
}
