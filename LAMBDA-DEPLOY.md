# AWS Lambda + GitLab CI/CD - Deploy Guide

Hướng dẫn deploy JSON mock server lên AWS Lambda với GitLab CI/CD tự động.

---

## 💰 Chi Phí

**FREE 12 tháng đầu tiên** (AWS Free Tier):
- Lambda: 1M requests/tháng FREE
- API Gateway: 1M requests/tháng FREE
- Compute: 400,000 GB-seconds FREE

**Sau 12 tháng:**
- ~$0-5/tháng (traffic thấp)
- Pay-per-use (không chạy = không mất tiền)

---

## 📋 Checklist Setup

### 1️⃣ Setup AWS Account
- [ ] Tạo AWS account
- [ ] Tạo IAM User cho GitLab CI/CD
- [ ] Lưu Access Key ID và Secret Access Key

### 2️⃣ Setup GitLab
- [ ] Push code lên GitLab
- [ ] Add AWS credentials vào GitLab Variables
- [ ] Trigger CI/CD pipeline

### 3️⃣ Deploy & Test
- [ ] Verify deployment thành công
- [ ] Test API endpoints

---

## 🔧 Bước 1: Tạo IAM User cho GitLab

### AWS Console → IAM → Users → Create User

**User name:** `gitlab-ci-lambda`

**Permissions:** Attach policies directly
- `AWSLambdaFullAccess`
- `IAMFullAccess`
- `AmazonAPIGatewayAdministrator`

**Access type:** Programmatic access

> ⚠️ **Quan trọng:** Lưu lại `Access Key ID` và `Secret Access Key`

---

## 📦 Bước 2: Setup GitLab Repository

### A. Push Code lên GitLab

```bash
# Add GitLab remote
git remote add gitlab https://gitlab.com/your-company/ofa-mockdata.git

# Push code
git push gitlab main
```

### B. Add GitLab CI/CD Variables

**Settings → CI/CD → Variables → Add Variable:**

| Key | Value | Protected | Masked |
|-----|-------|-----------|---------|
| `AWS_ACCESS_KEY_ID` | Your Access Key | ✅ | ✅ |
| `AWS_SECRET_ACCESS_KEY` | Your Secret Key | ✅ | ✅ |
| `AWS_REGION` | `ap-southeast-1` | ❌ | ❌ |

---

## 🚀 Bước 3: Deploy với GitLab CI/CD

File `.gitlab-ci.yml` đã được tạo sẵn! Chỉ cần:

```bash
# Commit và push
git add .
git commit -m "Add Lambda deployment"
git push gitlab main
```

**GitLab sẽ tự động:**
1. ✅ Install dependencies
2. ✅ Generate mock data
3. ✅ Deploy lên AWS Lambda
4. ✅ Tạo API Gateway endpoint

**Xem pipeline:** GitLab → CI/CD → Pipelines

---

## 📋 GitLab CI/CD Pipeline (Lambda)

File đã tạo: `.gitlab-ci.yml`

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run mock:generate
  artifacts:
    paths:
      - node_modules/
      - mock/db.json

deploy:lambda:
  stage: deploy
  image: node:18-alpine
  script:
    - npm install -g serverless
    - serverless deploy --stage prod
  only:
    - main
```

---

## ✅ Bước 4: Verify Deployment

### Sau khi pipeline chạy xong, check output:

```
✅ Service deployed to stack json-mock-server-prod

endpoints:
  ANY - https://xxxxx.execute-api.ap-southeast-1.amazonaws.com/prod
```

### Test API:

```bash
# Test endpoint
curl https://xxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/products
curl https://xxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/posts
```

---

## 🔄 Update & Redeploy

Mỗi khi push code mới:

```bash
git add .
git commit -m "Update mock data"
git push gitlab main
```

**→ GitLab tự động deploy!**

---

## 📊 Files Cần Thiết

Đã tạo sẵn:

✅ `serverless.yml` - Serverless config  
✅ `lambda.js` - Lambda handler  
✅ `.gitlab-ci.yml` - CI/CD pipeline  
✅ `package.json` - Updated với serverless dependencies

---

## 🐛 Troubleshooting

### Pipeline fails: "serverless: command not found"

**Fix:** Update `.gitlab-ci.yml`:
```yaml
before_script:
  - npm install -g serverless
```

### Lambda timeout error

**Fix:** Update `serverless.yml`:
```yaml
provider:
  timeout: 30  # Increase to 30 seconds
  memorySize: 512  # Increase memory
```

### CORS errors

Lambda đã config CORS sẵn trong `serverless.yml`:
```yaml
cors:
  origin: '*'
```

### Cold start slow

**Normal:** Lambda cold start ~1-2 giây lần đầu
**Solution:** Keep Lambda warm với scheduled pings (optional)

---

## 💡 Tips

### Local Testing (before deploy)

```bash
# Install serverless-offline
npm install --save-dev serverless-offline

# Start local
serverless offline

# Test
curl http://localhost:3000/products
```

### View Lambda Logs

```bash
# Install AWS CLI
aws logs tail /aws/lambda/json-mock-server-prod-api --follow
```

### Cost Monitoring

AWS Console → CloudWatch → Billing → Budgets
- Set budget alert tại $5/tháng

---

## 📈 Scaling

Lambda tự động scale:
- 1 request = 1 Lambda instance
- 1000 concurrent requests = 1000 instances
- No configuration needed!

---

## 🎯 Summary

**Setup một lần:**
1. ✅ Tạo IAM user
2. ✅ Add GitLab variables
3. ✅ Push code

**Mỗi lần update:**
1. ✅ `git push gitlab main`
2. ✅ Done! Auto-deploy

**Chi phí:** $0 trong 12 tháng đầu

**Endpoint:** `https://xxxxx.execute-api.ap-southeast-1.amazonaws.com/prod`

**Perfect cho:** Mock server, development, testing, low-traffic APIs

---

## 📞 Next Steps

1. Push code lên GitLab
2. Add AWS credentials
3. Watch pipeline deploy
4. Get API endpoint
5. Use in frontend!

**Done!** 🚀
