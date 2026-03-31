const path = require('path');
const fs = require('fs');
// Load .env from same directory as this script (mail config: EMAIL_USER, EMAIL_PASS, EMAIL_TO, EMAIL_SERVICE)
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const DOMAIN_URL = process.env.DOMAIN_URL || 'http://localhost:3000';

// Package image URLs for Stripe Checkout (match booking form package cards in index.html)
// Override via env e.g. PACKAGE_IMAGE_PACKAGE_A=https://yoursite.com/img/package-a.jpg
const PACKAGE_IMAGES = {
    'Package A': process.env.PACKAGE_IMAGE_PACKAGE_A || 'https://img2.penangpropertytalk.com/wp-content/uploads/2024/07/fortcornwallis-1.jpg',
    'Package B': process.env.PACKAGE_IMAGE_PACKAGE_B || 'https://cdn.tatlerasia.com/tatlerasia/i/2021/11/11173230-123742590-500497978016363-4094686581571688722-n_cover_1080x810.jpg',
    'Package C': process.env.PACKAGE_IMAGE_PACKAGE_C || 'https://static.wixstatic.com/media/ed89ba_2ce2a6fb16a34eb1863f6541f8b45b78~mv2.png/v1/fill/w_534,h_316,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ed89ba_2ce2a6fb16a34eb1863f6541f8b45b78~mv2.png',
    'Package D': process.env.PACKAGE_IMAGE_PACKAGE_D || 'https://malaysiatravel-assets.s3.amazonaws.com/images/20200408-to6fd-genting-highland-jpg',
    'Package E': process.env.PACKAGE_IMAGE_PACKAGE_E || 'https://onpenang.com/wp-content/uploads/2024/10/Orangutan-Island-Bukit-Merah-1.jpg',
    'Package F': process.env.PACKAGE_IMAGE_PACKAGE_F || 'https://www.travel-penang-malaysia.com/images/batu-ferringhi-beach-penang.jpg',
    'Package G': process.env.PACKAGE_IMAGE_PACKAGE_G || 'https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2023/11/several-airasia-aircraft-parked-at-kuala-lumpur-international-airport-terminal-2-yanatul-1.jpg',
    'Package I': process.env.PACKAGE_IMAGE_PACKAGE_I || 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/d7/cb/5b.jpg',
    'Package K': process.env.PACKAGE_IMAGE_PACKAGE_K || 'https://mypenang.gov.my/uploads/directory/1405/cover/PENANG-BRIDGE.jpg',
};

// Full display names for all packages (Stripe checkout + emails)
const PACKAGE_FULL_NAMES = {
    'Package A': 'Package A - Penang Heritage Discovery',
    'Package B': 'Package B - Penang 1-Day Itinerary',
    'Package C': 'Package C - 3D2N Cameron Highlands Tour',
    'Package D': 'Package D - 2D1N Genting Highlands Package',
    'Package E': 'Package E - 1-Day Bukit Merah Tour',
    'Package F': 'Package F - Water Activities Package – Batu Feringgi Beach',
    'Package G': 'Package G - Airport Transfer',
    'Package I': 'Package I - Penang 2-Day Itinerary',
    'Package K': 'Package K - Customized Package',
};
function getPackageFullName(tourType) {
    return PACKAGE_FULL_NAMES[tourType] || tourType;
}

// Full description = auto-filled + optional notes (Stripe metadata max 500 chars per key, so we use two keys)
function getFullDescription(metadata) {
    const d1 = metadata.description || '';
    const d2 = metadata.description_2 || '';
    const full = (d1 + d2).trim();
    return full === '' || full === 'N/A' ? '' : full;
}

// Company logo for Stripe Checkout (under package image). Use New Logo.png.
const LOGO_URL_CHECKOUT = process.env.LOGO_URL || (DOMAIN_URL + '/New%20Logo.png');

// Supabase database – DATABASE_URL only (no local PostgreSQL). Pooling via Supabase pooler (port 6543).
const databaseUrl = (process.env.DATABASE_URL || '').trim();
const pool = databaseUrl
    ? new Pool({
          connectionString: databaseUrl,
          ssl: { rejectUnauthorized: false },
          max: 10,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000
      })
    : null;

// Middleware
app.use(cors());
app.use(express.static('.'));

// IMPORTANT: Raw body for webhook signature verification
app.post('/api/webhook', express.raw({type: 'application/json'}), handleStripeWebhook);

