# Stripe Integration – Package Images, Emails & Production Setup

This guide covers: **package images for Checkout**, **logo setup**, **production-ready email**, **credentials**, and a **testing checklist**.

---

## 1. Package image setup (Stripe Checkout)

Checkout shows one image per package. Images **must be publicly accessible HTTPS URLs** (Stripe does not accept local files or `http://` in production).

### Option A: Use defaults (no change)

The server uses built-in placeholder URLs (Penang/Unsplash). No setup required for testing.

### Option B: Use your own images

1. **Host images** on your site or a CDN, e.g.:
   - `https://yoursite.com/images/package-a.jpg`
   - Or use an image host (Imgur, Cloudinary, your server’s `/public` folder).

2. **Set env vars** (in `.env` or your host’s env):

   ```env
   PACKAGE_IMAGE_PACKAGE_A=https://yoursite.com/images/package-a.jpg
   PACKAGE_IMAGE_PACKAGE_B=https://yoursite.com/images/package-b.jpg
   PACKAGE_IMAGE_PACKAGE_C=https://yoursite.com/images/package-c.jpg
   PACKAGE_IMAGE_PACKAGE_D=https://yoursite.com/images/package-d.jpg
   PACKAGE_IMAGE_PACKAGE_E=https://yoursite.com/images/package-e.jpg
   PACKAGE_IMAGE_PACKAGE_F=https://yoursite.com/images/package-f.jpg
   PACKAGE_IMAGE_PACKAGE_G=https://yoursite.com/images/package-g.jpg
   PACKAGE_IMAGE_PACKAGE_I=https://yoursite.com/images/package-i.jpg
   PACKAGE_IMAGE_PACKAGE_K=https://yoursite.com/images/package-k.jpg
   PACKAGE_IMAGE_CUSTOM=https://yoursite.com/images/custom-tour.jpg
   ```

3. **Restart the server** after changing `.env`.

### Package ↔ image mapping (in code)

| Package        | Env variable                   |
|----------------|---------------------------------|
| Package A      | `PACKAGE_IMAGE_PACKAGE_A`       |
| Package B      | `PACKAGE_IMAGE_PACKAGE_B`       |
| Package C      | `PACKAGE_IMAGE_PACKAGE_C`       |
| Package D      | `PACKAGE_IMAGE_PACKAGE_D`       |
| Package E      | `PACKAGE_IMAGE_PACKAGE_E`       |
| Package F      | `PACKAGE_IMAGE_PACKAGE_F`       |
| Package G      | `PACKAGE_IMAGE_PACKAGE_G`       |
| Package I      | `PACKAGE_IMAGE_PACKAGE_I`       |
| Package K      | `PACKAGE_IMAGE_PACKAGE_K`       |
| Custom Tour    | `PACKAGE_IMAGE_CUSTOM`         |

---

## 2. Company logo (Checkout + emails)

- **Stripe Checkout:** Logo is shown as the **second image** under the package image (if the logo URL is valid HTTPS).
- **Emails:** Logo is shown at the top of the customer confirmation email.

### Setup

1. **Add `logo.png`** in the `travel-website` folder (same folder as `index.html`).  
   You can copy from `New Logo.png` or `LatestKembojaLogo.png` and rename to `logo.png`, or use your own file named `logo.png`.

2. **Local:** The app serves static files from the project root, so the logo is at `http://localhost:3000/logo.png`. No extra config.

3. **Production:** Either:
   - Serve `logo.png` from your site root and set `DOMAIN_URL` (e.g. `https://yoursite.com`), or  
   - Set a full URL in `.env`:
     ```env
     LOGO_URL=https://yoursite.com/logo.png
     ```
   For **Stripe Checkout**, the logo URL **must be HTTPS** or it will not be shown on the payment page.

---

## 3. Production email (fix “no network connection” when deployed)

Gmail often fails in production (blocked ports, “no network connection”, or security blocks). Use a transactional email provider instead.

### Recommended: SendGrid

