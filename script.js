// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Add fade-in animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Form Handling
const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.business || !data.service) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="loading-spinner"></span>Sending...';
    submitBtn.disabled = true;
    
    try {
        // Submit to Formspree
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Thank you for your inquiry! We\'ll get back to you within 24 hours.', 'success');
            this.reset();
            
            // Reset floating labels
            const formGroups = this.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                if (label) {
                    label.classList.remove('active');
                }
            });
        } else {
            throw new Error('Submission failed');
        }
        
    } catch (error) {
        showNotification('Something went wrong. Please try again or call us directly.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
    }
});

// Floating label animation for form inputs
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    const label = group.querySelector('label');
    
    if (input && label) {
        // Handle initial state
        if (input.value) {
            label.classList.add('active');
        }
        
        // Handle focus and blur events
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
        
        // Handle input events
        input.addEventListener('input', () => {
            if (input.value) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }
});

// Add CSS for active label state
const labelStyle = document.createElement('style');
labelStyle.textContent = `
    .form-group label.active {
        top: -8px !important;
        font-size: 12px !important;
        color: #6366f1 !important;
    }
`;
document.head.appendChild(labelStyle);

// Add loading spinner for form submission
const addLoadingSpinner = () => {
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-right: 10px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
};

addLoadingSpinner();

// Notification system
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;
    
    notification.style.cssText = style;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
};

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Add animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .feature-card, .service-card, .portfolio-item, .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyle);

