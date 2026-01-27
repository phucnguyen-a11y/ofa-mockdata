# Mock Data Server for E-commerce

JSON Server setup với dữ liệu mock cho frontend e-commerce (kiểu Shopee)

## 🚀 Quick Start

### Generate Mock Data
```bash
npm run mock:generate
```

### Start Mock Server
```bash
npm run mock:server
```
Server sẽ chạy tại: `http://localhost:3001`

### Generate & Start (All-in-one)
```bash
npm run mock:dev
```

## 📊 Available Endpoints

### Categories
- **GET** `/categories` - Lấy tất cả danh mục
- **GET** `/categories/:id` - Lấy danh mục theo ID
- **POST** `/categories` - Tạo danh mục mới
- **PUT** `/categories/:id` - Cập nhật danh mục
- **DELETE** `/categories/:id` - Xóa danh mục

### Products
- **GET** `/products` - Lấy tất cả sản phẩm
- **GET** `/products/:id` - Lấy sản phẩm theo ID
- **GET** `/products?categoryId=:id` - Lọc theo danh mục
- **GET** `/products?_sort=price&_order=asc` - Sắp xếp theo giá
- **POST** `/products` - Tạo sản phẩm mới
- **PUT** `/products/:id` - Cập nhật sản phẩm
- **DELETE** `/products/:id` - Xóa sản phẩm

### Users
- **GET** `/users` - Lấy tất cả người dùng
- **GET** `/users/:id` - Lấy người dùng theo ID

### Reviews
- **GET** `/reviews` - Lấy tất cả đánh giá
- **GET** `/reviews?productId=:id` - Lấy đánh giá theo sản phẩm
- **POST** `/reviews` - Tạo đánh giá mới

### Flash Sales
- **GET** `/flashSales` - Lấy tất cả flash sales

### Banners
- **GET** `/banners` - Lấy tất cả banners

## 🔍 Query Parameters

JSON Server hỗ trợ nhiều query parameters:

### Pagination
```
GET /products?_page=1&_limit=20
```

### Sorting
```
GET /products?_sort=price&_order=desc
```

### Full-text search
```
GET /products?q=điện thoại
```

### Filtering
```
GET /products?categoryId=1&isFreeShip=true
```

### Relationships
```
GET /products?_embed=reviews
GET /reviews?_expand=product
```

## 📦 Mock Data Structure

### Product Object
```json
{
  "id": 1,
  "name": "Tên sản phẩm",
  "description": "Mô tả sản phẩm",
  "price": 299000,
  "originalPrice": 499000,
  "discount": 40,
  "categoryId": 1,
  "images": ["url1", "url2"],
  "thumbnail": "thumbnail_url",
  "rating": 4.5,
  "reviewCount": 1234,
  "soldCount": 5678,
  "stock": 100,
  "shopName": "Tên shop",
  "shopId": 1,
  "location": "TP. Hồ Chí Minh, Vietnam",
  "isFreeShip": true,
  "isOfficial": false,
  "tags": ["Bán Chạy", "Mall"],
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

## 💡 Usage Examples

### Fetch với JavaScript
```javascript
// Get all products
fetch('http://localhost:3001/products')
  .then(res => res.json())
  .then(data => console.log(data));

// Get product by category
fetch('http://localhost:3001/products?categoryId=1')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// Get products with pagination
const { data } = await api.get('/products', {
  params: {
    _page: 1,
    _limit: 20,
    _sort: 'soldCount',
    _order: 'desc'
  }
});
```

### React Query
```javascript
import { useQuery } from '@tanstack/react-query';

function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => 
      fetch('http://localhost:3001/products').then(r => r.json())
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 🎨 Generated Data

Mỗi lần chạy `npm run mock:generate` sẽ tạo:
- **12 Categories** - Danh mục sản phẩm
- **100 Products** - Sản phẩm với đầy đủ thông tin
- **50 Users** - Người dùng/khách hàng
- **200 Reviews** - Đánh giá sản phẩm
- **20 Flash Sales** - Sản phẩm flash sale
- **4 Banners** - Banner quảng cáo

Data được generate bằng **@faker-js/faker** nên rất realistic và đa dạng.

## 🔧 Customization

Để thay đổi số lượng data, edit file `mock/generate-data.js`:

```javascript
const categories = generateCategories(12); // Thay đổi số danh mục
const products = generateProducts(100, categories); // Thay đổi số sản phẩm
const users = generateUsers(50); // Thay đổi số users
const reviews = generateReviews(200, products, users); // Thay đổi số reviews
```

## 📝 Notes

- Server chạy ở port **3001** để tránh conflict với app chính
- Data được lưu trong `mock/db.json`
- Mỗi lần generate sẽ **overwrite** file cũ
- JSON Server tự động **watch** file nên changes sẽ reflect ngay lập tức
