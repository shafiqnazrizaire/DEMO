# Email Submission Testing Guide

## ✅ Current Status

**Server:** Running on `http://localhost:8080/`  
**Endpoint:** `/api/book` (corrected)  
**Form:** Updated to use correct endpoint

## 🔧 Setup Steps (IMPORTANT)

### 1. Configure Email Credentials

Edit `.env` file and add your **REAL Gmail credentials**:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_TO=kembojajuaratravels@gmail.com
```

**⚠️ CRITICAL:** 
- Use an [App-Specific Password](https://myaccount.google.com/apppasswords), NOT your regular Gmail password
- Enable 2-Factor Authentication on your Google Account first
- The EMAIL_PASS must be the 16-character app password, not your Google password

### 2. Restart the Server

After updating `.env`:

```bash
# Stop current server (Ctrl+C in terminal)
# Then restart:
node server.js
```

You should see:
```
✅ Email configuration loaded successfully
🚀 Server running at http://localhost:8080/
```

## 🧪 Testing the Form Submission

### Step 1: Open the Website
Visit: `http://localhost:8080/`

### Step 2: Fill Out the Booking Form
- **Full Name:** Test User
- **Email:** your-email@gmail.com (use YOUR email to test)
- **Phone:** +601234567890
- **Nationality:** Malaysia
- **Tour Type:** Select any package
- **Travel Date:** Select any date
- **Travel Time:** Select any time
- **Number of People:** 2
- **Additional Description:** (optional)

### Step 3: Click Submit

**Expected Results:**
1. ✅ Button shows "Sending..." with spinner
2. ✅ Success message appears: "✅ Booking submitted successfully!"
3. ✅ Form resets
4. ✅ Redirects to WhatsApp
5. ✅ Two emails sent:
   - Company: `kembojajuaratravels@gmail.com`
   - Customer: Your test email

## 🔍 Debugging Network Errors

If you still see "Network error. Please check your connection...":

### Check 1: Is Server Running?
```bash
# In PowerShell
Get-Process node
```
Should show a running node process.

### Check 2: Server Logs
The server terminal should show email sending attempts:
```
📧 Sending emails...
📧 Booking data received: {...}
✅ Both emails sent successfully
```

### Check 3: Verify .env File
```bash
# Check .env contents
type .env
```

Should show:
```
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
EMAIL_TO=kembojajuaratravels@gmail.com
```

### Check 4: Network Connection
```bash
# Test Gmail connection
Test-NetConnection -ComputerName smtp.gmail.com -Port 587
```

## 📋 Endpoint Configuration

**Form Endpoint:** `POST /api/book`

**Request Format:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+601234567890",
  "nationality": "Malaysia",
  "people": "2",
  "travelDate": "2025-01-25",
  "travelTime": "09:00",
  "tourType": "Package A",
  "description": "Optional notes"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Booking submitted successfully!",
  "companyMessageId": "email-id-1",
  "customerMessageId": "email-id-2"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details"
}
```

## 🚀 Production Deployment

When deploying to your Google Domain:

1. **Environment Variables** - Add to hosting control panel:
   - `EMAIL_USER` = Your Gmail
   - `EMAIL_PASS` = App-specific password
   - `EMAIL_TO` = Company email
   - `PORT` = 8080 (or configured port)

2. **Keep Server Running** - Use process manager:
   - PM2: `pm2 start server.js`
   - systemd: Create service file
   - Screen/tmux: `screen -S server node server.js`

3. **Test After Deployment**
   - Visit your domain
   - Submit test form
   - Check both email inboxes

## ✅ Checklist

- [ ] `.env` file has real Gmail credentials
- [ ] App-specific password generated (not regular password)
- [ ] Server is running (`http://localhost:8080`)
- [ ] Form endpoint is `/api/book`
- [ ] Submitted test booking
- [ ] Check server logs for "emails sent successfully"
- [ ] Confirm emails received in both inboxes

## 📞 Troubleshooting Checklist

| Issue | Solution |
|-------|----------|
| Network error on submit | Verify server is running: `Get-Process node` |
| Emails not sent | Check `.env` has real credentials |
| "Email config incomplete" warning | Restart server after updating `.env` |
| Gmail authentication failed | Use app-specific password, enable 2FA |
| Port 8080 in use | `Stop-Process -Name node -Force` |
| Still getting errors | Check server logs in terminal window |

## 🔐 Security Notes

- **Never commit `.env` to Git** - Add to `.gitignore`
- **Use app passwords** - Not your main Google password
- **Keep credentials private** - Don't share with others
- **Server-side validation** - All form data validated before sending

---

**Need Help?** Check server terminal logs for detailed error messages!
