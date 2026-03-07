// src/data/store.js
// Central data store for KIBS Gadgets
// Images can be overridden by admin via localStorage

export const CONTACT = {
    phone: '+256756439671',
    whatsapp: 'https://wa.me/256756439671',
    call: 'tel:+256756439671',
};

export const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'kibsadmin2024',
};

export const CATEGORIES = [
    { id: 'phones', name: 'Phones', icon: '📱', defaultImg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80', count: 24 },
    { id: 'laptops', name: 'Laptops', icon: '💻', defaultImg: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', count: 18 },
    { id: 'speakers', name: 'Speakers', icon: '🔊', defaultImg: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', count: 12 },
    { id: 'tablets', name: 'Tablets', icon: '📲', defaultImg: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', count: 9 },
    { id: 'cameras', name: 'Cameras', icon: '📷', defaultImg: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&q=80', count: 7 },
    { id: 'headphones', name: 'Headphones', icon: '🎧', defaultImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', count: 15 },
    { id: 'smartwatch', name: 'Watches', icon: '⌚', defaultImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', count: 11 },
    { id: 'gaming', name: 'Gaming', icon: '🎮', defaultImg: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80', count: 8 },
];

export const PRODUCTS = [
    // Phones
    {
        id: 'p1', name: 'Samsung Galaxy S24 Ultra', category: 'phones', condition: 'new',
        price: 4500000, oldPrice: 5200000, discount: 13,
        defaultImg: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
        description: 'Samsung Galaxy S24 Ultra – the flagship beast. 200MP camera, built-in S Pen, 5000mAh battery.',
        specs: { Storage: '256GB', RAM: '12GB', Display: '6.8" Dynamic AMOLED', Battery: '5000mAh' },
        rating: 4.8, reviews: 142,
    },
    {
        id: 'p2', name: 'iPhone 15 Pro Max', category: 'phones', condition: 'new',
        price: 5800000, oldPrice: 6200000, discount: 6,
        defaultImg: 'https://images.unsplash.com/photo-1695048132782-9e3433b9a6db?w=400&q=80',
        description: 'Apple iPhone 15 Pro Max with titanium design, A17 Pro chip, and a 48MP main camera system.',
        specs: { Storage: '256GB', RAM: '8GB', Display: '6.7" Super Retina XDR', Battery: '4422mAh' },
        rating: 4.9, reviews: 218,
    },
    {
        id: 'p3', name: 'Tecno Spark 20 Pro', category: 'phones', condition: 'new',
        price: 850000, oldPrice: 1000000, discount: 15,
        defaultImg: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80',
        description: 'Tecno Spark 20 Pro with 6.78" display, 256GB storage, and 5000mAh battery at an unbeatable price.',
        specs: { Storage: '256GB', RAM: '8GB', Display: '6.78" IPS LCD', Battery: '5000mAh' },
        rating: 4.2, reviews: 87,
    },
    {
        id: 'p4', name: 'Samsung A54 5G (Used)', category: 'phones', condition: 'used',
        price: 1200000, oldPrice: 1800000, discount: 33,
        defaultImg: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80',
        description: 'Excellent condition Samsung A54 5G. Comes with charger and original box. Minor scuffs on back.',
        specs: { Storage: '128GB', RAM: '8GB', Display: '6.4" Super AMOLED', Battery: '5000mAh' },
        rating: 4.0, reviews: 43,
    },
    {
        id: 'p5', name: 'iPhone 12 (Used)', category: 'phones', condition: 'used',
        price: 1650000, oldPrice: 2200000, discount: 25,
        defaultImg: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
        description: 'Clean iPhone 12 in Midnight Black. Battery health 87%. All systems working perfectly.',
        specs: { Storage: '64GB', RAM: '4GB', Display: '6.1" OLED', Battery: '2815mAh' },
        rating: 4.3, reviews: 61,
    },
    // Laptops
    {
        id: 'l1', name: 'HP EliteBook 840 G10', category: 'laptops', condition: 'new',
        price: 6200000, oldPrice: 7000000, discount: 11,
        defaultImg: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80',
        description: 'Business powerhouse with Intel Core i7-1365U, 16GB DDR5 RAM, and lightning-fast display.',
        specs: { CPU: 'Intel Core i7', RAM: '16GB DDR5', Storage: '512GB SSD', Display: '14" FHD IPS' },
        rating: 4.7, reviews: 56,
    },
    {
        id: 'l2', name: 'MacBook Air M2 (Used)', category: 'laptops', condition: 'used',
        price: 4200000, oldPrice: 5500000, discount: 24,
        defaultImg: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
        description: 'Excellent condition MacBook Air M2. 8GB unified memory, 256GB SSD. Battery cycles: 34.',
        specs: { CPU: 'Apple M2', RAM: '8GB', Storage: '256GB SSD', Display: '13.6" Liquid Retina' },
        rating: 4.8, reviews: 34,
    },
    {
        id: 'l3', name: 'Lenovo IdeaPad 3i', category: 'laptops', condition: 'new',
        price: 2800000, oldPrice: 3200000, discount: 13,
        defaultImg: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80',
        description: 'Perfect student laptop. Intel Core i5-12th gen, fast boot under 10 seconds.',
        specs: { CPU: 'Intel Core i5-12th', RAM: '8GB', Storage: '512GB SSD', Display: '15.6" FHD' },
        rating: 4.4, reviews: 29,
    },
    // Speakers
    {
        id: 's1', name: 'JBL Charge 5', category: 'speakers', condition: 'new',
        price: 650000, oldPrice: 780000, discount: 17,
        defaultImg: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
        description: 'JBL Charge 5 – portable Bluetooth speaker with IP67 waterproof rating and 20hr battery.',
        specs: { Power: '40W', Battery: '20 hours', Connectivity: 'Bluetooth 5.1', Waterproof: 'IP67' },
        rating: 4.7, reviews: 93,
    },
    {
        id: 's2', name: 'Sony SRS-XB43 (Used)', category: 'speakers', condition: 'used',
        price: 380000, oldPrice: 650000, discount: 42,
        defaultImg: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80',
        description: 'Sony SRS-XB43 in great shape. Extra Bass technology, 24-hour battery life.',
        specs: { Power: '30W', Battery: '24 hours', Connectivity: 'Bluetooth 5.0', Waterproof: 'IP67' },
        rating: 4.5, reviews: 47,
    },
    // Headphones
    {
        id: 'h1', name: 'Sony WH-1000XM5', category: 'headphones', condition: 'new',
        price: 1400000, oldPrice: 1700000, discount: 18,
        defaultImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        description: 'Industry-leading noise canceling headphones. 30-hour battery, crystal-clear calls.',
        specs: { Type: 'Over-ear', ANC: 'Yes', Battery: '30 hours', Connectivity: 'Bluetooth 5.2' },
        rating: 4.9, reviews: 173,
    },
    {
        id: 'h2', name: 'AirPods Pro 2nd Gen', category: 'headphones', condition: 'new',
        price: 1100000, oldPrice: 1350000, discount: 19,
        defaultImg: 'https://images.unsplash.com/photo-1588423771073-b8903fead714?w=400&q=80',
        description: 'Apple AirPods Pro with Active Noise Cancellation. Adaptive Transparency mode.',
        specs: { Type: 'In-ear', ANC: 'Yes', Battery: '6hr + 30hr case', Connectivity: 'Bluetooth 5.3' },
        rating: 4.8, reviews: 208,
    },
    // Tablets
    {
        id: 't1', name: 'iPad 10th Gen', category: 'tablets', condition: 'new',
        price: 3200000, oldPrice: 3800000, discount: 16,
        defaultImg: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
        description: 'New iPad 10th generation with A14 Bionic chip and stunning Liquid Retina display.',
        specs: { CPU: 'Apple A14', RAM: '4GB', Storage: '64GB', Display: '10.9" Liquid Retina' },
        rating: 4.7, reviews: 78,
    },
    // Cameras
    {
        id: 'c1', name: 'Canon EOS M50 Mark II', category: 'cameras', condition: 'new',
        price: 4100000, oldPrice: 4600000, discount: 11,
        defaultImg: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&q=80',
        description: 'Perfect vlogging camera with eye-tracking autofocus and 4K video recording.',
        specs: { Sensor: '24.1MP APS-C', Video: '4K UHD', ISO: '100-25600', Battery: 'LP-E12' },
        rating: 4.6, reviews: 52,
    },
    // Smartwatch
    {
        id: 'w1', name: 'Samsung Galaxy Watch 6', category: 'smartwatch', condition: 'new',
        price: 1100000, oldPrice: 1400000, discount: 21,
        defaultImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        description: 'Advanced health monitoring with body composition analysis and sleep coaching.',
        specs: { Display: '1.5" AMOLED', Battery: '40hr', Sensors: 'Heart Rate, SpO2, ECG', OS: 'Wear OS' },
        rating: 4.5, reviews: 88,
    },
    // Gaming
    {
        id: 'g1', name: 'Sony DualSense Controller', category: 'gaming', condition: 'new',
        price: 480000, oldPrice: 580000, discount: 17,
        defaultImg: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80',
        description: 'PS5 DualSense wireless controller with haptic feedback and adaptive triggers.',
        specs: { Compatibility: 'PS5 & PC', Battery: '12 hours', Connectivity: 'Bluetooth 5.1', Color: 'White' },
        rating: 4.9, reviews: 195,
    },
];

// Helper: get image from localStorage override or default
export function getProductImg(product) {
    const override = localStorage.getItem(`img_product_${product.id}`);
    return override || product.defaultImg;
}

export function getCategoryImg(category) {
    const override = localStorage.getItem(`img_category_${category.id}`);
    return override || category.defaultImg;
}

export function formatPrice(amount) {
    return `UGX ${amount.toLocaleString()}`;
}
