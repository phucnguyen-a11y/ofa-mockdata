# AWS Deployment - Quick Setup

## 📋 Checklist

### 1. Chọn Deployment Method
- [ ] AWS Lightsail ($3.50/tháng) - **Recommended cho bắt đầu**
- [ ] AWS Lambda (Serverless) - Tiết kiệm nếu traffic thấp
- [ ] AWS ECS Fargate (Container) - Cho production scale

### 2. Setup AWS Lightsail (Fastest)

#### Tạo Instance
```bash
# AWS Console → Lightsail → Create instance
# - OS: Ubuntu 20.04 LTS
# - Plan: $3.50/month
# - Enable Auto Snapshots
```

#### SSH Key Setup
```bash
# Download SSH key từ Lightsail
chmod 400 ~/Downloads/LightsailKey.pem
ssh -i ~/Downloads/LightsailKey.pem ubuntu@<your-ip>
```

#### Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repo
git clone https://github.com/your-username/ofa-mockdata.git
cd ofa-mockdata

# Install & Run
npm install
npm run mock:generate
pm2 start npm --name "mock-server" -- run mock:server
pm2 startup
pm2 save
```

#### Open Firewall
```bash
# Lightsail Console → Networking → IPv4 Firewall
# Add Rule: Custom TCP, Port 3000
```

**✅ Done!** Access: `http://<your-ip>:3000`

---

### 3. Setup GitLab CI/CD

#### A. Move to GitLab
```bash
# Add GitLab remote
git remote add gitlab https://gitlab.com/company/ofa-mockdata.git
git push gitlab main
```

#### B. Add GitLab CI/CD Variables
```
Settings → CI/CD → Variables:

LIGHTSAIL_IP          = <your-lightsail-ip>
SSH_PRIVATE_KEY       = <your-private-key>
```

**Private Key:**
```bash
# Copy nội dung file .pem
cat ~/Downloads/LightsailKey.pem
# Paste vào GitLab variable SSH_PRIVATE_KEY
```

#### C. Enable Auto-Deployment
File `.gitlab-ci.yml` đã có sẵn! Chỉ cần push code:

```bash
git add .
git commit -m "Add deployment config"
git push gitlab main
```

**✅ Auto-deploy mỗi khi push code!**

---

### 4. Custom Domain (Optional)

#### Setup NGINX Reverse Proxy
```bash
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/mock-api
```

**Config:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/mock-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Add SSL (Free)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

**✅ HTTPS enabled!** Access: `https://api.yourdomain.com`

---

## 💰 Cost Breakdown

### Lightsail
- Instance: $3.50/month
- Data transfer: Free (1TB)
- **Total: $3.50/month**

### Lambda (if using serverless)
- First 1M requests/month: FREE
- Lambda compute: FREE (400,000 GB-seconds)
- API Gateway: FREE (1M requests)
- **Total: $0 first year**

---

## 🔄 Common Commands

### On Server (SSH)
```bash
# View logs
pm2 logs mock-server

# Restart
pm2 restart mock-server

# Stop
pm2 stop mock-server

# Update code
cd ~/ofa-mockdata
git pull
npm install
npm run mock:generate
pm2 restart mock-server
```

### Local Testing
```bash
npm run mock:dev
# Access: http://localhost:3000
```

---

## 🐛 Troubleshooting

### Port already in use
```bash
pm2 delete mock-server
pm2 start npm --name "mock-server" -- run mock:server
```

### Can't access from outside
```bash
# Check firewall
sudo ufw status
sudo ufw allow 3000

# Check if server running
pm2 status
curl localhost:3000
```

### GitLab CI failing
- Check SSH_PRIVATE_KEY format (no extra spaces)
- Verify LIGHTSAIL_IP is correct
- Ensure SSH key is added to Lightsail instance

---

## 📞 Support

For detailed guides, see:
- [aws-deployment-guide.md](file:///Users/phucnguyen/.gemini/antigravity/brain/9fd68eed-3158-46a2-818f-fcce192a3bad/aws-deployment-guide.md)
