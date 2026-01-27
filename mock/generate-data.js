const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Seed for consistent data
faker.seed(123);

// Generate Categories
function generateCategories(count = 10) {
    const categories = [];
    const categoryNames = [
        'Thời Trang Nam',
        'Thời Trang Nữ',
        'Điện Thoại & Phụ Kiện',
        'Máy Tính & Laptop',
        'Đồng Hồ',
        'Giày Dép Nam',
        'Giày Dép Nữ',
        'Túi Ví Nữ',
        'Thiết Bị Điện Tử',
        'Sức Khỏe & Làm Đẹp',
        'Nhà Cửa & Đời Sống',
        'Thể Thao & Du Lịch'
    ];

    for (let i = 0; i < count; i++) {
        categories.push({
            id: i + 1,
            name: categoryNames[i] || faker.commerce.department(),
            image: `https://picsum.photos/seed/category${i}/400/300`,
            description: faker.commerce.productDescription(),
            productCount: faker.number.int({ min: 50, max: 5000 })
        });
    }
    return categories;
}

// Generate Products
function generateProducts(count = 100, categories) {
    const products = [];

    for (let i = 0; i < count; i++) {
        const price = faker.number.int({ min: 50000, max: 50000000 });
        const discount = faker.number.int({ min: 0, max: 50 });
        const originalPrice = Math.round(price / (1 - discount / 100));
        const rating = faker.number.float({ min: 3, max: 5, fractionDigits: 1 });
        const soldCount = faker.number.int({ min: 10, max: 10000 });

        products.push({
            id: i + 1,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: price,
            originalPrice: originalPrice,
            discount: discount,
            categoryId: faker.helpers.arrayElement(categories).id,
            images: [
                `https://picsum.photos/seed/product${i}-1/600/600`,
                `https://picsum.photos/seed/product${i}-2/600/600`,
                `https://picsum.photos/seed/product${i}-3/600/600`,
                `https://picsum.photos/seed/product${i}-4/600/600`
            ],
            thumbnail: `https://picsum.photos/seed/product${i}/400/400`,
            rating: rating,
            reviewCount: faker.number.int({ min: 0, max: 5000 }),
            soldCount: soldCount,
            stock: faker.number.int({ min: 0, max: 1000 }),
            shopName: faker.company.name(),
            shopId: faker.number.int({ min: 1, max: 50 }),
            location: faker.location.city() + ', Vietnam',
            isFreeShip: faker.datatype.boolean(),
            isOfficial: faker.datatype.boolean(0.3),
            tags: faker.helpers.arrayElements(
                ['Bán Chạy', 'Hàng Mới', 'Giảm Giá Sốc', 'Mall', 'Freeship', 'Yêu Thích'],
                faker.number.int({ min: 1, max: 3 })
            ),
            specifications: {
                brand: faker.company.name(),
                origin: faker.helpers.arrayElement(['Vietnam', 'China', 'Korea', 'Japan', 'USA']),
                warranty: faker.helpers.arrayElement(['6 tháng', '12 tháng', '24 tháng', 'Không bảo hành'])
            },
            variants: generateVariants()
        });
    }
    return products;
}

// Generate Product Variants
function generateVariants() {
    const hasVariants = faker.datatype.boolean(0.7);
    if (!hasVariants) return [];

    const variantTypes = faker.helpers.arrayElements(
        ['Màu sắc', 'Kích thước', 'Phiên bản'],
        faker.number.int({ min: 1, max: 2 })
    );

    const variants = [];
    if (variantTypes.includes('Màu sắc')) {
        variants.push({
            name: 'Màu sắc',
            options: faker.helpers.arrayElements(
                ['Đen', 'Trắng', 'Xanh', 'Đỏ', 'Vàng', 'Xám', 'Hồng'],
                faker.number.int({ min: 2, max: 4 })
            )
        });
    }
    if (variantTypes.includes('Kích thước')) {
        variants.push({
            name: 'Kích thước',
            options: faker.helpers.arrayElements(
                ['S', 'M', 'L', 'XL', '2XL', '3XL'],
                faker.number.int({ min: 3, max: 5 })
            )
        });
    }
    if (variantTypes.includes('Phiên bản')) {
        variants.push({
            name: 'Phiên bản',
            options: faker.helpers.arrayElements(
                ['64GB', '128GB', '256GB', '512GB', 'Bản thường', 'Bản cao cấp'],
                faker.number.int({ min: 2, max: 4 })
            )
        });
    }
    return variants;
}

