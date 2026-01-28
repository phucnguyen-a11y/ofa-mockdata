const fs = require('fs');
const path = require('path');

// Read raw products
const rawProducts = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../raw/products.json'), 'utf8')
);

// Badge options based on store type and product features
const badgeOptions = ['OKXE Mall', 'Freeship', 'Bán chạy', 'Mới về', 'Giảm sốc'];

// Helper to generate random number in range
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper to generate random float
function randomFloat(min, max, decimals = 1) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

// Helper to pick random items from array
function randomPick(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Helper to slugify text
function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

// Helper to generate sold count string
function generateSoldCount() {
    const ranges = [
        { min: 10, max: 50, label: '10+' },
        { min: 50, max: 100, label: '50+' },
        { min: 100, max: 500, label: '100+' },
        { min: 500, max: 1000, label: '500+' },
        { min: 1000, max: 5000, label: '1000+' }
    ];

    const selected = ranges[randomInRange(0, ranges.length - 1)];
    return {
        count: randomInRange(selected.min, selected.max),
        display: selected.label
    };
}

// Enhance products with UI fields
const formattedProducts = rawProducts.map(product => {
    const soldData = generateSoldCount();
    const rating = randomFloat(4.0, 5.0, 1);
    const discount = randomInRange(5, 40);
    const originalPrice = Math.round(product.price / (1 - discount / 100));

    // Select 1-3 badges
    const badges = randomPick(badgeOptions, randomInRange(1, 3));

    // Add OKXE Mall badge if storeId === 1
    if (product.storeId === 1 && !badges.includes('OKXE Mall')) {
        badges.unshift('OKXE Mall');
    }

    return {
        ...product,
        slug: slugify(product.name),
        thumbnail: product.images[0],
        originalPrice: originalPrice,
        discount: discount,
        rating: rating,
        soldCount: soldData.count,
        soldDisplay: soldData.display,
        stock: randomInRange(5, 50),
        badges: badges,
        categoryId: randomInRange(1, 6),
        specifications: {
            brand: product.brand,
            warranty: '12 tháng',
            origin: 'Vietnam',
            condition: 'Mới 100%'
        }
    };
});

// Write formatted products
const outputPath = path.join(__dirname, '../formatted/products.json');
fs.writeFileSync(outputPath, JSON.stringify(formattedProducts, null, 2));

console.log(`✅ Created formatted/products.json with ${formattedProducts.length} products`);
console.log(`📊 Sample product fields:`, Object.keys(formattedProducts[0]));
