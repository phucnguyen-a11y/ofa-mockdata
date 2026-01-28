const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Seed for consistent data
faker.seed(456);

// Vietnamese locations
const locations = [
    'Quận 1, TP. HCM',
    'Quận 3, TP. HCM',
    'Quận 5, TP. HCM',
    'Quận 10, TP. HCM',
    'Quận Tân Bình, TP. HCM',
    'Quận Bình Thạnh, TP. HCM',
    'Quận Phú Nhuận, TP. HCM',
    'Quận Gò Vấp, TP. HCM',
    'Ba Đình, Hà Nội',
    'Đống Đa, Hà Nội',
    'Cầu Giấy, Hà Nội',
    'Hai Bà Trưng, Hà Nội',
    'Hoàn Kiếm, Hà Nội',
    'Tây Hồ, Hà Nội'
];

// Post templates for selling
const sellPostTemplates = [
    {
        title: 'Xe máy điện {brand} {model} mới {year}%',
        description: 'Xe mới 100%, chưa lăn bánh. Nguyên tem xe hãng. Hỗ trợ trả góp {payment}%. Xe có sẵn tại cửa hàng. Liên hệ ngay để được tư vấn!',
        condition: 'new'
    },
    {
        title: 'Cần bán {brand} {model} đi được {km}km',
        description: 'Xe đẹp, pin còn khỏe {battery}%. Đi làm đi chơi rất tốt. Không tai nạn, ngập nước. Giấy tờ đầy đủ.',
        condition: 'used'
    },
    {
        title: 'Bán gấp {brand} {model} - Giá tốt',
        description: 'Cần tiền gấp nên bán xe. Xe còn mới {usage}%, đi ít. Pin còn bảo hành {warranty} tháng. Xem xe thoải mái.',
        condition: 'used'
    },
    {
        title: '{brand} {model} chính chủ bán',
        description: 'Xe chính chủ từ đầu. Bảo dưỡng định kỳ tại hãng. Pin LFP bền bỉ. Xe đẹp long lanh, máy chạy êm.',
        condition: 'used'
    }
];

// Post templates for buying
const buyPostTemplates = [
    {
        title: 'Cần mua xe máy điện {brand} cũ giá tốt',
        description: 'Tôi đang tìm mua xe {brand} cũ, giá dưới {price} triệu. Xe còn đi tốt, pin còn khỏe. Liên hệ cho tôi nhé!',
        condition: 'used'
    },
    {
        title: 'Thu mua xe máy điện các loại',
        description: 'Thu mua xe máy điện cũ, hỏng, không dùng. Giá cao, lấy nhanh. Thu tận nơi, trả tiền ngay.',
        condition: 'used'
    }
];

// Accessories templates
const accessoryTemplates = [
    {
        title: '{item} chính hãng mới 100%',
        description: '{item} chính hãng, mới tinh. Bảo hành {warranty} tháng. Giá tốt hơn shop {discount}%.',
        price: [200000, 2000000]
    }
];

const accessories = [
    'Mũ bảo hiểm Fullface',
    'Áo mưa cao cấp',
    'Khóa chống trộm',
    'Balo đựng đồ',
    'Kính chắn gió',
    'Găng tay đi xe',
    'Đèn LED',
    'Gương chiếu hậu'
];

// Helper functions
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomPick(arr) {
    return arr[randomInRange(0, arr.length - 1)];
}

