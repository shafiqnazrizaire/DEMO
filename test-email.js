#!/usr/bin/env node

/**
 * Email Functionality Test Script
 * 1. Start server: npm start (or node server-stripe.js)
 * 2. Run this script: node test-email.js
 * 3. Check email status: GET http://localhost:3000/api/email-status
 * 4. Send test emails only: POST http://localhost:3000/api/test-email with body { "email": "your@email.com" }
 */

const http = require('http');

// Test booking data
const testBookingData = {
    fullName: "Test User",
    email: "test.user@example.com",
    phone: "+60 12-345 6789",
    nationality: "Malaysia",
    people: "2",
    travelDate: "2025-02-15",
    travelTime: "09:00",
    tourType: "Package A",
    description: "This is a test booking submission to verify email functionality"
};

console.log('🚀 Starting Email Functionality Test...\n');
console.log('📋 Test Booking Data:');
console.log(JSON.stringify(testBookingData, null, 2));
console.log('\n' + '='.repeat(60) + '\n');

// Use same port as server (default 3000 for server-stripe.js)
const PORT = process.env.PORT || 3000;

// Make the HTTP request
const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/api/book',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(testBookingData))
    }
};

const startTime = Date.now();

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const duration = Date.now() - startTime;
        console.log(`✅ Response received in ${duration}ms\n`);
        console.log('📊 Server Response:');
        console.log(`Status Code: ${res.statusCode}`);
        
        try {
            const jsonData = JSON.parse(data);
            console.log('\n📧 Response Details:');
            console.log(JSON.stringify(jsonData, null, 2));
            
            if (jsonData.success) {
                console.log('\n' + '✅'.repeat(30));
                console.log('✅ EMAIL TEST PASSED!');
                console.log('✅'.repeat(30));
                console.log('\n📊 Test Summary:');
                console.log(`✅ Company email sent to: ${jsonData.companyRecipients}`);
                console.log(`✅ Customer email sent to: ${jsonData.customerEmail}`);
                console.log(`✅ Response time: ${duration}ms`);
                console.log(`✅ Company Message ID: ${jsonData.companyMessageId}`);
                console.log(`✅ Customer Message ID: ${jsonData.customerMessageId}`);
                console.log('\n🎉 Both emails should arrive shortly!');
            } else {
                console.log('\n' + '❌'.repeat(30));
                console.log('❌ EMAIL TEST FAILED!');
                console.log('❌'.repeat(30));
                console.log(`\n❌ Error: ${jsonData.message}`);
                console.log(`❌ Details: ${jsonData.error}`);
            }
        } catch (parseError) {
            console.log('\n❌ Failed to parse response:');
            console.log(data);
        }
    });
});

req.on('error', (error) => {
    const duration = Date.now() - startTime;
    console.log(`❌ Request failed after ${duration}ms`);
    console.log(`❌ Error: ${error.message}`);
    console.log('\n⚠️  Make sure the server is running: npm start (or node server-stripe.js)');
    process.exit(1);
});

req.on('timeout', () => {
    req.destroy();
    const duration = Date.now() - startTime;
    console.log(`❌ Request timeout after ${duration}ms`);
    console.log('⚠️  Server might be unresponsive');
    process.exit(1);
});

req.setTimeout(10000);

// Send the request
req.write(JSON.stringify(testBookingData));
req.end();

console.log('📤 Sending test booking data...');
