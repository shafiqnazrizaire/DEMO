const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Load .env from same directory as this script (mail: EMAIL_USER, EMAIL_PASS, EMAIL_TO, EMAIL_SERVICE)
require('dotenv').config({ path: path.join(__dirname, '.env') });

const emailConfig = {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: (process.env.EMAIL_USER || '').trim(),
    pass: (process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || '').trim(),
    to: (process.env.EMAIL_TO || process.env.EMAIL_USER || '').trim()
};

// Validate email configuration
if (!emailConfig.user || !emailConfig.pass) {
    console.warn('⚠️ Email configuration not complete. Please set EMAIL_USER and EMAIL_PASS in .env file');
    console.warn('⚠️ Email functionality may not work properly.');
    console.warn('⚠️ Update .env file with your Gmail credentials');
} else {
    console.log('✅ Email configuration loaded successfully');
}

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware with production-ready CORS
app.use(cors({
    origin: [
        'http://localhost:8080',
        'http://localhost:3000',
        'https://kembojajuaratravels.com',
        'https://www.kembojajuaratravels.com',
        'https://kemboja-juara-travels.vercel.app',
        'https://kemboja-juara-travels.netlify.app',
        'https://kemboja-juara-travels.herokuapp.com',
        'https://kemboja-juara-travels.railway.app',
        'https://kemboja-juara-travels.onrender.com',
        /^https:\/\/.*\.vercel\.app$/,
        /^https:\/\/.*\.netlify\.app$/,
        /^https:\/\/.*\.herokuapp\.com$/,
        /^https:\/\/.*\.railway\.app$/,
        /^https:\/\/.*\.onrender\.com$/
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Handle preflight requests
app.options('*', cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(__dirname));

// Gmail SMTP Email Function - Original implementation
async function sendEmailWithGmail(mailOptions, retryCount = 0) {
    const maxRetries = 3;
    
    try {
        console.log(`📧 Sending email via Gmail SMTP (attempt ${retryCount + 1})...`);
        
        const result = await gmailTransporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully via Gmail SMTP:', result.messageId);
        
        return {
            id: result.messageId,
            messageId: result.messageId,
            status: 'sent'
        };
    } catch (error) {
        console.error(`❌ Gmail SMTP attempt ${retryCount + 1} failed:`, error.message);
        
        if (retryCount < maxRetries) {
            console.log(`🔄 Retrying email send (attempt ${retryCount + 1}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
            return await sendEmailWithGmail(mailOptions, retryCount + 1);
        } else {
            throw new Error(`Gmail SMTP email failed after ${maxRetries} retries: ${error.message}`);
        }
    }
}

// Legacy function for backward compatibility
function createEmailTransporter() {
    // Detect hosting platform for optimized settings
    const isVercel = process.env.VERCEL === '1';
    const isNetlify = process.env.NETLIFY === 'true';
    const isRailway = process.env.RAILWAY_ENVIRONMENT;
    const isHeroku = process.env.DYNO;
    const isRender = process.env.RENDER;
    
    console.log('🌐 Deployment environment detected:', {
        isVercel,
        isNetlify,
        isRailway,
        isHeroku,
        isRender,
        nodeEnv: process.env.NODE_ENV
    });

    // Primary Gmail transporter with platform-specific settings
    const gmailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailConfig.user,
            pass: emailConfig.pass
        },
        // Platform-specific host settings
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
        },
        // Optimized connection settings for hosting platforms
        connectionTimeout: isVercel || isNetlify ? 15000 : 30000,
        greetingTimeout: isVercel || isNetlify ? 10000 : 15000,
        socketTimeout: isVercel || isNetlify ? 15000 : 30000,
        // Pool settings optimized for serverless
        pool: !isVercel && !isNetlify, // Disable pooling for serverless
        maxConnections: isVercel || isNetlify ? 1 : 3,
        maxMessages: isVercel || isNetlify ? 10 : 50,
        rateDelta: isVercel || isNetlify ? 5000 : 10000,
        rateLimit: isVercel || isNetlify ? 1 : 3,
        // Debug settings
        debug: process.env.NODE_ENV === 'development',
        logger: process.env.NODE_ENV === 'development'
    });

    // Fallback transporter for hosting platforms
    const fallbackTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailConfig.user,
            pass: emailConfig.pass
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 20000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        // Serverless-optimized settings
        pool: false,
        maxConnections: 1,
        maxMessages: 5
    });

    // Simple SMTP transporter as ultimate fallback
    const simpleTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 25,
        secure: false,
        auth: {
            user: emailConfig.user,
            pass: emailConfig.pass
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 10000,
        greetingTimeout: 5000,
        socketTimeout: 10000
    });

    return { gmailTransporter, fallbackTransporter, simpleTransporter };
}

const { gmailTransporter, fallbackTransporter, simpleTransporter } = createEmailTransporter();

// Robust email sending function with multiple fallbacks
async function sendEmailWithFallback(mailOptions, retryCount = 0) {
    const maxRetries = 3;
    const transporters = [gmailTransporter, fallbackTransporter, simpleTransporter];
    
    for (let i = 0; i < transporters.length; i++) {
        try {
            console.log(`📧 Attempting to send email with transporter ${i + 1}...`);
            const result = await transporters[i].sendMail(mailOptions);
            console.log(`✅ Email sent successfully with transporter ${i + 1}:`, result.messageId);
            return result;
        } catch (error) {
            console.error(`❌ Transporter ${i + 1} failed:`, error.message);
            
            if (i === transporters.length - 1) {
                // All transporters failed, try retry logic
                if (retryCount < maxRetries) {
                    console.log(`🔄 Retrying email send (attempt ${retryCount + 1}/${maxRetries})...`);
                    await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
                    return await sendEmailWithFallback(mailOptions, retryCount + 1);
                } else {
                    throw new Error(`All email transporters failed after ${maxRetries} retries: ${error.message}`);
                }
            }
        }
    }
}

// Email template function for company notification
function createEmailContent(bookingData) {
    // Calculate price for Package F (Water Sports Adventure) based on number of people
    let calculatedPrice = '';
    if (bookingData.tourType === 'Package F') {
        const basePrice = 35; // RM 35 per person
        const numberOfPeople = parseInt(bookingData.people) || 1;
        const totalPrice = basePrice * numberOfPeople;
        calculatedPrice = `<p><strong>💰 Calculated Price:</strong> RM ${basePrice} × ${numberOfPeople} person(s) = <strong>RM ${totalPrice}</strong></p>`;
    }
    
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">🎉 New Booking Request</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Kemboja Juara Travels</p>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #3b82f6; margin-top: 0;">📋 Booking Details</h2>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #374151; margin-bottom: 10px;">👤 Customer Information</h3>
                    <p><strong>Full Name:</strong> ${bookingData.fullName}</p>
                    <p><strong>Nationality:</strong> ${bookingData.nationality}</p>
                    <p><strong>Email:</strong> ${bookingData.email}</p>
                    <p><strong>Phone:</strong> ${bookingData.phone}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #374151; margin-bottom: 10px;">🎯 Tour Information</h3>
                    <p><strong>Tour Type:</strong> ${bookingData.tourType}</p>
                    <p><strong>Travel Date:</strong> ${bookingData.travelDate}</p>
                    <p><strong>Travel Time:</strong> ${bookingData.travelTime}</p>
                    <p><strong>Number of People:</strong> ${bookingData.people}</p>
                    ${calculatedPrice}
                </div>
                
                ${bookingData.description ? `
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #374151; margin-bottom: 10px;">📝 Additional Description</h3>
                    <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
                        ${bookingData.description}
                    </p>
                </div>
                ` : ''}
                
                <div style="background-color: #f0f9ff; padding: 20px; border-radius: 10px; border: 1px solid #bae6fd;">
                    <h3 style="color: #0369a1; margin-top: 0;">⏰ Next Steps</h3>
                    <ul style="color: #374151;">
                        <li>Contact the customer within 24 hours</li>
                        <li>Confirm availability for the selected date and time</li>
                        <li>Provide detailed itinerary and pricing</li>
                        <li>Arrange payment and finalize booking</li>
                    </ul>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="color: #6b7280; margin: 0;">Best regards,<br><strong>Kemboja Juara Travels</strong></p>
                </div>
            </div>
        </div>
    `;
}

// Email template function for customer confirmation
function createCustomerConfirmationEmail(bookingData) {
    // Calculate price for Package F (Water Sports Adventure) based on number of people
    let calculatedPrice = '';
    if (bookingData.tourType === 'Package F') {
        const basePrice = 35; // RM 35 per person
        const numberOfPeople = parseInt(bookingData.people) || 1;
        const totalPrice = basePrice * numberOfPeople;
        calculatedPrice = `<p style="margin: 8px 0;"><strong>💰 Total Price:</strong> RM ${basePrice} × ${numberOfPeople} person(s) = <strong>RM ${totalPrice}</strong></p>`;
    }
    
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">✅ Booking Confirmation</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Kemboja Juara Travels</p>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #10b981; margin-top: 0;">Thank you for choosing us!</h2>
                    <p style="color: #6b7280; font-size: 16px;">Dear ${bookingData.fullName},</p>
                    <p style="color: #374151;">We have received your booking request and will contact you within 24 hours to confirm your tour details.</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #374151; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">📋 Your Booking Summary</h3>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                        <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${bookingData.fullName}</p>
                        <p style="margin: 8px 0;"><strong>🌍 Nationality:</strong> ${bookingData.nationality}</p>
                        <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${bookingData.email}</p>
                        <p style="margin: 8px 0;"><strong>📱 Phone:</strong> ${bookingData.phone}</p>
                        <p style="margin: 8px 0;"><strong>🎯 Tour Type:</strong> ${bookingData.tourType}</p>
                        <p style="margin: 8px 0;"><strong>📅 Travel Date:</strong> ${bookingData.travelDate}</p>
                        <p style="margin: 8px 0;"><strong>⏰ Travel Time:</strong> ${bookingData.travelTime}</p>
                        <p style="margin: 8px 0;"><strong>👥 Number of People:</strong> ${bookingData.people}</p>
                        ${calculatedPrice}
                    </div>
                </div>
                
                ${bookingData.description ? `
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #374151; margin-bottom: 10px;">📝 Your Special Requests</h3>
                    <p style="background-color: #fef3c7; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b; color: #92400e;">
                        ${bookingData.description}
                    </p>
                </div>
                ` : ''}
                
                <div style="background-color: #ecfdf5; padding: 20px; border-radius: 10px; border: 1px solid #a7f3d0;">
                    <h3 style="color: #047857; margin-top: 0;">⏰ What Happens Next?</h3>
                    <ul style="color: #374151; margin: 0; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">We will contact you within 24 hours to confirm availability</li>
                        <li style="margin-bottom: 8px;">Provide you with detailed itinerary and pricing information</li>
                        <li style="margin-bottom: 8px;">Answer any questions you may have about your tour</li>
                        <li style="margin-bottom: 8px;">Arrange payment and finalize your booking</li>
                    </ul>
                </div>
                
                <div style="background-color: #eff6ff; padding: 20px; border-radius: 10px; border: 1px solid #bfdbfe; margin-top: 20px;">
                    <h3 style="color: #1d4ed8; margin-top: 0;">📞 Contact Information</h3>
                    <p style="color: #374151; margin: 5px 0;"><strong>📧 Email:</strong> kembojajuaratravels@gmail.com</p>
                    <p style="color: #374151; margin: 5px 0;"><strong>📱 WhatsApp:</strong> <a href="https://wa.me/qr/N26FJ4YEI243E1" style="color: #1d4ed8;">Click here to chat with us</a></p>
                    <p style="color: #374151; margin: 5px 0;"><strong>📍 Location:</strong> Batu Ferringhi, Penang, Malaysia</p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="color: #6b7280; margin: 0;">We look forward to providing you with an amazing travel experience!</p>
                    <p style="color: #6b7280; margin: 10px 0 0 0;"><strong>Best regards,<br>Kemboja Juara Travels Team</strong></p>
                </div>
            </div>
        </div>
    `;
}

// Network connectivity check
async function checkNetworkConnectivity() {
    try {
        const https = require('https');
        return new Promise((resolve) => {
            const req = https.request({
                hostname: 'smtp.gmail.com',
                port: 587,
                timeout: 5000
            }, (res) => {
                resolve(true);
            });
            req.on('error', () => resolve(false));
            req.on('timeout', () => resolve(false));
            req.end();
        });
    } catch (error) {
        return false;
    }
}

// API endpoint for booking submissions
app.post('/api/book', async (req, res) => {
    try {
        // Check network connectivity first
        const isNetworkAvailable = await checkNetworkConnectivity();
        if (!isNetworkAvailable) {
            console.warn('⚠️ Network connectivity check failed, proceeding with email attempt...');
        }
        
        const bookingData = req.body;
        
        // Validate required fields
        const requiredFields = ['fullName', 'email', 'phone', 'nationality', 'people', 'travelDate', 'tourType'];
        for (let field of requiredFields) {
            if (!bookingData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }
        
        // Email options for company notification (ONLY to company emails)
        const companyMailOptions = {
            from: emailConfig.user,
            to: emailConfig.to, // Only company emails, no customer email
            subject: `New Booking Request - ${bookingData.fullName} - ${bookingData.tourType}`,
            html: createEmailContent(bookingData)
        };
        
        // Email options for customer confirmation
        const customerMailOptions = {
            from: emailConfig.user,
            to: bookingData.email,
            subject: `Booking Confirmation - ${bookingData.tourType} - Kemboja Juara Travels`,
            html: createCustomerConfirmationEmail(bookingData)
        };
        
        // Log email details for debugging
        console.log('📧 Sending emails...');
        console.log('📧 Booking data received:', JSON.stringify(bookingData, null, 2));
        console.log('📧 Customer email from form:', bookingData.email);
        console.log('📧 Company notification recipients (ONLY company):', emailConfig.to);
        console.log('📧 Customer confirmation email to:', bookingData.email);
        
        // Send emails to both company and customer with robust fallback system
        let companyInfo, customerInfo;
        
        try {
            console.log('📧 Starting email sending process...');
            console.time('⏱️ Email sending duration');
            
            // Send BOTH emails in PARALLEL for faster submission
            [companyInfo, customerInfo] = await Promise.all([
                sendEmailWithGmail(companyMailOptions),
                sendEmailWithGmail(customerMailOptions)
            ]);
            
            console.timeEnd('⏱️ Email sending duration');
            console.log('✅ Both emails sent successfully in parallel');
            
        } catch (emailError) {
            console.error('❌ Primary email sending failed, trying individual fallbacks...', emailError);
            
            // Individual fallback for each email
            try {
                companyInfo = await sendEmailWithGmail(companyMailOptions);
                console.log('✅ Company email sent with Gmail SMTP');
            } catch (companyError) {
                console.error('❌ Company email failed:', companyError);
                companyInfo = { messageId: 'company-failed', error: companyError.message };
            }
            
            try {
                customerInfo = await sendEmailWithGmail(customerMailOptions);
                console.log('✅ Customer email sent with Gmail SMTP');
            } catch (customerError) {
                console.error('❌ Customer email failed:', customerError);
                customerInfo = { messageId: 'customer-failed', error: customerError.message };
            }
            
            // If both failed, throw error
            if (companyInfo.messageId === 'company-failed' && customerInfo.messageId === 'customer-failed') {
                throw new Error(`Both email sending failed: Company - ${companyInfo.error}, Customer - ${customerInfo.error}`);
            }
        }
        
        console.log('✅ Company notification sent:', companyInfo.id || companyInfo.messageId);
        console.log('✅ Customer confirmation sent to', bookingData.email, ':', customerInfo.id || customerInfo.messageId);
        
        res.json({
            success: true,
            message: 'Booking submitted successfully! Confirmation email sent to your email address.',
            companyMessageId: companyInfo.id || companyInfo.messageId,
            customerMessageId: customerInfo.id || customerInfo.messageId,
            companyRecipients: emailConfig.to,
            customerEmail: bookingData.email
        });
        
    } catch (error) {
        console.error('❌ Error sending email:', error);
        console.error('❌ Error details:', {
            message: error.message,
            code: error.code,
            response: error.response,
            stack: error.stack
        });
        
        // Provide specific error messages based on error type
        let errorMessage = 'Failed to send booking confirmation email. Please try again or contact us directly.';
        let statusCode = 500;
        
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            errorMessage = 'Network connection issue. Please check your internet connection and try again.';
            statusCode = 503;
        } else if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed. Please contact support.';
            statusCode = 401;
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Email service timeout. Please try again in a few moments.';
            statusCode = 504;
        } else if (error.message.includes('network')) {
            errorMessage = 'Network connectivity issue. Please check your connection and try again.';
            statusCode = 503;
        }
        
        res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: error.message,
            code: error.code,
            timestamp: new Date().toISOString()
        });
    }
});

// Test endpoint to verify email functionality
app.post('/api/test-email', async (req, res) => {
    try {
        const testData = {
            fullName: 'Test User',
            email: req.body.email || 'test@example.com',
            phone: '1234567890',
            nationality: 'Malaysian',
            people: '2',
            travelDate: '2024-01-15',
            travelTime: '9:00 AM',
            tourType: 'Test Tour',
            description: 'This is a test booking confirmation email.'
        };

        // Test company notification
        const companyMailOptions = {
            from: emailConfig.user,
            to: emailConfig.to,
            subject: `Test Company Notification - ${testData.fullName} - ${testData.tourType}`,
            html: createEmailContent(testData)
        };

        const customerMailOptions = {
            from: emailConfig.user,
            to: testData.email,
            subject: `Test Customer Confirmation - Kemboja Juara Travels`,
            html: createCustomerConfirmationEmail(testData)
        };

        const [companyInfo, customerInfo] = await Promise.all([
            sendEmailWithGmail(companyMailOptions),
            sendEmailWithGmail(customerMailOptions)
        ]);
        
        console.log('✅ Test company email sent:', companyInfo.id || companyInfo.messageId);
        console.log('✅ Test customer email sent:', customerInfo.id || customerInfo.messageId);
        
        res.json({
            success: true,
            message: `Test emails sent successfully! Company notification to: ${emailConfig.to}. Customer confirmation to: ${testData.email}`,
            companyMessageId: companyInfo.id || companyInfo.messageId,
            customerMessageId: customerInfo.id || customerInfo.messageId,
            emailConfig: {
                service: emailConfig.service,
                user: emailConfig.user,
                to: emailConfig.to
            }
        });
        
    } catch (error) {
        console.error('❌ Test email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send test email',
            error: error.message,
            emailConfig: {
                service: emailConfig.service,
                user: emailConfig.user,
                to: emailConfig.to
            }
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        emailConfig: {
            service: emailConfig.service,
            user: emailConfig.user ? 'configured' : 'missing',
            to: emailConfig.to
        }
    });
});

// Serve static files
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.path === '/' ? 'index.html' : req.path);
    
    // Check if file exists
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.sendFile(filePath);
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`📧 Email functionality enabled - Auto-sending to customers and company`);
    console.log(`📨 Customer confirmation emails: ENABLED`);
    console.log(`📨 Company notification emails: ENABLED`);
    console.log(`🌐 Open your browser and navigate to: http://localhost:${PORT}/`);
    console.log(`⏹️  Press Ctrl+C to stop the server`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
        process.exit(0);
});