1. Sign up: [sendgrid.com](https://sendgrid.com).
2. **Settings → API Keys** → Create API Key (full access or “Mail Send”).
3. **Sender Authentication:** Verify a single sender (e.g. `noreply@yoursite.com` or your Gmail).
4. In your **production** env (e.g. Netlify/Vercel/host), set:
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx
   EMAIL_FROM=noreply@yoursite.com
   COMPANY_EMAIL=kembojajuaratravels@gmail.com
   ```
5. Remove or do not set `EMAIL_PASSWORD` in production so the app uses SendGrid instead of Gmail.

The server already uses SendGrid when `SENDGRID_API_KEY` is set.

### Alternative: AWS SES

1. In AWS: **SES → Verified identities** (verify your sender email or domain).
2. Create **SMTP credentials** (SES → SMTP settings).
3. In production env:
   ```env
   AWS_SES_ACCESS_KEY=your_smtp_username
   AWS_SES_SECRET_KEY=your_smtp_password
   AWS_SES_REGION=ap-southeast-1
   EMAIL_FROM=verified@yourdomain.com
   COMPANY_EMAIL=kembojajuaratravels@gmail.com
   ```

### Email priority

1. **SendGrid** – if `SENDGRID_API_KEY` is set.  
2. **AWS SES** – else if `AWS_SES_ACCESS_KEY` and `AWS_SES_SECRET_KEY` are set.  
3. **Gmail** – else (works locally; often fails in production).

---

## 4. Services and credentials checklist

| Purpose           | Service / item      | Credentials / setup |
|-------------------|---------------------|----------------------|
| Payments          | Stripe              | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` |
| Database          | PostgreSQL          | `DATABASE_URL` |
| Email (local)     | Gmail               | `EMAIL_USER`, `EMAIL_PASSWORD` (or `EMAIL_PASS`) |
| Email (production)| SendGrid or AWS SES | `SENDGRID_API_KEY` or `AWS_SES_*` + `EMAIL_FROM` |
| App URL           | Your domain         | `DOMAIN_URL` (e.g. `https://yoursite.com`) |
| Company inbox     | –                   | `COMPANY_EMAIL` (e.g. kembojajuaratravels@gmail.com) |
| Package images    | Optional            | `PACKAGE_IMAGE_PACKAGE_A` … (see above) |
| Logo              | Optional            | `LOGO_URL` or place `logo.png` and set `DOMAIN_URL` |

---

## 5. Testing checklist

### Stripe Checkout

- [ ] Selecting different packages shows the correct package image on the Stripe Checkout page.
- [ ] Company logo appears as the second image on Checkout (if `LOGO_URL` or `logo.png` is HTTPS).
- [ ] Left-side summary shows: customer name, package, transport, date, time, pax, amount.

### Emails (run a test booking)

- [ ] **Customer email**  
  - Subject: `Booking Confirmation - [Reference]`  
  - Contains logo, booking details, and “payment confirmed”.  
  - No QR code.
- [ ] **Company email** (kembojajuaratravels@gmail.com)  
  - Subject: `New Booking - [Reference]`  
  - Contains full customer and booking details.

### Success page

- [ ] Green “Chat on WhatsApp” button opens WhatsApp to +60196533699.
- [ ] Phone number +60196533699 is shown and clickable (`tel:` link).
- [ ] Line “Available: Monday - Sunday, 9:00 AM - 6:00 PM” is removed.

### Production (after deploy)

- [ ] Set `DOMAIN_URL` to your live URL.
- [ ] Set `SENDGRID_API_KEY` (or AWS SES) and `EMAIL_FROM`.
- [ ] Confirm `logo.png` (or `LOGO_URL`) is reachable over HTTPS.
- [ ] Run a test booking and confirm both customer and company emails are received.
- [ ] Stripe webhook URL in dashboard points to `https://yourdomain.com/api/webhook` and is working.

---

## 6. Quick reference – updated code files

| File               | Changes |
|--------------------|--------|
| `server-stripe.js` | Package image map; logo in Checkout; booking summary in line item description; email transporter (Gmail / SendGrid / SES); customer email: subject, logo, no QR; company email: subject “New Booking - [Ref]”. |
| `success.html`     | WhatsApp button (green), clickable phone, removed hours line and QR references. |

If you need to change package names or add new packages, update the `PACKAGE_IMAGES` object and any new `PACKAGE_IMAGE_*` env vars accordingly.
