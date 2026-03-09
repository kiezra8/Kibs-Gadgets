// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, getProductImg, getCategoryImg } from '../data/store';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem('kibs_cart') || '[]'); } catch { return []; }
    });
    const [wishlist, setWishlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('kibs_wishlist') || '[]'); } catch { return []; }
    });
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('kibs_admin') === 'true';
    });
    const [toasts, setToasts] = useState([]);
    // Product/Category images (from localStorage overrides)
    const [productImages, setProductImages] = useState(() => {
        const imgs = {};
        PRODUCTS.forEach(p => {
            const override = localStorage.getItem(`img_product_${p.id}`);
            imgs[p.id] = override || p.defaultImg;
        });
        return imgs;
    });
    const [categoryImages, setCategoryImages] = useState(() => {
        const imgs = {};
        CATEGORIES.forEach(c => {
            const override = localStorage.getItem(`img_category_${c.id}`);
            imgs[c.id] = override || c.defaultImg;
        });
        return imgs;
    });

    // Persist cart & wishlist
    useEffect(() => {
        localStorage.setItem('kibs_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('kibs_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Toast
    const addToast = (msg, icon = '✅') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, msg, icon }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };

    // Cart operations
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                addToast(`Quantity updated`, '🛒');
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            }
            addToast(`Added to cart!`, '🛒');
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const updateQty = (id, delta) => {
        setCart(prev =>
            prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
        );
    };

    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Wishlist
    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const has = prev.find(i => i.id === product.id);
            if (has) {
                addToast('Removed from wishlist', '💔');
                return prev.filter(i => i.id !== product.id);
            }
            addToast('Added to wishlist!', '❤️');
            return [...prev, product];
        });
    };

    const isWishlisted = (id) => wishlist.some(i => i.id === id);

    const [nhostProducts, setNhostProducts] = useState([]);
    const [nhostUser, setNhostUser] = useState(null);

    // Initial Nhost Load
    useEffect(() => {
        import('../nhost').then(async ({ nhost }) => {
            // Setup Auth listener
            nhost.auth.onAuthStateChanged((event, session) => {
                const user = session?.user;
                setNhostUser(user);
                if (user?.email === 'israelezrakisakye@gmail.com') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            });

            // Fetch Products
            fetchNhostProducts();
        });
    }, []);

    const fetchNhostProducts = async () => {
        try {
            const { nhost } = await import('../nhost');
            const QUERY = `
              query GetProducts {
                products {
                  id
                  name
                  category
                  condition
                  price
                  oldPrice
                  discount
                  description
                  defaultImg
                }
              }
            `;
            const { data, error } = await nhost.graphql.request(QUERY);
            if (error) throw error;

            if (data?.products) {
                const mapped = data.products.map(d => ({
                    id: d.id,
                    name: d.name,
                    category: d.category,
                    condition: d.condition || 'new',
                    price: d.price,
                    oldPrice: d.oldPrice || null,
                    discount: d.discount || 0,
                    description: d.description || '',
                    defaultImg: d.defaultImg,
                    rating: 4.5,
                    reviews: 0,
                }));
                setNhostProducts(mapped);
            }
        } catch (e) {
            console.error('Nhost products fetch error:', e);
        }
    };

    // Combine static products with Nhost products
    const products = React.useMemo(() => {
        const nIds = new Set(nhostProducts.map(p => p.id));
        const filteredStatic = PRODUCTS.filter(p => !nIds.has(p.id));
        return [...nhostProducts, ...filteredStatic];
    }, [nhostProducts]);

    const categories = CATEGORIES; // Static categories for now

    // Admin
    const loginAdmin = async (email, password) => {
        try {
            const { nhost } = await import('../nhost');
            const { session, error } = await nhost.auth.signIn({ email, password });

            if (error) {
                addToast(error.message, '❌');
                return false;
            }

            if (session?.user?.email === 'israelezrakisakye@gmail.com') {
                addToast('Admin access granted!', '🔐');
            } else {
                addToast('Logged in, but not admin', '⚠️');
            }
            return true;
        } catch (e) {
            addToast(e.message, '❌');
            return false;
        }
    };

    const logoutAdmin = async () => {
        try {
            const { nhost } = await import('../nhost');
            await nhost.auth.signOut();
        } catch (e) { }
        addToast('Logged out of admin.', '👋');
    };

    // Image updates (admin) local override - can be removed if fully using Appwrite
    const updateProductImage = (productId, dataUrl) => {
        localStorage.setItem(`img_product_${productId}`, dataUrl);
        setProductImages(prev => ({ ...prev, [productId]: dataUrl }));
        addToast('Product image updated locally!', '🖼️');
    };

    const updateCategoryImage = (categoryId, dataUrl) => {
        localStorage.setItem(`img_category_${categoryId}`, dataUrl);
        setCategoryImages(prev => ({ ...prev, [categoryId]: dataUrl }));
        addToast('Category image updated locally!', '🖼️');
    };

    const getImg = (type, id, defaultImg) => {
        if (type === 'product') return productImages[id] || defaultImg;
        return categoryImages[id] || defaultImg;
    };

    const refreshProducts = async () => {
        await fetchNhostProducts();
    };

    return (
        <AppContext.Provider value={{
            products, categories, refreshProducts,
            cart, addToCart, removeFromCart, updateQty, cartCount, cartTotal,
            wishlist, toggleWishlist, isWishlisted,
            isAdmin, loginAdmin, logoutAdmin, nhostUser,
            toasts, addToast,
            updateProductImage, updateCategoryImage, getImg,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