// Generate Users
function generateUsers(count = 50) {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            id: i + 1,
            username: faker.internet.username(),
            email: faker.internet.email(),
            fullName: faker.person.fullName(),
            avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
            phone: faker.phone.number('09########'),
            address: {
                street: faker.location.streetAddress(),
                district: faker.location.county(),
                city: faker.location.city(),
                country: 'Vietnam'
            },
            joinedDate: faker.date.past({ years: 3 }),
            isVerified: faker.datatype.boolean(0.8)
        });
    }
    return users;
}

// Generate Reviews
function generateReviews(count = 200, products, users) {
    const reviews = [];
    for (let i = 0; i < count; i++) {
        reviews.push({
            id: i + 1,
            productId: faker.helpers.arrayElement(products).id,
            userId: faker.helpers.arrayElement(users).id,
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.lorem.paragraph(),
            images: faker.datatype.boolean(0.3)
                ? Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, (_, idx) =>
                    `https://picsum.photos/seed/review${i}-${idx}/400/400`
                )
                : [],
            createdAt: faker.date.past({ years: 1 }),
            likes: faker.number.int({ min: 0, max: 100 }),
            isVerifiedPurchase: faker.datatype.boolean(0.9),
            variantPurchased: faker.helpers.maybe(() => 'Màu Đen - Size M', { probability: 0.6 })
        });
    }
    return reviews;
}

// Generate Flash Sales
function generateFlashSales(products) {
    const flashSaleProducts = faker.helpers.arrayElements(products, 20);
    return flashSaleProducts.map((product, index) => ({
        id: index + 1,
        productId: product.id,
        originalPrice: product.originalPrice,
        flashPrice: Math.round(product.price * 0.7),
        discount: 30 + faker.number.int({ min: 0, max: 40 }),
        stock: faker.number.int({ min: 10, max: 100 }),
        sold: faker.number.int({ min: 50, max: 500 }),
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString() // 3 hours from now
    }));
}

// Generate Banners
function generateBanners() {
    return [
        {
            id: 1,
            image: 'https://picsum.photos/seed/banner1/1200/400',
            title: 'Sale Cuối Tuần',
            link: '/sale',
            type: 'main'
        },
        {
            id: 2,
            image: 'https://picsum.photos/seed/banner2/1200/400',
            title: 'Thời Trang Hot',
            link: '/fashion',
            type: 'main'
        },
        {
            id: 3,
            image: 'https://picsum.photos/seed/banner3/600/300',
            title: 'Điện Tử Giá Rẻ',
            link: '/electronics',
            type: 'sub'
        },
        {
            id: 4,
            image: 'https://picsum.photos/seed/banner4/600/300',
            title: 'Freeship Xtra',
            link: '/freeship',
            type: 'sub'
        }
    ];
}

// Main generation function
function generateDatabase() {
    console.log('🎨 Generating mock data for e-commerce...\n');

    const categories = generateCategories(12);
    console.log('✅ Generated', categories.length, 'categories');

    const products = generateProducts(100, categories);
    console.log('✅ Generated', products.length, 'products');

    const users = generateUsers(50);
    console.log('✅ Generated', users.length, 'users');

    const reviews = generateReviews(200, products, users);
    console.log('✅ Generated', reviews.length, 'reviews');

    const flashSales = generateFlashSales(products);
    console.log('✅ Generated', flashSales.length, 'flash sales');

    const banners = generateBanners();
    console.log('✅ Generated', banners.length, 'banners');

    const database = {
        categories,
        products,
        users,
        reviews,
        flashSales,
        banners
    };

    // Write to file
    const outputPath = path.join(__dirname, 'db.json');
    fs.writeFileSync(outputPath, JSON.stringify(database, null, 2));

    console.log('\n🎉 Mock data generated successfully!');
    console.log('📁 File saved to:', outputPath);
    console.log('\n📊 Summary:');
    console.log('   - Categories:', categories.length);
    console.log('   - Products:', products.length);
    console.log('   - Users:', users.length);
    console.log('   - Reviews:', reviews.length);
    console.log('   - Flash Sales:', flashSales.length);
    console.log('   - Banners:', banners.length);
    console.log('\n🚀 Run "npm run mock:server" to start the API server');
}

// Run the generator
generateDatabase();