function generatePosts(count = 20) {
    const posts = [];
    const brands = ['Vinfast', 'YADEA', 'Pega', 'Dat Bike'];
    const models = {
        'Vinfast': ['Klara S2', 'Feliz S', 'Theon S', 'Vento S', 'Evo 200'],
        'YADEA': ['E8S', 'G5', 'S3', 'Xmen Neo'],
        'Pega': ['Newtech', 'Dinas', 'Eco'],
        'Dat Bike': ['Weaver', 'Quantum']
    };

    for (let i = 0; i < count; i++) {
        const postType = i % 5 === 0 ? 'buy' : 'sell'; // 20% buy, 80% sell
        const isAccessory = i % 8 === 0; // 12.5% accessories

        let post;

        if (isAccessory) {
            const template = randomPick(accessoryTemplates);
            const item = randomPick(accessories);
            const priceRange = template.price;

            post = {
                id: i + 1,
                userId: randomInRange(1, 10),
                type: 'sell',
                title: template.title.replace('{item}', item),
                description: template.description
                    .replace('{item}', item)
                    .replace('{warranty}', randomInRange(3, 12))
                    .replace('{discount}', randomInRange(10, 40)),
                price: randomInRange(priceRange[0], priceRange[1]),
                productName: item,
                images: [
                    `https://picsum.photos/seed/accessory${i}/600/600`
                ],
                categoryId: 2, // Accessories
                location: randomPick(locations),
                condition: 'new',
                negotiable: faker.datatype.boolean(),
                likeCount: randomInRange(5, 100),
                commentCount: randomInRange(0, 30),
                shareCount: randomInRange(0, 15),
                viewCount: randomInRange(50, 500),
                status: 'active',
                createdAt: faker.date.recent({ days: 30 }).toISOString(),
                updatedAt: faker.date.recent({ days: 30 }).toISOString()
            };
        } else if (postType === 'buy') {
            const template = randomPick(buyPostTemplates);
            const brand = randomPick(brands);

            post = {
                id: i + 1,
                userId: randomInRange(1, 10),
                type: 'buy',
                title: template.title.replace('{brand}', brand),
                description: template.description
                    .replace('{brand}', brand)
                    .replace('{price}', randomInRange(10, 50)),
                price: randomInRange(10000000, 50000000),
                productName: `Xe máy điện ${brand}`,
                images: [],
                categoryId: 1, // Motorcycles
                location: randomPick(locations),
                condition: template.condition,
                negotiable: true,
                likeCount: randomInRange(5, 50),
                commentCount: randomInRange(0, 20),
                shareCount: randomInRange(0, 10),
                viewCount: randomInRange(30, 200),
                status: 'active',
                createdAt: faker.date.recent({ days: 30 }).toISOString(),
                updatedAt: faker.date.recent({ days: 30 }).toISOString()
            };
        } else {
            const template = randomPick(sellPostTemplates);
            const brand = randomPick(brands);
            const model = randomPick(models[brand]);
            const price = randomInRange(15000000, 60000000);

            post = {
                id: i + 1,
                userId: randomInRange(1, 10),
                type: 'sell',
                title: template.title
                    .replace('{brand}', brand)
                    .replace('{model}', model)
                    .replace('{year}', new Date().getFullYear()),
                description: template.description
                    .replace('{payment}', randomInRange(50, 80))
                    .replace('{km}', randomInRange(500, 5000))
                    .replace('{battery}', randomInRange(70, 95))
                    .replace('{usage}', randomInRange(85, 99))
                    .replace('{warranty}', randomInRange(6, 24)),
                price: price,
                productName: `${brand} ${model}`,
                images: Array.from({ length: randomInRange(1, 4) }, (_, idx) =>
                    `https://picsum.photos/seed/post${i}-${idx}/600/600`
                ),
                categoryId: 1, // Motorcycles
                location: randomPick(locations),
                condition: template.condition,
                negotiable: faker.datatype.boolean(),
                likeCount: randomInRange(10, 150),
                commentCount: randomInRange(2, 40),
                shareCount: randomInRange(1, 20),
                viewCount: randomInRange(100, 800),
                status: 'active',
                createdAt: faker.date.recent({ days: 30 }).toISOString(),
                updatedAt: faker.date.recent({ days: 30 }).toISOString()
            };
        }

        posts.push(post);
    }

    return posts;
}

// Generate posts
const posts = generatePosts(30);

// Write to file
const outputPath = path.join(__dirname, '../raw/posts.json');
fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

console.log(`✅ Created ${posts.length} marketplace posts`);
console.log(`   - Sell posts: ${posts.filter(p => p.type === 'sell').length}`);
console.log(`   - Buy posts: ${posts.filter(p => p.type === 'buy').length}`);
console.log(`   - Motorcycles: ${posts.filter(p => p.categoryId === 1).length}`);
console.log(`   - Accessories: ${posts.filter(p => p.categoryId === 2).length}`);

// Copy to formatted
const formattedPath = path.join(__dirname, '../formatted/posts.json');
fs.writeFileSync(formattedPath, JSON.stringify(posts, null, 2));
console.log(`✅ Copied to formatted/posts.json`);
