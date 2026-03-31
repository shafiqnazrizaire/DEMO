# Fix "No Network Connection" – Email in Production

Gmail often **fails when deployed** (blocked ports, security, or "no network connection"). Use a transactional email service instead.

---

## What to configure

### Option 1: SendGrid (recommended)

1. **Sign up**: [sendgrid.com](https://sendgrid.com) → create account.
2. **Create API Key**: Settings → API Keys → Create API Key (name e.g. "Kemboja Travels", "Mail Send" permission).
3. **Verify sender**: Settings → Sender Authentication → verify single sender (e.g. `noreply@yourdomain.com` or your Gmail).
4. **Set in production** (Netlify/Vercel/host env):
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxx
   EMAIL_FROM=noreply@yourdomain.com
   COMPANY_EMAIL=kembojajuaratravels@gmail.com
   ```
5. Do **not** set `EMAIL_PASSWORD` in production so the app uses SendGrid instead of Gmail.

### Option 2: AWS SES

1. **AWS Console** → SES → Verified identities (verify sender email or domain).
2. **SMTP**: SES → SMTP settings → Create SMTP credentials.
3. **Set in production**:
   ```env
   AWS_SES_ACCESS_KEY=your_smtp_username
   AWS_SES_SECRET_KEY=your_smtp_password
   AWS_SES_REGION=ap-southeast-1
   EMAIL_FROM=verified@yourdomain.com
   COMPANY_EMAIL=kembojajuaratravels@gmail.com
   ```

---

## Priority

The server uses **whichever is set first**:

1. **SendGrid** if `SENDGRID_API_KEY` is set  
2. **AWS SES** if `AWS_SES_ACCESS_KEY` and `AWS_SES_SECRET_KEY` are set  
3. **Gmail** otherwise (works locally; often fails in production)

---

## Test

After deploy, run a test booking with card `4242 4242 4242 4242`. Both emails should arrive:

- **Customer**: Subject "Booking Confirmation - [Reference]"
- **Company**: Subject "New Booking - [Reference]" to kembojajuaratravels@gmail.com