// JSON parsing for other routes
app.use(express.json());

// Health: DB + email (single server on port 3000 = Stripe + legacy /api/book, /api/test-email)
app.get('/api/health', async (req, res) => {
    const dbOk = await testDatabaseConnection();
    res.json({
        status: 'ok',
        database: dbOk ? 'connected' : 'disconnected',
        message: dbOk ? 'Supabase database is working' : 'DATABASE_URL missing or connection failed',
        emailConfig: {
            service: emailConfig.service,
            user: emailConfig.user ? 'configured' : 'missing',
            to: emailConfig.to
        }
    });
});
app.get('/api/db-test', async (req, res) => {
    if (!pool) {
        return res.status(503).json({ ok: false, error: 'DATABASE_URL not set' });
    }
    try {
        const r = await pool.query('SELECT current_database() as db, current_timestamp as time');
        res.json({
            ok: true,
            database: r.rows[0].db,
            time: r.rows[0].time,
            message: 'Supabase database connection is working'
        });
    } catch (err) {
        res.status(503).json({ ok: false, error: err.message });
    }
});

// Mail config from .env: EMAIL_USER, EMAIL_PASS, EMAIL_TO, EMAIL_SERVICE
const emailUser = (process.env.EMAIL_USER || '').trim();
const emailPass = (process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || '').trim();
const emailConfigured = !!(emailUser && emailPass);

if (!emailConfigured) {
    console.warn('⚠️ Email not configured. In .env set: EMAIL_USER, EMAIL_PASS, EMAIL_TO, EMAIL_SERVICE=gmail');
} else {
    console.log('📧 Mail config loaded from .env (user:', emailUser.substring(0, 5) + '***', ', pass length:', emailPass.length, ')');
}

// Email transporter: Gmail (local) or SendGrid/SES (production)
function getEmailTransporter() {
    // Production: SendGrid (recommended – works from any host)
    if (process.env.SENDGRID_API_KEY) {
        return nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY,
            },
        });
    }
    // Production: AWS SES
    if (process.env.AWS_SES_ACCESS_KEY && process.env.AWS_SES_SECRET_KEY) {
        return nodemailer.createTransport({
            host: process.env.AWS_SES_REGION ? `email-smtp.${process.env.AWS_SES_REGION}.amazonaws.com` : 'email-smtp.ap-southeast-1.amazonaws.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.AWS_SES_ACCESS_KEY,
                pass: process.env.AWS_SES_SECRET_KEY,
            },
        });
    }
    // Default: Gmail (works locally; use App Password, not account password)
    if (!emailUser || !emailPass) {
        console.warn('⚠️ Gmail transporter: EMAIL_USER or EMAIL_PASS missing. Emails will fail until .env is updated.');
    }
    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });
}
const transporter = getEmailTransporter();

// Logo in emails: embed as base64 in HTML so there is no attachment (image is inside the email body)
function getEmailLogoAttachment() {
    const logoPath = path.join(__dirname, 'LatestKembojaLogo.png');
    if (fs.existsSync(logoPath)) {
        const base64 = fs.readFileSync(logoPath).toString('base64');
        return { attachments: [], logoSrc: 'data:image/png;base64,' + base64 };
    }
    return {
        attachments: [],
        logoSrc: (process.env.CUSTOMER_EMAIL_LOGO_URL || DOMAIN_URL + '/LatestKembojaLogo.png')
    };
}

// Email config for /api/book and /api/test-email (same as server.js)
const emailConfig = {
    user: emailUser,
    to: process.env.EMAIL_TO || emailUser,
    service: process.env.EMAIL_SERVICE || 'gmail',
    configured: emailConfigured,
};

