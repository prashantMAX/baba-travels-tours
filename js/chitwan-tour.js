// Chitwan Tour Page JavaScript

// Smooth scroll for hero scroll button
document.addEventListener('DOMContentLoaded', () => {
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const quickInfoBar = document.querySelector('.quick-info-bar');
            if (quickInfoBar) {
                quickInfoBar.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Initialize AOS (Animate On Scroll) - simple version
    initAOS();
    
    // Initialize booking form
    initBookingForm();
    
    // Initialize image gallery/interactions
    initImageInteractions();
});

// Simple AOS (Animate On Scroll) implementation
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Booking Form Handler
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const date = formData.get('date');
        const guests = formData.get('guests');
        const room = formData.get('room');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !phone || !date || !guests) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('.btn-booking-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing...</span>';
        submitBtn.disabled = true;

        // Create WhatsApp message
        const whatsappMessage = `🌿 *Chitwan Tour by Bus - Booking Request*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Preferred Travel Date:* ${date}
*Number of Guests:* ${guests}
*Room Preference:* ${room}
${message ? `*Additional Message:*\n${message}` : ''}

---
Sent from BABA TRAVELS & TOURS website
Chitwan Tour by Bus Booking`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/9779851077971?text=${encodedMessage}`;

        // Show options to customer
        const userChoice = confirm('Would you like to send this booking request via WhatsApp? Click OK to open WhatsApp or Cancel to close.');

        if (userChoice) {
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            showNotification('Opening WhatsApp to send your booking request...', 'success');
            bookingForm.reset();
        } else {
            // User cancelled
            showNotification('Booking request not sent. You can try again or contact us directly.', 'info');
        }

        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Image interactions
function initImageInteractions() {
    const overviewImage = document.getElementById('overview-img');
    if (overviewImage) {
        overviewImage.addEventListener('click', () => {
            // You can add a lightbox or modal here
            console.log('Image clicked - can add lightbox feature');
        });
    }
}

// Set minimum date for booking form to today
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Subtle parallax effect for hero section (disabled by default for better performance)
// Uncomment below if you want parallax effect
/*
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const tourHero = document.querySelector('.tour-hero');
    
    if (tourHero && scrollTop < window.innerHeight && scrollTop > 0) {
        // Subtle parallax effect
        const parallaxSpeed = 0.3;
        const heroContent = tourHero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrollTop / window.innerHeight) * 0.5;
        }
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });
*/

// Add CSS for notification animations if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

// Highlight active section in navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}, { passive: true });

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

