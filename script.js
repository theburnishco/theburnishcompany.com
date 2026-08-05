// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Contact Form Submission (enhanced to include subject) =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();
        const subjectInput = document.getElementById('contact-subject');
        const subject = subjectInput ? subjectInput.value.trim() : '';
        
        // Replace this with your real send logic (POST to API, form handling service, etc.)
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-button');
        const originalButtonText = submitBtn ? submitBtn.textContent : null;
        if (submitBtn) submitBtn.textContent = 'Message Sent! ✓';
        
        // Reset form
        contactForm.reset();
        
        // Reset button text after 3 seconds
        setTimeout(() => {
            if (submitBtn && originalButtonText) submitBtn.textContent = originalButtonText;
        }, 3000);

        // Optional: mailto fallback (uncomment to enable)
        /*
        const mailtoBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${message}`
        );
        const mailtoLink = `mailto:theburnishcompany@gmail.com?subject=${encodeURIComponent(subject || 'Website Inquiry')}&body=${mailtoBody}`;
        window.location.href = mailtoLink;
        */
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and portfolio items
document.querySelectorAll('.product-card, .portfolio-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Add active state to current nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #d4af37;
        border-bottom: 2px solid #d4af37;
    }
`;
document.head.appendChild(style);

// Performance: Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== Prefill contact form from product CTAs =====
document.querySelectorAll('.cta-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const subject = link.dataset.subject || '';
    const prefill = link.dataset.prefill || '';
    const subjectInput = document.getElementById('contact-subject');
    const messageField = document.querySelector('.contact-form textarea');
    if (subjectInput) subjectInput.value = subject;
    if (messageField) {
      messageField.value = prefill;
      // delay focus so scroll completes (useful on mobile)
      setTimeout(() => messageField.focus(), 500);
    }
    const target = document.querySelector('#contact');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

console.log('The Burnish Company - Website loaded successfully!');