// Counter animation for hero stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[\d\s]/g, '');
        
        if (numericTarget) {
            let current = 0;
            const increment = numericTarget / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    counter.textContent = numericTarget + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 40);
        }
    });
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add loading animation for floating cards
window.addEventListener('load', () => {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initial setup for floating cards
const floatingCardStyle = document.createElement('style');
floatingCardStyle.textContent = `
    .floating-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
`;
document.head.appendChild(floatingCardStyle);

// Add hover effects for interactive elements
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click ripple effect for buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Project Modal Functions
window.openProjectModal = function(projectId) {
    console.log('Opening modal for project:', projectId);
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const gallery = document.getElementById('screenshotGallery');
    
    if (!modal || !modalTitle || !gallery) {
        console.error('Modal elements not found');
        return;
    }
    
    // Clear existing content
    gallery.innerHTML = '';
    
    // Project data with actual screenshots
    const projects = {
        'air-suspension': {
            title: 'AirFlow Suspension Business',
            screenshots: [
                {
                    src: 'Screenshots/Airflow Suspension/Airflow_Home.jpg',
                    title: 'Homepage Design',
                    description: 'Professional homepage with hero section and service overview'
                },
                {
                    src: 'Screenshots/Airflow Suspension/Airflow_Services.jpg',
                    title: 'Services Page',
                    description: 'Detailed service descriptions with pricing and features'
                },
                {
                    src: 'Screenshots/Airflow Suspension/Airflow_Contact.jpg',
                    title: 'Contact & Quote Forms',
                    description: 'Professional contact forms and quote request system'
                },
                {
                    src: 'Screenshots/Airflow Suspension/Airflow_get_a_quote.jpg',
                    title: 'Get a Quote',
                    description: 'Professional quote request system for customer inquiries'
                }
            ]
        },
        'biscuit-company': {
            title: 'Golden Crumb Biscuit Company',
            screenshots: [
                {
                    src: 'Screenshots/Golden Crumb/landing_page.jpg',
                    title: 'Landing Page',
                    description: 'Beautiful landing page with hero section and product showcase for the biscuit company'
                },
                {
                    src: 'Screenshots/Golden Crumb/Products_Section.jpg',
                    title: 'Products Section',
                    description: 'Customer-facing product catalog showcasing the biscuit collection with pricing and details'
                },
                {
                    src: 'Screenshots/Golden Crumb/Admin_Dashboard.jpg',
                    title: 'Admin Dashboard',
                    description: 'Complete admin system for managing products, orders, and business operations'
                },
                {
                    src: 'Screenshots/Golden Crumb/Add_New_Product.jpg',
                    title: 'Add New Product',
                    description: 'Admin interface for adding and managing new biscuit products with detailed information'
                },
                {
                    src: 'Screenshots/Golden Crumb/Manage_Products.jpg',
                    title: 'Manage Products',
                    description: 'Product management system with inventory control and product editing capabilities'
                }
            ]
        },

        'specialty-plant-nursery': {
            title: 'Verdant Haven - Specialty Plant Nursery',
            screenshots: [
                {
                    src: 'Screenshots/Verdant Haven/Verdant_Haven_Home.jpg',
                    title: 'Botanical Homepage',
                    description: 'Beautiful natural design with floating leaf animations and elegant typography'
                },
                {
                    src: 'Screenshots/Verdant Haven/Verdant_Haven_Featured_Specimens.jpg',
                    title: 'Rare Plant Collection',
                    description: 'Featured specimens with detailed care instructions and growing tips'
                },
                {
                    src: 'Screenshots/Verdant Haven/Verdant_Haven_Expert_Growing_Tips.jpg',
                    title: 'Expert Growing Tips',
                    description: 'Professional botanical advice cards for plant enthusiasts'
                },
                {
                    src: 'Screenshots/Verdant Haven/Verdant_Haven_Visit_Our_Greenhouse.jpg',
                    title: 'Greenhouse Information',
                    description: 'Location details, hours, and contact information for visits'
                }
            ]
        }
    };
    
    const project = projects[projectId];
    if (!project) return;
    
    modalTitle.textContent = project.title;
    
    // Create gallery with actual screenshots
    if (project.screenshots) {
        project.screenshots.forEach(screenshot => {
            const screenshotDiv = document.createElement('div');
            screenshotDiv.className = 'screenshot-item';
            
            screenshotDiv.innerHTML = `
                <img src="${screenshot.src}" alt="${screenshot.title}" 
                     onerror="this.src='images/placeholder-screenshot.jpg'"
                     onclick="zoomImage('${screenshot.src}', '${screenshot.title}')">
                <div class="screenshot-caption">
                    <h3>${screenshot.title}</h3>
                    <p>${screenshot.description}</p>
                </div>
            `;
            
            gallery.appendChild(screenshotDiv);
        });
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeProjectModal = function() {
    console.log('Closing modal');
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Terms Modal Functions
window.openTermsModal = function() {
    console.log('Opening terms modal');
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

window.closeTermsModal = function() {
    console.log('Closing terms modal');
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Privacy Modal Functions
window.openPrivacyModal = function() {
    console.log('Opening privacy modal');
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

window.closePrivacyModal = function() {
    console.log('Closing privacy modal');
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Image zoom functionality
window.zoomImage = function(imageSrc, imageTitle) {
    console.log('Zooming image:', imageSrc);
    
    // Create zoom modal if it doesn't exist
    let zoomModal = document.getElementById('zoomModal');
    if (!zoomModal) {
        zoomModal = document.createElement('div');
        zoomModal.id = 'zoomModal';
        zoomModal.className = 'zoom-modal';
        zoomModal.innerHTML = `
            <div class="zoom-content">
                <div class="zoom-header">
                    <h3 id="zoomTitle"></h3>
                    <span class="zoom-close" onclick="closeZoomModal()">&times;</span>
                </div>
                <div class="zoom-image-container">
                    <img id="zoomImage" src="" alt="">
                </div>
            </div>
        `;
        document.body.appendChild(zoomModal);
        
        // Add zoom modal styles
        const zoomStyles = document.createElement('style');
        zoomStyles.textContent = `
            .zoom-modal {
                display: none;
                position: fixed;
                z-index: 10001;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
            }
            
            .zoom-content {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .zoom-header {
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 10002;
            }
            
            .zoom-header h3 {
                color: white;
                margin: 0;
                font-size: 24px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            }
            
            .zoom-close {
                color: white;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
                transition: color 0.3s ease;
            }
            
            .zoom-close:hover {
                color: #6366f1;
            }
            
            .zoom-image-container {
                max-width: 90%;
                max-height: 80%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .zoom-image-container img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                cursor: zoom-out;
                transition: transform 0.3s ease;
            }
            
            .zoom-image-container img:hover {
                transform: scale(1.02);
            }
            
            /* Make screenshot images look clickable */
            .screenshot-item img {
                cursor: pointer;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            .screenshot-item img:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            }
            
            @media (max-width: 768px) {
                .zoom-header h3 {
                    font-size: 18px;
                }
                
                .zoom-close {
                    font-size: 30px;
                }
                
                .zoom-image-container {
                    max-width: 95%;
                    max-height: 85%;
                }
            }
        `;
        document.head.appendChild(zoomStyles);
    }
    
    // Set image and title
    const zoomImage = document.getElementById('zoomImage');
    const zoomTitle = document.getElementById('zoomTitle');
    
    if (zoomImage && zoomTitle) {
        zoomImage.src = imageSrc;
        zoomTitle.textContent = imageTitle;
        
        // Show zoom modal
        zoomModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

window.closeZoomModal = function() {
    const zoomModal = document.getElementById('zoomModal');
    if (zoomModal) {
        zoomModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, modal functions ready');
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('projectModal');
        if (event.target === modal) {
            window.closeProjectModal();
        }
        
        const termsModal = document.getElementById('termsModal');
        if (event.target === termsModal) {
            window.closeTermsModal();
        }
        
        const privacyModal = document.getElementById('privacyModal');
        if (event.target === privacyModal) {
            window.closePrivacyModal();
        }
    });
    
    // Close zoom modal when clicking outside
    window.addEventListener('click', function(event) {
        const zoomModal = document.getElementById('zoomModal');
        if (zoomModal && event.target === zoomModal) {
            window.closeZoomModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            window.closeProjectModal();
            
            const termsModal = document.getElementById('termsModal');
            if (termsModal && termsModal.style.display === 'block') {
                window.closeTermsModal();
            }
            
            const privacyModal = document.getElementById('privacyModal');
            if (privacyModal && privacyModal.style.display === 'block') {
                window.closePrivacyModal();
            }
        }
    });
    
    // Close zoom modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const zoomModal = document.getElementById('zoomModal');
            if (zoomModal && zoomModal.style.display === 'block') {
                window.closeZoomModal();
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('WebLaunch Pro SA website loaded successfully!');
    
    // Add any additional initialization here
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => el.textContent = currentYear);
});

// Phone number validation - only allow exactly 10 digits
const phoneInput = document.querySelector('#phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove any non-digit characters
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        // Update the input value
        this.value = value;
        
        // Clear any existing error
        const errorElement = document.getElementById('phone-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    });
    
    // Validate on blur
    phoneInput.addEventListener('blur', function() {
        const value = this.value;
        const errorElement = document.getElementById('phone-error');
        
        if (value.length !== 10) {
            if (errorElement) {
                errorElement.textContent = 'Please enter exactly 10 digits';
                errorElement.style.display = 'block';
            }
        } else {
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        }
    });
}

// Add performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});



 