// Company email HTML (legacy /api/book)
function createEmailContent(bookingData) {
    let calculatedPrice = '';
    if (bookingData.tourType === 'Package F') {
        const basePrice = 35;
        const n = parseInt(bookingData.people) || 1;
        calculatedPrice = `<p><strong>💰 Calculated Price:</strong> RM ${basePrice} × ${n} person(s) = <strong>RM ${basePrice * n}</strong></p>`;
    }
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">🎉 New Booking Request</h1>
                <p style="margin: 10px 0 0 0;">Kemboja Juara Travels</p>
            </div>
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #3b82f6;">📋 Booking Details</h2>
                <p><strong>Full Name:</strong> ${bookingData.fullName}</p>
                <p><strong>Nationality:</strong> ${bookingData.nationality}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Phone:</strong> ${bookingData.phone}</p>
                <p><strong>Tour Type:</strong> ${bookingData.tourType}</p>
                <p><strong>Travel Date:</strong> ${bookingData.travelDate}</p>
                <p><strong>Travel Time:</strong> ${bookingData.travelTime}</p>
                <p><strong>Number of People:</strong> ${bookingData.people}</p>
                ${calculatedPrice}
                ${bookingData.description ? `<p><strong>📝 Description:</strong><br>${bookingData.description}</p>` : ''}
            </div>
        </div>`;
}

// Customer confirmation HTML (legacy /api/book)
function createCustomerConfirmationEmail(bookingData) {
    let calculatedPrice = '';
    if (bookingData.tourType === 'Package F') {
        const basePrice = 35;
        const n = parseInt(bookingData.people) || 1;
        calculatedPrice = `<p><strong>💰 Total Price:</strong> RM ${basePrice} × ${n} person(s) = <strong>RM ${basePrice * n}</strong></p>`;
    }
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0;">✅ Booking Confirmation</h1>
                <p style="margin: 10px 0 0 0;">Kemboja Juara Travels</p>
            </div>
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
                <p>Dear ${bookingData.fullName},</p>
                <p>We have received your booking request and will contact you within 24 hours.</p>
                <h3>📋 Your Booking Summary</h3>
                <p><strong>Tour Type:</strong> ${bookingData.tourType}</p>
                <p><strong>Travel Date:</strong> ${bookingData.travelDate}</p>
                <p><strong>Travel Time:</strong> ${bookingData.travelTime}</p>
                <p><strong>Number of People:</strong> ${bookingData.people}</p>
                ${calculatedPrice}
                ${bookingData.description ? `<p><strong>Your notes:</strong> ${bookingData.description}</p>` : ''}
            </div>
        </div>`;
}

// Legacy /api/book (email-only booking, no Stripe) – same behavior as server.js
app.post('/api/book', async (req, res) => {
    try {
        if (!emailConfig.configured) {
            return res.status(503).json({
                success: false,
                message: 'Email is not configured. Set EMAIL_USER and EMAIL_PASS in .env and restart the server.',
            });
        }
        const bookingData = req.body;
        const required = ['fullName', 'email', 'phone', 'nationality', 'people', 'travelDate', 'tourType'];
        for (const field of required) {
            if (!bookingData[field]) {
                return res.status(400).json({ success: false, message: `Missing required field: ${field}` });
            }
        }
        const fromEmail = process.env.EMAIL_FROM || emailConfig.user || 'noreply@localhost';
        const companyMail = {
            from: `"Kemboja Juara Travels" <${fromEmail}>`,
            to: emailConfig.to,
            subject: `New Booking Request - ${bookingData.fullName} - ${bookingData.tourType}`,
            html: createEmailContent(bookingData)
        };
        const customerMail = {
            from: `"Kemboja Juara Travels" <${fromEmail}>`,
            to: bookingData.email,
            subject: `Booking Confirmation - ${bookingData.tourType} - Kemboja Juara Travels`,
            html: createCustomerConfirmationEmail(bookingData)
        };
        const [companyResult, customerResult] = await Promise.all([
            transporter.sendMail(companyMail),
            transporter.sendMail(customerMail)
        ]);
        console.log('✅ /api/book: company and customer emails sent');
        res.json({
            success: true,
            message: 'Booking submitted successfully! Confirmation email sent.',
            companyMessageId: companyResult.messageId,
            customerMessageId: customerResult.messageId
        });
    } catch (error) {
        console.error('❌ /api/book error:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to send booking emails' });
    }
});

// Email status (for debugging / health)
app.get('/api/email-status', (req, res) => {
    res.json({
        configured: emailConfig.configured,
        user: emailConfig.user ? `${emailConfig.user.substring(0, 3)}***` : null,
        to: emailConfig.to ? `${emailConfig.to.substring(0, 3)}***` : null,
        service: emailConfig.service,
        message: emailConfig.configured ? 'Email is configured and ready.' : 'Set EMAIL_USER and EMAIL_PASS in .env and restart.',
    });
});

