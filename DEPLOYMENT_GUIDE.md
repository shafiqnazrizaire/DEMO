# Deployment Guide for Non-Netlify Hosting

## Email Configuration Status: ✅ READY

Your website is now configured to work with **ANY hosting provider** (not just Netlify).

## How It Works

1. **User submits form** → Form sends data to `/api/send-email`
2. **Express backend receives** the booking data
3. **Sends 2 emails:**
   - Company email: `kembojajuaratravels@gmail.com`
   - Customer confirmation: User's email address
4. **Returns success response** → Form shows confirmation

## Deployment Steps

### 1. Environment Variables (.env file)
Ensure your `.env` file contains:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=muhdnazeem19@gmail.com
PORT=8080
NODE_ENV=production
```

### 2. Hosting Provider Setup

#### For Shared Hosting (cPanel, etc.):
- Upload all files to your domain
- Ensure Node.js is installed
- Start server: `node server.js`
- Set up port forwarding if needed

#### For VPS/Dedicated Server:
- Install Node.js and npm
- Run: `npm install`
- Start server: `npm start` or use PM2/forever for background process
- Configure reverse proxy (Nginx/Apache) to forward requests

#### For Cloud Hosting (Google Cloud, AWS, DigitalOcean):
- Deploy Node.js application
- Set environment variables in hosting dashboard
- Ensure port 8080 is open (or your configured port)

### 3. Domain Configuration

Point your Google domain to your hosting:
1. Go to Google Domains → DNS Settings
2. Add your hosting IP address
3. Wait 24-48 hours for DNS propagation

### 4. CORS Configuration

Your server already handles CORS for multiple origins. Add your domain to the CORS whitelist in `server.js` line 27-46 if needed:

```javascript
origin: [
    'http://yourdomain.com',
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    // ... other origins
]
```

## Testing Email Functionality

### Local Testing:
```bash
npm install
node server.js
```
Visit `http://localhost:8080` and submit the form.

### Production Testing:
1. Deploy to your hosting
2. Visit your domain
3. Submit a test booking
4. Check email inbox (both company and customer)

## Email Credentials

**IMPORTANT:** Ensure your Gmail account has:
- ✅ 2-factor authentication enabled
- ✅ App password generated (NOT regular password)
- ✅ Less secure apps allowed (if using regular password)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Emails not sending | Check `.env` file - verify `EMAIL_USER` and `EMAIL_PASS` |
| CORS errors | Add your domain to whitelist in `server.js` |
| Port connection issues | Check if port 8080 is open on firewall |
| DNS not resolving | Wait 48 hours or check domain registrar settings |

## Architecture

```
User Browser
    ↓
index.html (Form)
    ↓
script.js (Submit Handler)
    ↓
POST /api/send-email
    ↓
Express Backend (server.js)
    ↓
Gmail SMTP
    ↓
✉️ Send 2 Emails
```

## Key Files

- **server.js** - Express backend with email functionality
- **script.js** - Frontend form handler (updated to use `/api/send-email`)
- **.env** - Environment variables (keep this private!)
- **package.json** - Dependencies management

## Support

If you encounter issues:
1. Check server logs for detailed error messages
2. Verify email credentials in `.env`
3. Ensure Node.js and dependencies are installed
4. Check firewall/port settings with hosting provider
