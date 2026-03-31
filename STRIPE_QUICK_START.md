# ⚡ Stripe Integration - Quick Start Guide

## 🚀 Get Running in 10 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
cd travel-website
npm install express stripe cors dotenv nodemailer qrcode pg
```

### Step 2: Set Up Environment (3 minutes)

Create a `.env` file (copy from `env-template.txt`):

```env
# Stripe (Get from: https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/kemboja_bookings

# Email (Gmail App Password)
EMAIL_USER=youremail@gmail.com
EMAIL_PASSWORD=your_16_char_app_password

# Settings
NODE_ENV=development
PORT=3001
DOMAIN_URL=http://localhost:3001
COMPANY_EMAIL=kembojajuaratravels@gmail.com
```

### Step 3: Set Up Database (2 minutes)

```sql
-- In PostgreSQL
CREATE DATABASE kemboja_bookings;
```

### Step 4: Start Server (1 minute)

```bash
node server-stripe.js
```

You should see:
```
🚀 Server running on port 3001
💳 Stripe integration active
✅ Database schema created/verified
```

### Step 5: Test Locally (2 minutes)

1. **Open**: http://localhost:3001/index.html
2. **Navigate** to Bookings page
3. **Fill form** with test data
4. **Select** a package
5. **Submit** booking
6. **Use test card**: 4242 4242 4242 4242

---

## 🧪 Testing with Stripe CLI

```bash
# Install Stripe CLI
# Download from: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/webhook
```

Copy the webhook secret (whsec_...) to your `.env` file.

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Server starts without errors
- [ ] Can access booking form at localhost:3001
- [ ] Form submits and redirects to Stripe
- [ ] Can complete test payment
- [ ] Redirects to success page
- [ ] Booking saved in database
- [ ] Confirmation email received with QR code
- [ ] Company notification email received

---

## 🎯 Test Cards

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 9995 | ❌ Declined |

---

## 📝 Quick Test Booking

Use these test values:

```
Name: Test Customer
Email: test@example.com
Phone: +60123456789
Nationality: Malaysian
People: 2
Date: [tomorrow]
Time: 10:00
Package: Package A
Transportation: Car
```

---

## 🔥 Common Issues & Quick Fixes

### Can't Connect to Database?
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Create database if missing
createdb kemboja_bookings
```

### Emails Not Sending?
- Use Gmail App-Specific Password (not regular password)
- Generate at: https://myaccount.google.com/apppasswords

### Webhook Not Working?
```bash
# Test locally with Stripe CLI
stripe listen --forward-to localhost:3001/api/webhook
```

---

## 📚 Full Documentation

For detailed setup, see: `STRIPE_INTEGRATION_GUIDE.md`

---

## 🆘 Need Help?

**Email**: kembojajuaratravels@gmail.com  
**Phone**: +60196533699

---

**Status**: ✅ Ready to Use  
**Setup Time**: ~10 minutes  
**Version**: 1.0.0
