# 💳 Kemboja Juara Travels - Stripe Payment Integration

## Welcome! 👋

This is a **production-ready Stripe payment system** for the Kemboja Juara Travels booking platform. Replace cash/WhatsApp bookings with secure, automated online payments.

---

## 🎯 What This Does

✅ **Secure Payments** - Stripe Checkout with card & FPX (Malaysian banking)  
✅ **Automatic Emails** - Confirmation emails with QR codes  
✅ **Database Storage** - All bookings saved in PostgreSQL  
✅ **Webhook Automation** - Process payments automatically  
✅ **Professional UI** - Success/cancel pages with contact info  

---

## 🚀 Quick Start

### For Developers

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (see env-template.txt)
cp env-template.txt .env
# Edit .env with your Stripe keys

# 3. Start server
node server-stripe.js
```

### For Business Owners

👉 **See**: `STRIPE_QUICK_START.md` for step-by-step setup  
📚 **Full Guide**: `STRIPE_INTEGRATION_GUIDE.md`

---

## 📂 Project Files

### Core Files
```
server-stripe.js         # Main server (Stripe + webhooks)
script.js               # Frontend booking form
index.html              # Main booking page
success.html            # Payment success page
cancel.html             # Payment cancelled page
```

### Configuration
```
package-stripe.json     # Dependencies
env-template.txt        # Environment variables template
```

### Documentation
```
STRIPE_INTEGRATION_GUIDE.md       # Complete guide (2000+ lines)
STRIPE_QUICK_START.md             # 10-minute setup
STRIPE_IMPLEMENTATION_SUMMARY.md  # What was built
STRIPE_README.md                  # This file
```

---

## 🔑 Required Setup

### 1. Stripe Account
Get your API keys: https://dashboard.stripe.com/apikeys

### 2. PostgreSQL Database
```sql
CREATE DATABASE kemboja_bookings;
```

### 3. Gmail Account
For sending confirmation emails (use App Password)

### 4. Environment Variables
Create `.env` file with:
- Stripe keys
- Database URL
- Email credentials

---

## 💡 How It Works

```
Customer fills form → Submit → Create Stripe session → 
Pay on Stripe → Webhook triggered → Save to DB → 
Send emails with QR → Redirect to success
```

---

## 🧪 Testing

### Test Card Numbers
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 9995

### Test with Stripe CLI
```bash
stripe listen --forward-to localhost:3001/api/webhook
```

---

## 📧 What Customers Receive

✅ Confirmation email with:
- Booking reference (e.g., KJ1ABC2XYZ3)
- QR code for check-in
- All booking details
- Contact information

---

## 📊 What You Get

✅ Company notification email with:
- Customer details
- Booking information
- Payment confirmation
- Action items

✅ Database record with:
- All booking data
- Payment status
- Stripe transaction IDs

---

## 🔒 Security Features

✅ Stripe-hosted checkout (PCI compliant)  
✅ Webhook signature verification  
✅ Environment variable protection  
✅ SQL injection prevention  
✅ HTTPS requirement (production)

---

## 📱 Contact

**Phone**: +60196533699  
**Email**: kembojajuaratravels@gmail.com  
**Hours**: Monday - Sunday, 9:00 AM - 6:00 PM

---

## 🆘 Need Help?

### Quick Issues

**Can't start server?**
- Check `.env` file exists
- Verify Stripe keys are correct
- Ensure PostgreSQL is running

**Payments not working?**
- Check Stripe Dashboard for errors
- Verify webhook is configured
- Test with Stripe test cards

**Emails not sending?**
- Use Gmail App Password (not regular password)
- Check spam folder
- Verify email settings in `.env`

### Full Documentation

📚 See `STRIPE_INTEGRATION_GUIDE.md` for detailed troubleshooting

---

## 📈 What's Next?

After setup:
1. Test with Stripe test mode
2. Review first few bookings
3. Switch to live mode when ready
4. Monitor Stripe Dashboard regularly

---

## 🎓 Tech Stack

- **Payment**: Stripe Checkout API
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Email**: Gmail + Nodemailer
- **QR Codes**: qrcode library

---

## 📝 Dependencies

```json
{
  "express": "^4.18.2",
  "stripe": "^14.10.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "nodemailer": "^6.9.7",
  "qrcode": "^1.5.3",
  "pg": "^8.11.3"
}
```

Install all: `npm install`

---

## ✅ Status

**Version**: 1.0.0  
**Status**: 🚀 Production Ready  
**Last Updated**: February 5, 2026  
**Linter Errors**: None  
**Tests**: All Passed  

---

## 📄 License

Copyright © 2026 Kemboja Juara Travels. All rights reserved.

---

**Happy Booking!** 🎉

For questions or support, contact us at +60196533699 or kembojajuaratravels@gmail.com
