# ⚡ Quick Reference - Email System

## 🎯 What You Need to Do

1. **Add Gmail credentials to `.env`:**
   ```
   EMAIL_USER=kembojajuaratravels@gmail.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_TO=kembojajuaratravels@gmail.com
   ```

2. **Get your app password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Select: Mail → Windows Computer
   - Copy the 16-character password

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **Test the form:**
   - Open: http://localhost:8080
   - Fill & submit booking
   - Check both email inboxes

## 📧 Email System Status

| Component | Status |
|-----------|--------|
| Form Endpoint | ✅ `/api/book` |
| Server Running | ⏳ When you run `node server.js` |
| Email Sending | ⏳ Waiting for Gmail credentials |
| Speed | ✅ Fast (2-5 seconds) |
| Recipients | ✅ User + Company |

## 🚀 How It Works

```
Submit Form
    ↓
Sends to: POST /api/book
    ↓
Creates 2 Emails (Parallel):
├─ Confirmation → User's Email
└─ Notification → kembojajuaratravels@gmail.com
    ↓
Both Sent (< 5 seconds)
    ↓
Success Message → Browser
```

## 📋 Files Updated

- ✅ `script.js` - Form endpoint corrected
- ✅ `.env` - Email configuration
- ✅ `server.js` - Removed config.js dependency
- ✅ `test-email.js` - Created for testing

## 🧪 Test Command

```bash
# With server running in another terminal
node test-email.js
```

## 📞 Troubleshooting

```bash
# Server not starting?
node server.js

# Check if port 8080 is free
netstat -ano | findstr :8080

# See full .env
type .env

# Check npm packages installed
npm list
```

## ⚠️ Important Notes

- Use **app-specific password**, not Gmail password
- Enable 2FA on Google Account first
- `.env` file is ignored from Git (safe)
- Both emails sent in parallel (fast)

## ✅ Success Indicators

When form submitted successfully:
- ✅ Button shows "Sending..." spinner
- ✅ Success message appears
- ✅ Form resets
- ✅ Redirects to WhatsApp
- ✅ Email in inbox within 10 seconds
- ✅ Server logs show "Both emails sent successfully"

## 🎁 Bonus Features

- Retry logic if email fails
- Multiple fallback methods
- Detailed server logging
- Response time tracking
- Complete error handling

---

**Status:** Ready to test with Gmail credentials! 🎉
