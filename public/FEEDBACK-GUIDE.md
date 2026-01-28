# 📝 How to Use Feedback Form

## 🎯 What You Have

Đã tạo sẵn:
1. ✅ **Feedbacks API endpoint**: `POST /feedbacks`
2. ✅ **Beautiful feedback form**: `public/feedback-form.html`
3. ✅ **Auto-save to database**: Data lưu vào `mock/db.json`

---

## 🚀 Quick Start

### 1. Start Mock Server
```bash
npm run mock:server
```

Server chạy tại: `http://localhost:3000`

### 2. Open Feedback Form
Mở file trong browser:
```
open public/feedback-form.html
```

Hoặc truy cập:
```
http://localhost:3000/feedback-form.html
```

### 3. Submit Feedback
- Điền form
- Click "Gửi Feedback"
- Data tự động POST lên API

---

## 📡 API Usage

### Submit Feedback (POST)
```javascript
const feedback = {
  name: "Nguyễn Văn A",
  email: "user@example.com",
  category: "feature",
  rating: 5,
  message: "Tuyệt vời!",
  createdAt: new Date().toISOString(),
  status: "pending"
};

fetch('http://localhost:3000/feedbacks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(feedback)
})
.then(res => res.json())
.then(data => console.log('Created:', data));
```

### Get All Feedbacks (GET)
```javascript
fetch('http://localhost:3000/feedbacks')
  .then(res => res.json())
  .then(feedbacks => console.log(feedbacks));
```

### Get Specific Feedback (GET)
```javascript
fetch('http://localhost:3000/feedbacks/1')
  .then(res => res.json())
  .then(feedback => console.log(feedback));
```

### Update Feedback Status (PATCH)
```javascript
fetch('http://localhost:3000/feedbacks/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'resolved' })
})
.then(res => res.json())
.then(data => console.log('Updated:', data));
```

### Delete Feedback (DELETE)
```javascript
fetch('http://localhost:3000/feedbacks/1', {
  method: 'DELETE'
})
.then(() => console.log('Deleted'));
```

---

## 📊 Feedback Data Structure

```json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "category": "feature",
  "rating": 5,
  "message": "Sản phẩm rất tốt!",
  "createdAt": "2026-01-28T02:42:00.000Z",
  "status": "pending"
}
```

**Categories:**
- `bug` - Báo lỗi
- `feature` - Đề xuất tính năng
- `complaint` - Khiếu nại
- `compliment` - Khen ngợi
- `other` - Khác

**Status:**
- `pending` - Chờ xử lý
- `reviewed` - Đã xem
- `resolved` - Đã giải quyết

---

## 🎨 Customize Form

Edit `public/feedback-form.html` để:
- Thay đổi style/colors
- Thêm/bớt fields
- Change API endpoint
- Add validation rules

---

## 🌐 Deploy to Production

Khi deploy lên Render, feedback form sẽ available tại:
```
https://your-app.onrender.com/feedback-form.html
```

**Important:** Update API_URL trong HTML:
```javascript
// From:
const API_URL = 'http://localhost:3000/feedbacks';

// To:
const API_URL = 'https://your-app.onrender.com/feedbacks';
```

---

## 💡 Advanced Usage

### Filter Feedbacks by Category
```javascript
GET /feedbacks?category=bug
```

### Filter by Rating
```javascript
GET /feedbacks?rating=5
```

### Filter by Status
```javascript
GET /feedbacks?status=pending
```

### Sort by Date
```javascript
GET /feedbacks?_sort=createdAt&_order=desc
```

### Pagination
```javascript
GET /feedbacks?_page=1&_limit=10
```

---

## 🔍 View Submitted Feedbacks

### In Browser Console
Open feedback form → F12 → Console tab

Bạn sẽ thấy:
```
📊 Total feedbacks: X
```

### In Database File
Check `mock/db.json`:
```json
{
  "feedbacks": [
    { "id": 1, "name": "...", ... },
    { "id": 2, "name": "...", ... }
  ]
}
```

### Via API
```bash
curl http://localhost:3000/feedbacks
```

---

**Happy Coding! 🎉**