// Legacy /api/test-email – same behavior as server.js
app.post('/api/test-email', async (req, res) => {
    try {
        if (!emailConfig.configured) {
            return res.status(503).json({
                success: false,
                message: 'Email is not configured. Set EMAIL_USER and EMAIL_PASS in .env and restart the server.',
            });
        }
        const testData = {
            fullName: 'Test User',
            email: req.body?.email || 'test@example.com',
            phone: '1234567890',
            nationality: 'Malaysian',
            people: '2',
            travelDate: '2024-01-15',
            travelTime: '9:00 AM',
            tourType: 'Test Tour',
            description: 'Test booking confirmation email.'
        };
        const fromEmail = process.env.EMAIL_FROM || emailConfig.user || 'noreply@localhost';
        const [companyResult, customerResult] = await Promise.all([
            transporter.sendMail({
                from: `"Kemboja Juara Travels" <${fromEmail}>`,
                to: emailConfig.to,
                subject: `Test Company Notification - ${testData.fullName}`,
                html: createEmailContent(testData)
            }),
            transporter.sendMail({
                from: `"Kemboja Juara Travels" <${fromEmail}>`,
                to: testData.email,
                subject: 'Test Customer Confirmation - Kemboja Juara Travels',
                html: createCustomerConfirmationEmail(testData)
            })
        ]);
        console.log('✅ /api/test-email: test emails sent');
        res.json({
            success: true,
            message: `Test emails sent. Company: ${emailConfig.to}, Customer: ${testData.email}`,
            companyMessageId: companyResult.messageId,
            customerMessageId: customerResult.messageId
        });
    } catch (error) {
        console.error('❌ /api/test-email error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ====================
// CREATE STRIPE CHECKOUT SESSION
// ====================
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            nationality,
            people,
            travelDate,
            travelTime,
            tourType,
            transportation,
            airportRoute,
            tourDays,
            paymentAmount,
            description,
            waterSportsActivities,
            selectedPlaces,
            packageImageUrl: bodyPackageImageUrl
        } = req.body;

        // Validate required fields
        if (!fullName || !email || !phone || !tourType || !paymentAmount) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required booking information' 
            });
        }

        // Extract numeric amount from "RM XXX" format
        const amountString = paymentAmount.replace(/[^\d.]/g, '');
        const amount = parseFloat(amountString);

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid payment amount' 
            });
        }

        // Convert to cents for Stripe (MYR)
        const amountInCents = Math.round(amount * 100);

        // Booking summary for Stripe Checkout (full package name)
        const packageDisplayName = getPackageFullName(tourType);
        const bookingSummary = [
            `Customer: ${fullName}`,
            `Package: ${packageDisplayName}`,
            `Transport: ${transportation || 'N/A'}`,
            `Date: ${travelDate || 'TBD'}`,
            `Time: ${travelTime || 'TBD'}`,
            `Pax: ${people || '1'}`,
            `Amount: RM ${amount.toFixed(2)}`,
        ].join(' • ');
        const fullDescriptionForCheckout = description ? String(description).trim() : '';
        const checkoutLineDescription = fullDescriptionForCheckout
            ? bookingSummary + '\n\n' + fullDescriptionForCheckout.substring(0, 500)
            : bookingSummary;

        // Package image: from request (booking form) or server map. Then company logo.
        const packageImageUrl = (bodyPackageImageUrl && typeof bodyPackageImageUrl === 'string' && bodyPackageImageUrl.startsWith('http'))
            ? bodyPackageImageUrl
            : (PACKAGE_IMAGES[tourType] || PACKAGE_IMAGES['Package A']);
        const checkoutImages = [packageImageUrl];
        try {
            const logoUrl = new URL(LOGO_URL_CHECKOUT);
            if (logoUrl.protocol === 'https:') checkoutImages.push(LOGO_URL_CHECKOUT);
        } catch (_) {
            if (LOGO_URL_CHECKOUT.startsWith('http')) checkoutImages.push(LOGO_URL_CHECKOUT);
        }

        // Prepare metadata (Stripe metadata values max 500 chars each; use description + description_2 for full text)
        const fullDescription = description ? String(description).trim() : '';
        const description_1 = fullDescription ? fullDescription.substring(0, 500) : 'N/A';
        const description_2 = fullDescription.length > 500 ? fullDescription.substring(500, 1000) : '';
        const selectedPlacesText = (tourType === 'Package K' && selectedPlaces)
            ? String(selectedPlaces).substring(0, 500)
            : (tourType === 'Package K' && fullDescription ? fullDescription.substring(0, 500) : '');
        const metadata = {
            package_name: tourType,
            transportation_type: transportation || 'N/A',
            travel_date: travelDate || 'TBD',
            travel_time: travelTime || 'TBD',
            pax_count: people || '1',
            customer_name: fullName,
            customer_email: email,
            customer_phone: phone,
            nationality: nationality || 'N/A',
            airport_route: airportRoute || 'N/A',
            tour_days: tourDays || 'N/A',
            description: description_1,
            water_sports: waterSportsActivities || 'N/A'
        };
        if (description_2) metadata.description_2 = description_2;
        if (selectedPlacesText) metadata.selected_places = selectedPlacesText;

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'fpx'], // FPX for Malaysian online banking
            line_items: [
                {
                    price_data: {
                        currency: 'myr',
                        product_data: {
                            name: packageDisplayName,
                            description: checkoutLineDescription,
                            images: checkoutImages,
                        },
                        unit_amount: amountInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${DOMAIN_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN_URL}/cancel.html`,
            customer_email: email,
            metadata: metadata,
            billing_address_collection: 'auto',
            phone_number_collection: {
                enabled: true,
            },
        });

        res.json({ 
            success: true,
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create payment session',
            details: error.message 
        });
    }
});

// ====================
// CONFIRM BOOKING EMAIL (success-page fallback when webhook is not reachable, e.g. local dev)
// GET /api/confirm-booking-email?session_id=cs_xxx
// ====================
app.get('/api/confirm-booking-email', async (req, res) => {
    const sessionId = (req.query.session_id || '').trim();
    if (!sessionId) {
        return res.status(400).json({ ok: false, error: 'Missing session_id' });
    }
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: [] });
        if (!session || session.payment_status !== 'paid') {
            return res.status(400).json({ ok: false, error: 'Session not found or payment not completed' });
        }
        const { bookingReference, alreadyExisted } = await saveBookingToDatabase(session);
        let emailSent = false;
        if (!alreadyExisted && emailConfig.configured) {
            await sendCustomerConfirmationEmail(session, bookingReference);
            await sendCompanyNotificationEmail(session, bookingReference);
            emailSent = true;
            console.log('✅ Confirmation emails sent from success-page fallback for session:', sessionId);
        }
        res.json({ ok: true, emailSent, bookingReference });
    } catch (err) {
        console.error('❌ /api/confirm-booking-email error:', err.message);
        res.status(500).json({ ok: false, error: err.message });
    }
});

// ====================
// STRIPE WEBHOOK HANDLER
// ====================
async function handleStripeWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('⚠️  Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('✅ Payment successful for session:', session.id);

        try {
            const { bookingReference, alreadyExisted } = await saveBookingToDatabase(session);
            if (alreadyExisted) {
                console.log('✅ Booking already processed (idempotent):', bookingReference);
            } else {
                if (emailConfig.configured) {
                    await sendCustomerConfirmationEmail(session, bookingReference);
                    await sendCompanyNotificationEmail(session, bookingReference);
                    console.log('✅ Booking emails sent to customer and company');
                } else {
                    console.warn('⚠️ Email not configured – skipping confirmation emails. Set EMAIL_USER and EMAIL_PASS in .env.');
                }
                console.log('✅ Booking processed successfully:', bookingReference);
            }
        } catch (error) {
            console.error('❌ Error processing booking:', error);
        }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({received: true});
}

// ====================
// SAVE BOOKING TO DATABASE
// Returns { bookingReference, alreadyExisted } so callers can avoid sending duplicate emails.
// ====================
async function saveBookingToDatabase(session) {
    const metadata = session.metadata;
    const bookingReference = `KJ${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    if (pool) {
        const existing = await pool.query(
            'SELECT booking_reference FROM bookings WHERE stripe_session_id = $1',
            [session.id]
        );
        if (existing.rows.length > 0) {
            return { bookingReference: existing.rows[0].booking_reference, alreadyExisted: true };
        }
    }

    const query = `
        INSERT INTO bookings (
            booking_reference,
            stripe_session_id,
            stripe_payment_intent,
            customer_name,
            customer_email,
            customer_phone,
            nationality,
            pax_count,
            package_name,
            transportation_type,
            airport_route,
            tour_days,
            travel_date,
            travel_time,
            description,
            water_sports_activities,
            payment_amount,
            payment_currency,
            payment_status,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW())
        RETURNING booking_id, booking_reference
    `;
    const values = [
        bookingReference,
        session.id,
        session.payment_intent,
        metadata.customer_name,
        metadata.customer_email,
        metadata.customer_phone,
        metadata.nationality,
        parseInt(metadata.pax_count),
        metadata.package_name,
        metadata.transportation_type,
        metadata.airport_route,
        metadata.tour_days,
        metadata.travel_date,
        metadata.travel_time,
        getFullDescription(metadata) || metadata.description || 'N/A',
        metadata.water_sports,
        session.amount_total / 100,
        session.currency.toUpperCase(),
        'completed'
    ];

    if (!pool) {
        console.warn('⚠️ DATABASE_URL not set – booking not saved to database');
        return { bookingReference, alreadyExisted: false };
    }
    const result = await pool.query(query, values);
    return { bookingReference: result.rows[0].booking_reference, alreadyExisted: false };
}

// ====================
// SEND CUSTOMER CONFIRMATION EMAIL
// ====================
async function sendCustomerConfirmationEmail(session, bookingReference) {
    const metadata = session.metadata;
    const fromEmail = (process.env.EMAIL_FROM || emailConfig.user || '').trim();
    if (!fromEmail) {
        console.warn('⚠️ Cannot send customer email: EMAIL_USER not set in .env');
        return;
    }
    const { attachments: logoAttachments, logoSrc } = getEmailLogoAttachment();

    const mailOptions = {
        from: `"Kemboja Juara Travels" <${fromEmail}>`,
        to: metadata.customer_email,
        subject: `Booking Confirmation - ${bookingReference}`,
        attachments: logoAttachments,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 24px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 28px 24px; text-align: center; border-radius: 10px 10px 0 0; }
                    .header h1 { margin: 0 0 8px 0; font-size: 1.75rem; }
                    .header p { margin: 0; font-size: 1rem; opacity: 0.95; }
                    .logo-wrap { background: #ffffff; text-align: center; padding: 16px 24px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
                    .logo-wrap img { display: block; max-width: 120px; width: 120px; height: auto; margin: 0 auto; }
                    .content { background: #f9fafb; padding: 28px 24px; border: 1px solid #e5e7eb; border-top: none; }
                    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
                    .booking-details h3 { margin: 0 0 16px 0; font-size: 1.1rem; color: #374151; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-row:last-child { border-bottom: none; }
                    .detail-label { font-weight: 600; color: #6b7280; flex-shrink: 0; margin-right: 12px; }
                    .detail-value { color: #1f2937; text-align: right; }
                    .footer { background: #1f2937; color: white; padding: 20px 24px; text-align: center; border-radius: 0 0 10px 10px; font-size: 0.9rem; }
                    .footer p { margin: 6px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Booking Confirmation</h1>
                        <p>Thank you for choosing Kemboja Juara Travels</p>
                    </div>
                    <div class="logo-wrap">
                        <img src="${logoSrc}" alt="Kemboja Juara Travels" width="120" style="display:block; max-width:120px; width:120px; height:auto; margin:0 auto; background:#fff;" />
                    </div>
                    <div class="content">
                        <p>Dear ${metadata.customer_name},</p>
                        <p>Your booking has been confirmed and <strong>payment has been received successfully.</strong></p>
                        <div class="booking-details">
                            <h3>Booking Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Booking Reference:</span>
                                <span class="detail-value"><strong>${bookingReference}</strong></span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Package:</span>
                                <span class="detail-value">${getPackageFullName(metadata.package_name)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Travel Date:</span>
                                <span class="detail-value">${metadata.travel_date} at ${metadata.travel_time}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Number of People:</span>
                                <span class="detail-value">${metadata.pax_count} person(s)</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Transportation:</span>
                                <span class="detail-value">${metadata.transportation_type}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Amount Paid:</span>
                                <span class="detail-value"><strong>RM ${(session.amount_total / 100).toFixed(2)}</strong></span>
                            </div>
                        </div>
                        ${getFullDescription(metadata) ? `
                        <div class="booking-details">
                            <h3>Booking details & notes</h3>
                            <div style="white-space: pre-wrap; word-break: break-word;">${String(getFullDescription(metadata)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                        </div>
                        ` : ''}
                        <div class="booking-details">
                            <h3>What's Next?</h3>
                            <p>• Our team will contact you within 24 hours to confirm final details.</p>
                            <p>• Please arrive 15 minutes before your scheduled time.</p>
                            <p>• Bring a valid ID and this confirmation email.</p>
                        </div>
                        <div style="text-align: center; margin: 20px 0;">
                            <p><strong>Need immediate assistance?</strong></p>
                            <p>Call/WhatsApp: <a href="tel:+60196533699" style="color: #3b82f6;">+60196533699</a></p>
                            <p>Email: <a href="mailto:kembojajuaratravels@gmail.com" style="color: #3b82f6;">kembojajuaratravels@gmail.com</a></p>
                        </div>
                    </div>
                    <div class="footer">
                        <p><strong>Kemboja Juara Travels</strong></p>
                        <p>18, Jalan Batu Ferringhi, 11100 Batu Ferringhi, Pulau Pinang</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Customer confirmation email sent to:', metadata.customer_email);
    } catch (err) {
        console.error('❌ Failed to send customer confirmation email:', err.message);
        throw err;
    }
}

// ====================
// SEND COMPANY NOTIFICATION EMAIL
// ====================
async function sendCompanyNotificationEmail(session, bookingReference) {
    const metadata = session.metadata;
    const fromEmail = process.env.EMAIL_FROM || emailConfig.user;
    if (!fromEmail) {
        console.warn('⚠️ Cannot send company email: EMAIL_USER not set');
        return;
    }
    const { attachments: logoAttachments, logoSrc } = getEmailLogoAttachment();

    const mailOptions = {
        from: `"Booking System" <${fromEmail}>`,
        to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER || 'kembojajuaratravels@gmail.com',
        subject: `New Booking - ${bookingReference}`,
        attachments: logoAttachments,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 700px; margin: 0 auto; padding: 20px; }
                    .header { background: #10b981; color: white; padding: 20px; text-align: center; }
                    .logo-wrap { background: #ffffff; text-align: center; padding: 12px 20px; border: 1px solid #e5e7eb; border-top: none; }
                    .logo-wrap img { display: block; max-width: 100px; width: 100px; height: auto; margin: 0 auto; }
                    .content { background: #f9fafb; padding: 20px; }
                    .booking-details { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 10px 0; }
                    .detail { padding: 8px 0; border-bottom: 1px dashed #e5e7eb; }
                    .label { font-weight: bold; color: #059669; display: inline-block; width: 180px; }
                    .value { color: #1f2937; }
                    .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🎯 NEW BOOKING RECEIVED</h2>
                        <p>Booking Reference: <strong>${bookingReference}</strong></p>
                    </div>
                    <div class="logo-wrap">
                        <img src="${logoSrc}" alt="Kemboja Juara Travels" width="100" style="display:block; max-width:100px; width:100px; height:auto; margin:0 auto; background:#fff;" />
                    </div>
                    <div class="content">
                        <div class="alert">
                            <strong>⏰ ACTION REQUIRED:</strong> Contact customer within 24 hours to confirm booking details.
                        </div>
                        
                        <div class="booking-details">
                            <h3>👤 Customer Information</h3>
                            <div class="detail">
                                <span class="label">Name:</span>
                                <span class="value">${metadata.customer_name}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Email:</span>
                                <span class="value">${metadata.customer_email}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Phone:</span>
                                <span class="value">${metadata.customer_phone}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Nationality:</span>
                                <span class="value">${metadata.nationality}</span>
                            </div>
                        </div>
                        
                        <div class="booking-details">
                            <h3>📦 Booking Information</h3>
                            <div class="detail">
                                <span class="label">Package:</span>
                                <span class="value"><strong>${getPackageFullName(metadata.package_name)}</strong></span>
                            </div>
                            <div class="detail">
                                <span class="label">Travel Date:</span>
                                <span class="value">${metadata.travel_date}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Travel Time:</span>
                                <span class="value">${metadata.travel_time}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Number of People:</span>
                                <span class="value">${metadata.pax_count} person(s)</span>
                            </div>
                            <div class="detail">
                                <span class="label">Transportation:</span>
                                <span class="value">${metadata.transportation_type}</span>
                            </div>
                            ${metadata.airport_route !== 'N/A' ? `
                            <div class="detail">
                                <span class="label">Airport Route:</span>
                                <span class="value">${metadata.airport_route}</span>
                            </div>
                            ` : ''}
                            ${metadata.tour_days !== 'N/A' ? `
                            <div class="detail">
                                <span class="label">Tour Days:</span>
                                <span class="value">${metadata.tour_days}</span>
                            </div>
                            ` : ''}
                            ${metadata.water_sports !== 'N/A' ? `
                            <div class="detail">
                                <span class="label">Water Sports:</span>
                                <span class="value">${metadata.water_sports}</span>
                            </div>
                            ` : ''}
                            ${metadata.selected_places ? `
                            <div class="detail">
                                <span class="label">Selected Places:</span>
                                <span class="value">${metadata.selected_places}</span>
                            </div>
                            ` : ''}
                        </div>
                        
                        <div class="booking-details">
                            <h3>💰 Payment Information</h3>
                            <div class="detail">
                                <span class="label">Amount Paid:</span>
                                <span class="value"><strong>RM ${(session.amount_total / 100).toFixed(2)}</strong></span>
                            </div>
                            <div class="detail">
                                <span class="label">Payment Status:</span>
                                <span class="value" style="color: #10b981;"><strong>✅ COMPLETED</strong></span>
                            </div>
                            <div class="detail">
                                <span class="label">Payment ID:</span>
                                <span class="value">${session.payment_intent}</span>
                            </div>
                            <div class="detail">
                                <span class="label">Stripe Session ID:</span>
                                <span class="value">${session.id}</span>
                            </div>
                        </div>
                        
                        ${getFullDescription(metadata) ? `
                        <div class="booking-details">
                            <h3>📝 Booking details & additional notes</h3>
                            <div style="white-space: pre-wrap; word-break: break-word;">${String(getFullDescription(metadata)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                        </div>
                        ` : ''}
                        
                        <div class="alert">
                            <p><strong>📋 Next Steps:</strong></p>
                            <ol>
                                <li>Review booking details above</li>
                                <li>Contact customer at ${metadata.customer_phone}</li>
                                <li>Confirm all arrangements and special requests</li>
                                <li>Assign driver and vehicle</li>
                                <li>Update internal booking system</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Company notification email sent');
    } catch (err) {
        console.error('❌ Failed to send company notification email:', err.message);
        throw err;
    }
}

// ====================
// DATABASE CONNECTION TEST
// ====================
async function testDatabaseConnection() {
    if (!pool) return false;
    try {
        await pool.query('SELECT 1');
        return true;
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        return false;
    }
}

// ====================
// DATABASE SCHEMA CREATION (CREATE TABLE IF NOT EXISTS – safe when table exists)
// ====================
async function createDatabaseSchema() {
    if (!pool) return;
    const tableSql = `
        CREATE TABLE IF NOT EXISTS bookings (
            booking_id SERIAL PRIMARY KEY,
            booking_reference VARCHAR(50) UNIQUE NOT NULL,
            stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
            stripe_payment_intent VARCHAR(255),
            customer_name VARCHAR(255) NOT NULL,
            customer_email VARCHAR(255) NOT NULL,
            customer_phone VARCHAR(50) NOT NULL,
            nationality VARCHAR(100),
            pax_count INTEGER NOT NULL,
            package_name VARCHAR(255) NOT NULL,
            transportation_type VARCHAR(100),
            airport_route VARCHAR(255),
            tour_days VARCHAR(50),
            travel_date DATE,
            travel_time TIME,
            description TEXT,
            water_sports_activities TEXT,
            payment_amount DECIMAL(10, 2) NOT NULL,
            payment_currency VARCHAR(10) NOT NULL,
            payment_status VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    const indexes = [
        'CREATE INDEX IF NOT EXISTS idx_booking_reference ON bookings(booking_reference)',
        'CREATE INDEX IF NOT EXISTS idx_customer_email ON bookings(customer_email)',
        'CREATE INDEX IF NOT EXISTS idx_travel_date ON bookings(travel_date)',
        'CREATE INDEX IF NOT EXISTS idx_payment_status ON bookings(payment_status)'
    ];
    try {
        await pool.query(tableSql);
        for (const sql of indexes) {
            try { await pool.query(sql); } catch (e) { /* index may already exist */ }
        }
        console.log('✅ Database schema created/verified');
    } catch (error) {
        console.error('❌ Error creating database schema:', error.message);
    }
}

// ====================
// START SERVER
// ====================
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`💳 Stripe integration active`);
    console.log(emailConfig.configured ? '📧 Email configured (booking & confirmation emails enabled)' : '⚠️ Email NOT configured – set EMAIL_USER and EMAIL_PASS in .env');
    console.log(`🔔 Webhook endpoint: /api/webhook`);
    if (databaseUrl) {
        const ok = await testDatabaseConnection();
        if (ok) {
            console.log(`🗄️ Supabase database connected`);
            await createDatabaseSchema();
        }
    } else {
        console.warn('⚠️ DATABASE_URL not set in .env – database disabled');
    }
});

module.exports = app;
