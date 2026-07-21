# The Burnish Company - Website

A professional, handcrafted website for custom leather goods and woodworking creations.

## 🎨 Features

- **Responsive Design**: Mobile-first approach that works on all devices
- **Modern Aesthetics**: Clean, elegant design with warm earth tones
- **Product Showcase**: Beautiful grid layout for displaying leather and woodworking items
- **Portfolio Section**: Featured work showcase
- **Contact Form**: Direct communication with customers
- **Smooth Animations**: Professional fade-in effects and transitions
- **Mobile Navigation**: Hamburger menu for smaller screens
- **SEO Optimized**: Semantic HTML and meta tags

## 📁 File Structure

```
theburnishcompany.com/
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete styling and responsive design
├── script.js           # Interactive features and functionality
└── README.md           # This file
```

## 🚀 Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Customize the content with your actual products and information

## 🎯 Sections

### Navigation
- Fixed header with smooth scrolling links
- Mobile hamburger menu
- Active link indicator

### Hero Section
- Eye-catching banner with call-to-action
- Gradient background with subtle pattern

### Products
- 6 product categories with descriptions and pricing
- Icon-based visual representation
- Hover effects for interactivity

### About
- Company story and philosophy
- Feature highlights
- Brand values showcase

### Portfolio
- Featured work display
- Project descriptions
- Professional presentation

### Contact
- Contact form for inquiries
- Business information
- Social media links

## 🎨 Color Palette

- **Primary**: #3d2817 (Dark Brown)
- **Secondary**: #8b6f47 (Medium Brown)
- **Accent**: #d4af37 (Gold)
- **Light Background**: #f5f3f0 (Off-white)

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: Below 768px

## ✨ Customization Guide

### Update Company Information
Edit these sections in `index.html`:
- Logo and company name in navbar
- Contact email and phone
- Social media links in footer

### Add Your Products
Modify the product cards in the Products section with:
- Custom product names
- Detailed descriptions
- Your pricing

### Update Colors
Change CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3d2817;
    --secondary-color: #8b6f47;
    --accent-color: #d4af37;
    /* ... more variables */
}
```

### Add Images
Replace placeholder icons with actual images:
```html
<div class="product-image">
    <img src="your-image.jpg" alt="Product Name">
</div>
```

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Contact Form Integration

The contact form currently logs to the browser console. To make it functional:

1. **Backend Option**: Connect to a backend service
2. **Email Service**: Use Formspree, EmailJS, or similar
3. **CMS**: Integrate with WordPress, Shopify, etc.

Example with Formspree:
```javascript
// Update form action in HTML
<form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

## 🚀 Deployment Options

- **GitHub Pages**: Free hosting directly from GitHub
- **Netlify**: Simple deployment with form handling
- **Vercel**: Optimized for modern web apps
- **Traditional Hosting**: FTP/cPanel with any host

## 📊 Performance Optimization

- Minified CSS and JavaScript
- Smooth animations using CSS transforms
- Lazy loading support for images
- Mobile-first responsive design

## 🔐 Security Notes

- Form validation on client-side
- Use HTTPS when deployed
- Keep dependencies updated
- Sanitize user inputs on backend

## 📄 License

Feel free to use and modify this website for The Burnish Company.

## 📞 Support

For questions or customization needs, refer to the inline code comments or reach out to web support services.

---

**Created for**: The Burnish Company  
**Last Updated**: 2026  
**Version**: 1.0