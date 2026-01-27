# E-commerce Mock Data Server 🛍️

Mock data server cho frontend e-commerce development, tạo realistic data giống Shopee/Lazada.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate mock data + start server
npm run mock:dev
```

Server sẽ chạy tại: **http://localhost:3001**

## 📦 What's Included

- **100 Products** - Sản phẩm với đầy đủ thông tin (giá, ảnh, rating, variants)
- **12 Categories** - Danh mục tiếng Việt
- **50 Users** - Người dùng/khách hàng
- **200 Reviews** - Đánh giá có ảnh và verified purchase
- **20 Flash Sales** - Sản phẩm giảm giá giờ vàng
- **4 Banners** - Banner quảng cáo

## 📝 Available Scripts

```bash
# Generate new mock data
npm run mock:generate

# Start JSON Server (port 3001)
npm run mock:server

# Generate + Start server
npm run mock:dev
```

## 🔌 API Endpoints

All REST endpoints with full CRUD support:

```
GET    /categories
GET    /products
GET    /users
GET    /reviews
GET    /flashSales
GET    /banners
```

### Query Examples

```bash
# Pagination
GET /products?_page=1&_limit=20

# Sorting
GET /products?_sort=price&_order=desc

# Filtering
GET /products?categoryId=1&isFreeShip=true

# Search
GET /products?q=điện thoại

# Relationships
GET /products/1?_embed=reviews
```

## 💻 Frontend Integration

### Fetch API
```javascript
fetch('http://localhost:3001/products?_limit=20')
  .then(res => res.json())
  .then(products => console.log(products));
```

### Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

const { data } = await api.get('/products', {
  params: { categoryId: 1, _limit: 20 }
});
```

### React Query
```javascript
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: () => 
    fetch('http://localhost:3001/products').then(r => r.json())
});
```

## 📊 Product Data Structure

```json
{
  "id": 1,
  "name": "Tên sản phẩm",
  "price": 299000,
  "originalPrice": 499000,
  "discount": 40,
  "categoryId": 1,
  "images": ["url1", "url2", "url3", "url4"],
  "thumbnail": "url",
  "rating": 4.5,
  "reviewCount": 1234,
  "soldCount": 5678,
  "stock": 100,
  "shopName": "Tên shop",
  "location": "TP.HCM, Vietnam",
  "isFreeShip": true,
  "isOfficial": false,
  "tags": ["Bán Chạy", "Mall", "Freeship"],
  "specifications": {
    "brand": "Brand name",
    "origin": "Vietnam",
    "warranty": "12 tháng"
  },
  "variants": [
    {
      "name": "Màu sắc",
      "options": ["Đen", "Trắng", "Xanh"]
    }
  ]
}
```

## 🎨 Customization

Edit `mock/generate-data.js` để customize:

```javascript
const categories = generateCategories(12);  // Số lượng categories
const products = generateProducts(100, categories);  // Số lượng products
const users = generateUsers(50);  // Số lượng users
const reviews = generateReviews(200, products, users);  // Số lượng reviews
```

## 📁 Project Structure

```
ofa-mockdata/
├── mock/
│   ├── generate-data.js    # Data generator
│   ├── db.json            # Generated database
│   └── README.md          # Detailed docs
├── package.json
└── README.md
```

## 🔧 Tech Stack

- **JSON Server** - REST API server
- **@faker-js/faker** - Realistic fake data generator

## 📖 Documentation

Chi tiết hơn xem: [mock/README.md](mock/README.md)

## ⚡ Features

✅ Full REST API với CRUD operations  
✅ Realistic Vietnamese e-commerce data  
✅ Product variants (màu sắc, size, v.v.)  
✅ Flash sales với countdown  
✅ User reviews với images  
✅ Auto-watch file changes  
✅ Pagination, sorting, filtering support  

## 🌐 Deployment

Để deploy mock server lên production (miễn phí), xem hướng dẫn chi tiết: **[DEPLOY.md](DEPLOY.md)**

**Recommended:** Deploy lên [Render.com](https://render.com) (free tier forever)

---

**Happy Coding! 🎉**
