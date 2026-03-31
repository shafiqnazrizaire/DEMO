# Kemboja Juara Travels - Premium Tour & Travel Website

A complete, responsive, and premium-quality tour & travel company website built with HTML, CSS, and JavaScript.

## 🌟 Features

### 🎨 Design & UI/UX
- **Premium Design**: Clean, modern, and elegant white and blue color theme
- **Smooth Animations**: Hover effects, transitions, and dynamic interactions
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Island-Style Navigation**: Dynamic navbar that transforms on scroll

### 🏠 Home Page
- **Full-Screen Video Background**: High-quality beach video with overlay
- **Call-to-Action**: Prominent "BOOK NOW" button linking to bookings
- **How to Book Section**: 3-step process with animated cards
- **Customer Satisfaction**: Statistics display (98% satisfaction, 1,200+ travelers)
- **Reviews Ticker**: Continuous horizontal scrolling customer reviews

### 📍 Places to Visit
- **20 Destinations**: Curated list of amazing travel destinations
- **Interactive Cards**: Click to view details, heart icon to add to favourites
- **Modal Popup**: Detailed view with description and Google Maps link
- **Favourites System**: Heart icons to save places to your list

### ❤️ Favourites Page
- **Personal Collection**: View all your saved places
- **Copy List Feature**: Copy all favourite place names to clipboard
- **Remove Functionality**: Easy removal with X buttons
- **Local Storage**: Favourites persist after page reload

### 📋 Bookings Page
- **Comprehensive Form**: All required fields with validation
- **Tour Packages**: Multiple package options (A, B, C, Custom)
- **Form Validation**: Email, phone, and required field validation
- **WhatsApp Integration**: Automatic redirect to WhatsApp after booking
- **Email Simulation**: Form data processing (ready for backend integration)

### ℹ️ About Us Page
- **Company Story**: History and mission information
- **Services Grid**: 4 service categories with icons
- **Professional Layout**: Clean typography and spacing

### 🦶 Footer
- **Social Media Links**: Facebook, Instagram, Twitter, TikTok
- **Quick Navigation**: Links to all pages
- **Contact Information**: Phone, email, address
- **Google Maps Integration**: Direct link to company location

## 🚀 How to Run

### Option 1: Direct File Opening
1. Navigate to the `travel-website` folder
2. Double-click on `index.html` to open in your default browser
3. The website will load immediately with all features working

### Option 2: Local Server (Recommended)
1. Open your terminal/command prompt
2. Navigate to the `travel-website` folder:
   ```bash
   cd C:\Users\Nazeem\travel-website
   ```
3. Start a local server:
   - **Python 3**: `python -m http.server 8000`
   - **Python 2**: `python -m SimpleHTTPServer 8000`
   - **Node.js**: `npx serve .`
   - **PHP**: `php -S localhost:8000`
4. Open your browser and go to `http://localhost:8000`

### Option 3: Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Vanilla JS for all functionality
- **Font Awesome**: Icons throughout the interface
- **Google Fonts**: Inter font family for typography

### Key Features
- **Single Page Application**: Smooth navigation without page reloads
- **Local Storage**: Persistent favourites data
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized images and efficient code

### File Structure
```
travel-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎯 How to Use

### Navigation
- **Desktop**: Use the top navigation bar
- **Mobile**: Tap the hamburger menu for mobile navigation
- **Scroll Effect**: Watch the navbar transform into an island-style bar

### Adding Favourites
1. Go to "Places to Visit"
2. Click the heart icon on any place card
3. The place will be added to your favourites
4. View your favourites in the "Favourites" page

### Making a Booking
1. Click "BOOK NOW" or go to "Bookings"
2. Fill out all required fields
3. Select your preferred tour package
4. Submit the form
5. You'll be redirected to WhatsApp with a pre-filled message

### Viewing Place Details
1. Go to "Places to Visit"
2. Click on any place card (not the heart icon)
3. A modal will open with:
   - Place image
   - Description
   - Google Maps link

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #1d4ed8;
    --accent-color: #ef4444;
}
```

### Adding More Places
Edit the `places` array in `script.js`:
```javascript
const places = [
    {
        id: 21,
        name: "Your New Place",
        image: "image-url.jpg",
        description: "Description here",
        mapLink: "https://maps.google.com/?q=Your+Place"
    }
    // ... more places
];
```

### Modifying Contact Information
Update the footer section in `index.html`:
```html
<p><i class="fas fa-phone"></i> Your Phone Number</p>
<p><i class="fas fa-envelope"></i> your@email.com</p>
```

## 📧 Email Integration

The booking form is ready for backend integration. To send actual emails:

1. Set up a backend server (Node.js, PHP, Python, etc.)
2. Configure an email service (SendGrid, Mailgun, AWS SES)
3. Update the `sendBookingEmail()` function in `script.js`
4. Replace the WhatsApp number with your actual number

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b82f6
- **Dark Blue**: #1d4ed8
- **White**: #ffffff
- **Gray**: #64748b
- **Dark Gray**: #1e293b

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Spacing
- **Container**: max-width 1200px
- **Padding**: 1rem, 2rem, 3rem
- **Margins**: Consistent spacing system

## 🚀 Performance Optimizations

- **Optimized Images**: Using Unsplash with size parameters
- **Minimal Dependencies**: Only Font Awesome and Google Fonts
- **Efficient CSS**: No unnecessary frameworks
- **Fast Loading**: Optimized JavaScript execution

## 📞 Support

If you encounter any issues or have questions:
1. Check browser console for errors
2. Ensure all files are in the same directory
3. Try using a local server instead of file:// protocol
4. Verify internet connection for external resources

## 🎉 Enjoy Your Travel Website!

The website is now ready to use with all features fully functional. You can:
- Navigate between pages
- Add places to favourites
- Fill out booking forms
- View place details
- Experience smooth animations
- Use on any device size

Happy travels! 🌍✈️
