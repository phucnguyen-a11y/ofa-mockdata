# AWS Lambda Setup - Step by Step 🚀

**GHI NHỚ:** Với Lambda + Serverless Framework, bạn KHÔNG CẦN tạo Lambda instance manually!

GitLab CI/CD sẽ TỰ ĐỘNG tạo:
- ✅ Lambda function
- ✅ API Gateway
- ✅ Routes
- ✅ Permissions

Bạn chỉ cần làm 3 việc!

---

## 📋 Bước 1: Tạo IAM User (AWS Console)

### 1.1 Login AWS Console
👉 https://console.aws.amazon.com

### 1.2 Vào IAM Service
- Search bar → Gõ "IAM" → Click "IAM"

### 1.3 Tạo User
```
IAM Dashboard → Users (menu bên trái) → Create user

User name: gitlab-ci-lambda
✅ Provide user access to the AWS Management Console: KHÔNG TICK
Click "Next"
```

### 1.4 Gắn Permissions
```
Permissions options: Attach policies directly

Tìm và tick 3 policies sau:
✅ AWSLambdaFullAccess
✅ IAMFullAccess  
✅ AmazonAPIGatewayAdministrator

Click "Next"
Click "Create user"
```

### 1.5 Tạo Access Keys
```
Vào user vừa tạo: gitlab-ci-lambda

Tab "Security credentials"
→ Scroll xuống "Access keys"
→ Click "Create access key"

Use case: ✅ Application running outside AWS
Click "Next"
Description: "GitLab CI/CD"
Click "Create access key"
```

**⚠️ QUAN TRỌNG:** Copy 2 giá trị này:
```
Access key ID:     AKIA...............
Secret access key: wJalr.............
```

**Lưu lại!** Secret key chỉ hiện 1 lần duy nhất.

---

## 📋 Bước 2: Setup GitLab Variables

### 2.1 Vào GitLab Project
👉 https://git.okxe.vn/okxe/mock-server/ofa-mock-server

### 2.2 Vào Settings
```
Settings (menu bên trái)
→ CI/CD
→ Variables
→ Expand
```

### 2.3 Add 3 Variables

**Variable 1:**
```
Key:   AWS_ACCESS_KEY_ID
Value: AKIA............... (từ bước 1.5)
Type:  Variable
Flags: ✅ Protect variable
       ✅ Mask variable
```
Click "Add variable"

**Variable 2:**
```
Key:   AWS_SECRET_ACCESS_KEY
Value: wJalr............... (từ bước 1.5)
Type:  Variable
Flags: ✅ Protect variable
       ✅ Mask variable
```
Click "Add variable"

**Variable 3:**
```
Key:   AWS_REGION
Value: ap-southeast-1
Type:  Variable
Flags: (Không tick gì)
```
Click "Add variable"

**✅ Done!** Bạn sẽ thấy 3 variables.

---

## 📋 Bước 3: Deploy (GitLab Tự Động)

### 3.1 Trigger Pipeline

**Cách 1: Push code (đã làm rồi)**
```bash
# Code đã push → Pipeline tự động chạy
```

**Cách 2: Manual trigger**
```
GitLab → CI/CD → Pipelines
→ Click "Run pipeline"
→ Branch: main
→ Click "Run pipeline"
```

### 3.2 Xem Pipeline Chạy

```
GitLab → CI/CD → Pipelines → Click vào pipeline đang chạy

Bạn sẽ thấy 2 stages:
1. 📦 build - Install dependencies, generate data
2. 🚀 deploy:lambda - Deploy to AWS Lambda
```

**Pipeline sẽ:**
1. Install Serverless Framework
2. Tạo Lambda function (TỰ ĐỘNG)
3. Tạo API Gateway (TỰ ĐỘNG)
4. Upload code
5. Configure routes

### 3.3 Lấy API Endpoint

Sau khi pipeline xong:

```
Click vào job "deploy:lambda"
→ Scroll xuống output
→ Tìm dòng:

endpoints:
  ANY - https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod
```

**Copy URL này!** Đây là API endpoint của bạn.

---

## ✅ Test API

```bash
# Replace URL với endpoint của bạn
curl https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/products
curl https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/posts
curl https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/categories
```

**Hoặc mở browser:**
```
https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/products
```

---

## 🔍 Verify trên AWS Console

### Check Lambda Function
```
AWS Console → Lambda → Functions
→ Bạn sẽ thấy: json-mock-server-prod-api
```

### Check API Gateway
```
AWS Console → API Gateway
→ Bạn sẽ thấy: prod-json-mock-server
```

**Tất cả đã được tạo TỰ ĐỘNG!** 🎉

---

## 📊 Tóm Tắt

**Bạn làm gì?**
1. ✅ Tạo IAM user (5 phút)
2. ✅ Add 3 variables vào GitLab (2 phút)
3. ✅ Push code (đã xong)

**GitLab/Serverless làm gì?**
1. ✅ Tạo Lambda function
2. ✅ Tạo API Gateway
3. ✅ Upload code
4. ✅ Configure routing
5. ✅ Trả về endpoint URL

**Chi phí:** $0 (Free tier 12 tháng)

---

## 🐛 Troubleshooting

### Pipeline fails: "Access Denied"
- Check AWS_ACCESS_KEY_ID và AWS_SECRET_ACCESS_KEY đúng chưa
- Check IAM user có đủ 3 permissions chưa

### Pipeline fails: "Region not found"
- Check AWS_REGION = ap-southeast-1

### Không thấy endpoint URL
- Scroll xuống output của job "deploy:lambda"
- Tìm dòng "endpoints:"

---

## 🎯 Done!

Copy endpoint URL và dùng trong frontend:

```javascript
const API_URL = 'https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod';

fetch(`${API_URL}/products`)
  .then(r => r.json())
  .then(data => console.log(data));
```

**Mỗi lần update code:**
```bash
git add .
git commit -m "Update data"
git push origin main
```
→ GitLab tự động deploy lại! 🚀
