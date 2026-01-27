# Step-by-Step: Deploy Mock Server to Render

## 📋 Prerequisites
- [ ] GitHub account
- [ ] Render account (free) - https://render.com

---

## 🛠️ Step 1: Prepare Project

### 1.1 Update package.json
Đã có sẵn trong project:
```json
{
  "scripts": {
    "mock:server": "json-server mock/db.json --port 3001 --watch"
  }
}
```

### 1.2 Check .gitignore
Đảm bảo file `.gitignore` có:
```
node_modules/
package-lock.json
.DS_Store
```

---

## 📤 Step 2: Push to GitHub

### 2.1 Initialize Git (if not yet)
```bash
git init
git add .
git commit -m "Initial commit - Mock data server"
```

### 2.2 Create GitHub Repository
1. Vào https://github.com/new
2. Tạo repo mới (ví dụ: `ofa-mockdata`)
3. **Không** check "Initialize with README" (vì đã có sẵn)

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/ofa-mockdata.git
git branch -M main
git push -u origin main
```

> **Note:** Thay `YOUR_USERNAME` bằng GitHub username của bạn

---

## 🚀 Step 3: Deploy on Render

### 3.1 Create Render Account
1. Vào https://render.com
2. Sign up with GitHub account
3. Authorize Render to access GitHub

### 3.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"**
3. Chọn repo `ofa-mockdata`
4. Click **"Connect"**

### 3.3 Configure Build Settings

**Basic Settings:**
- **Name:** `ofa-mockdata` (hoặc tên bạn muốn)
- **Region:** Choose closest (Singapore for Vietnam)
- **Branch:** `main`
- **Root Directory:** Leave empty

**Build & Deploy:**
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm run mock:server`

**Instance Type:**
- Select **"Free"** plan

### 3.4 Environment Variables (Optional)
- **PORT:** Render tự set, không cần config
- Nếu cần CORS, có thể thêm sau

### 3.5 Deploy
1. Click **"Create Web Service"**
2. Render sẽ bắt đầu build & deploy
3. Đợi ~2-3 phút

---

## ✅ Step 4: Verify Deployment

### 4.1 Check Build Logs
Trong Render dashboard, xem logs để đảm bảo:
```
JSON Server started on PORT :XXXX
Endpoints:
http://localhost:XXXX/categories
...
```

### 4.2 Get Your API URL
Render sẽ cung cấp URL dạng:
```
https://ofa-mockdata.onrender.com
```

### 4.3 Test Endpoints
Thử call API từ browser hoặc Postman:
```
https://ofa-mockdata.onrender.com/products
https://ofa-mockdata.onrender.com/categories
https://ofa-mockdata.onrender.com/flashSales
```

---

## 🔧 Step 5: Fix Common Issues

### Issue 1: Port Binding Error
**Problem:** `EADDRINUSE`

**Solution:** JSON Server cần lắng nghe PORT của Render

**Fix:** Update `package.json`:
```json
{
  "scripts": {
    "mock:server": "json-server mock/db.json --port $PORT --host 0.0.0.0 --watch"
  }
}
```

Sau đó push lại:
```bash
git add package.json
git commit -m "Fix port for Render"
git push
```

Render sẽ tự động re-deploy.

### Issue 2: CORS Errors
**Problem:** Frontend không call được từ domain khác

**Solution:** Thêm CORS middleware

Sẽ hướng dẫn nếu gặp issue này.

---

## 📱 Step 6: Use in Frontend

### Update API Base URL
```javascript
// Before (localhost)
const API_URL = 'http://localhost:3001';

// After (Render)
const API_URL = 'https://ofa-mockdata.onrender.com';
```

### Example with Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ofa-mockdata.onrender.com'
});

// Fetch products
const { data } = await api.get('/products');
```

---

## 🎯 Auto-Deploy Setup (Optional)

Render tự động deploy khi bạn push code mới:

1. Make changes locally
2. Commit & push to GitHub
3. Render auto-detect và deploy

**Example:**
```bash
# Edit generate-data.js to add more products
npm run mock:generate

git add mock/db.json
git commit -m "Update mock data"
git push

# Render automatically deploys! 🎉
```

---

## ⚡ Important Notes

### Free Tier Limitations
- ✅ 750 hours/month (đủ cho 1 service chạy 24/7)
- ✅ 512MB RAM
- ⚠️ Service **sleeps** sau 15 phút không có traffic
- 🐌 First request sau khi sleep sẽ **chậm** (~30s)

### Wake Service on Sleep
Nếu muốn service luôn "awake", có thể:
1. Upgrade to paid plan ($7/month)
2. Dùng cron job để ping mỗi 10 phút
3. Accept first request chậm (acceptable cho mock testing)

---

## 🔄 Update Mock Data

### Option 1: Update via Git
```bash
# Regenerate data
npm run mock:generate

# Commit & push
git add mock/db.json
git commit -m "Update mock data"
git push

# Render auto-deploys
```

### Option 2: Manual via Render Dashboard
1. Go to Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

---

## 📊 Monitor Your Service

**Render Dashboard shows:**
- ✅ Deploy status
- ✅ Build logs
- ✅ Runtime logs
- ✅ Metrics (CPU, Memory)
- ✅ Custom domain setup

---

## 🎉 Done!

Your mock API is now live at:
```
https://YOUR-SERVICE-NAME.onrender.com
```

**Available endpoints:**
- `GET /categories`
- `GET /products`
- `GET /users`
- `GET /reviews`
- `GET /flashSales`
- `GET /banners`

Happy coding! 🚀
