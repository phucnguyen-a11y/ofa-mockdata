# Lambda Quick Start 🚀

## 3 Bước Deploy

### 1. Add GitLab Variables
```
Settings → CI/CD → Variables:

AWS_ACCESS_KEY_ID       = your-access-key
AWS_SECRET_ACCESS_KEY   = your-secret-key  
AWS_REGION              = ap-southeast-1
```

### 2. Push Code
```bash
git push gitlab main
```

### 3. Get Endpoint
```
Pipeline output sẽ hiển thị:
https://xxxxx.execute-api.ap-southeast-1.amazonaws.com/prod
```

---

## Chi Phí
**FREE 12 tháng** (AWS Free Tier)

---

## Test API
```bash
curl https://xxxxx.../prod/products
curl https://xxxxx.../prod/posts
curl https://xxxxx.../prod/categories
```

---

## Docs
- [LAMBDA-DEPLOY.md](file:///Users/phucnguyen/Documents/projects/ofa-mockdata/LAMBDA-DEPLOY.md) - Full guide
- [serverless.yml](file:///Users/phucnguyen/Documents/projects/ofa-mockdata/serverless.yml) - Config
- [lambda.js](file:///Users/phucnguyen/Documents/projects/ofa-mockdata/lambda.js) - Handler
