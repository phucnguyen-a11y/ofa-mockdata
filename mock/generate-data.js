const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Seed for consistent data
faker.seed(123);

console.log('🎨 Generating mock data for e-commerce...\n');

// ============================================
// LOAD FORMATTED DATA
// ============================================

const formattedProducts = require('../formatted/products.json');
const formattedCategories = require('../formatted/categories.json');
const formattedUsers = require('../formatted/users.json');
const formattedStoresData = require('../formatted/stores.json');
const formattedPosts = require('../formatted/posts.json');

// Extract stores and branches
const formattedStores = formattedStoresData.stores || formattedStoresData;
const storeBranches = formattedStoresData.storeBranches || [];

console.log(`✅ Loaded ${formattedProducts.length} products from formatted/products.json`);
console.log(`✅ Loaded ${formattedCategories.length} categories from formatted/categories.json`);
console.log(`✅ Loaded ${formattedUsers.length} users from formatted/users.json`);
console.log(`✅ Loaded ${formattedStores.length} stores from formatted/stores.json`);
console.log(`✅ Loaded ${formattedPosts.length} posts from formatted/posts.json`);

// ============================================
// GENERATE ADDITIONAL DATA
// ============================================

// Generate Reviews
function generateReviews(count = 100) {
    const reviews = [];
    const ratingWords = {
        5: ['Tuyệt vời', 'Xuất sắc', 'Hoàn hảo', 'Rất hài lòng', 'Tốt nhất'],
        4: ['Tốt', 'Hài lòng', 'Đáng mua', 'Chất lượng tốt'],
        3: ['Tạm ổn', 'Bình thường', 'Chấp nhận được'],
        2: ['Không tốt lắm', 'Cần cải thiện', 'Hơi thất vọng'],
        1: ['Tệ', 'Rất tệ', 'Không đáng mua']
    };

    for (let i = 0; i < count; i++) {
        const rating = faker.helpers.arrayElement([1, 2, 3, 4, 5]);
        const product = faker.helpers.arrayElement(formattedProducts);
        const user = faker.helpers.arrayElement(formattedUsers);

        reviews.push({
            id: i + 1,
            productId: product.id,
            userId: user.id,
            rating: rating,
            comment: `${faker.helpers.arrayElement(ratingWords[rating])}! ${faker.lorem.sentence()}`,
            images: rating >= 4 ? Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, (_, idx) =>
                `https://picsum.photos/seed/review${i}-${idx}/400/400`
            ) : [],
            helpful: faker.number.int({ min: 0, max: 50 }),
            verified: faker.datatype.boolean(0.8),
            createdAt: faker.date.past({ years: 1 }),
            updatedAt: faker.date.recent()
        });
    }

    return reviews;
}

// Generate Flash Sales
function generateFlashSales(count = 10) {
    const flashSales = [];

    for (let i = 0; i < count; i++) {
        const products = faker.helpers.arrayElements(formattedProducts, faker.number.int({ min: 3, max: 10 }));
        const startDate = faker.date.soon({ days: 7 });
        const endDate = new Date(startDate.getTime() + faker.number.int({ min: 3, max: 24 }) * 60 * 60 * 1000);

        flashSales.push({
            id: i + 1,
            name: `Flash Sale ${faker.helpers.arrayElement(['Cuối tuần', 'Giữa tuần', 'Siêu sale', 'Đặc biệt'])}`,
            description: `Giảm giá sốc đến ${faker.number.int({ min: 30, max: 70 })}%`,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            products: products.map(p => ({
                productId: p.id,
                discountPercent: faker.number.int({ min: 20, max: 60 }),
                quantity: faker.number.int({ min: 10, max: 100 }),
                sold: faker.number.int({ min: 0, max: 50 })
            })),
            isActive: faker.datatype.boolean(0.6)
        });
    }

    return flashSales;
}

// Generate Banners
function generateBanners(count = 5) {
    const banners = [];

    for (let i = 0; i < count; i++) {
        banners.push({
            id: i + 1,
            title: faker.helpers.arrayElement([
                'Sale cuối năm - Giảm đến 50%',
                'Xe máy điện Vinfast - Ưu đãi khủng',
                'Mua ngay - Trả góp 0%',
                'Freeship toàn quốc',
                'Black Friday - Deal HOT'
            ]),
            image: `https://picsum.photos/seed/banner${i}/1200/400`,
            link: `/products?sale=true`,
            position: faker.helpers.arrayElement(['hero', 'sidebar', 'middle', 'footer']),
            order: i + 1,
            isActive: faker.datatype.boolean(0.8),
            createdAt: faker.date.past({ years: 1 }),
            updatedAt: faker.date.recent()
        });
    }

    return banners;
}

// ============================================
// GENERATE ALL DATA
// ============================================

const reviews = generateReviews(200);
const flashSales = generateFlashSales(15);
const banners = generateBanners(6);

console.log(`✅ Generated ${reviews.length} reviews`);
console.log(`✅ Generated ${flashSales.length} flash sales`);
console.log(`✅ Generated ${banners.length} banners\n`);

// ============================================
// CREATE DATABASE OBJECT
// ============================================

const db = {
    categories: formattedCategories,
    products: formattedProducts,
    users: formattedUsers,
    stores: formattedStores,
    storeBranches: storeBranches,
    posts: formattedPosts,
    reviews: reviews,
    flashSales: flashSales,
    banners: banners,
    feedbacks: [] // Empty array for feedback form
};

// ============================================
// WRITE TO FILE
// ============================================

const outputPath = path.join(__dirname, 'db.json');
fs.writeFileSync(outputPath, JSON.stringify(db, null, 2));

console.log('🎉 Mock data generated successfully!');
console.log(`📁 File saved to: ${outputPath}\n`);

console.log('📊 Summary:');
console.log(`   - Categories: ${db.categories.length}`);
console.log(`   - Products: ${db.products.length}`);
console.log(`   - Users: ${db.users.length}`);
console.log(`   - Stores: ${db.stores.length}`);
console.log(`   - Store Branches: ${db.storeBranches.length}`);
console.log(`   - Posts: ${db.posts.length}`);
console.log(`   - Reviews: ${db.reviews.length}`);
console.log(`   - Flash Sales: ${db.flashSales.length}`);
console.log(`   - Banners: ${db.banners.length}\n`);

console.log('🚀 Run "npm run mock:server" to start the API server');
