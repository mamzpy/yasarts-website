// YasArts Professional JavaScript

// Language Management
const languages = {
    en: 'English',
    it: 'Italiano', 
    fr: 'Français'
};

let currentLanguage = localStorage.getItem('yasarts_language') || 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeContactForm();
    initializePlaceholders();
});

// Language Functions
function initializeLanguage() {
    // Set active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
    
    // Add click listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });
    
    // Apply current language
    switchLanguage(currentLanguage);
}

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('yasarts_language', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all elements with language attributes
    updateLanguageContent(lang);
    updatePlaceholders(lang);
}

function updateLanguageContent(lang) {
    document.querySelectorAll(`[data-${lang}]`).forEach(element => {
        const content = element.getAttribute(`data-${lang}`);
        if (content) {
            element.textContent = content;
        }
    });
    
    // Update select options
    document.querySelectorAll('select option').forEach(option => {
        const content = option.getAttribute(`data-${lang}`);
        if (content) {
            option.textContent = content;
        }
    });
}

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .about-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Management
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.service || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        showNotification('Thank you! Your inquiry has been sent. We\'ll respond within 24 hours.', 'success');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Service Modal Functions
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    
    const serviceInfo = {
        wedding: {
            title: {
                en: 'Wedding Photography Package',
                it: 'Pacchetto Fotografia Matrimoniale',
                fr: 'Package Photographie Mariage'
            },
            content: {
                en: `
                    <h3>Luxury Wedding Photography</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>What's Included:</h4>
                            <ul>
                                <li>8-12 hours of wedding day coverage</li>
                                <li>Pre-wedding consultation and planning</li>
                                <li>Professional editing of all photos</li>
                                <li>High-resolution digital gallery (500+ photos)</li>
                                <li>Online gallery for 2 years</li>
                                <li>USB drive with all images</li>
                                <li>Print release for personal use</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investment:</h4>
                            <p>Starting from €2,500</p>
                            <p><small>*Price varies by location and specific requirements</small></p>
                        </div>
                        <div class="booking-info">
                            <h4>Booking:</h4>
                            <p>50% deposit required to secure your date</p>
                            <p>Limited availability - book 6-12 months in advance</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Contact Us to Book</button>
                `,
                it: `
                    <h3>Pacchetto Fotografia Matrimoniale di Lusso</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Cosa è Incluso:</h4>
                            <ul>
                                <li>8-12 ore di copertura del matrimonio</li>
                                <li>Consulenza pre-matrimonio e pianificazione</li>
                                <li>Editing professionale di tutte le foto</li>
                                <li>Galleria digitale ad alta risoluzione (500+ foto)</li>
                                <li>Galleria online per 2 anni</li>
                                <li>Chiavetta USB con tutte le immagini</li>
                                <li>Licenza di stampa per uso personale</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investimento:</h4>
                            <p>A partire da €2.500</p>
                            <p><small>*Il prezzo varia in base alla location e ai requisiti specifici</small></p>
                        </div>
                        <div class="booking-info">
                            <h4>Prenotazione:</h4>
                            <p>Acconto del 50% richiesto per riservare la data</p>
                            <p>Disponibilità limitata - prenota 6-12 mesi in anticipo</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Contattaci per Prenotare</button>
                `,
                fr: `
                    <h3>Package Photographie Mariage de Luxe</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Ce qui est Inclus:</h4>
                            <ul>
                                <li>8-12 heures de couverture du mariage</li>
                                <li>Consultation pré-mariage et planification</li>
                                <li>Édition professionnelle de toutes les photos</li>
                                <li>Galerie numérique haute résolution (500+ photos)</li>
                                <li>Galerie en ligne pendant 2 ans</li>
                                <li>Clé USB avec toutes les images</li>
                                <li>Licence d'impression pour usage personnel</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investissement:</h4>
                            <p>À partir de 2 500€</p>
                            <p><small>*Le prix varie selon la location et les exigences spécifiques</small></p>
                        </div>
                        <div class="booking-info">
                            <h4>Réservation:</h4>
                            <p>Acompte de 50% requis pour sécuriser votre date</p>
                            <p>Disponibilité limitée - réservez 6-12 mois à l'avance</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Contactez-nous pour Réserver</button>
                `
            }
        },
        fashion: {
            title: {
                en: 'Fashion & Portrait Photography',
                it: 'Fotografia Moda & Ritratti',
                fr: 'Photographie Mode & Portrait'
            },
            content: {
                en: `
                    <h3>Professional Fashion & Portrait Sessions</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Session Options:</h4>
                            <ul>
                                <li>Studio sessions with professional lighting</li>
                                <li>Outdoor location shoots</li>
                                <li>Fashion editorial styling</li>
                                <li>Corporate headshots</li>
                                <li>Personal branding photography</li>
                                <li>Model portfolio development</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investment:</h4>
                            <p>Studio Session: From €800</p>
                            <p>Location Session: From €1,200</p>
                            <p>Full Day Shoot: From €2,000</p>
                        </div>
                        <div class="deliverables">
                            <h4>What You Get:</h4>
                            <p>20-50 professionally edited high-resolution images</p>
                            <p>Online gallery for easy sharing</p>
                            <p>Commercial usage rights available</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Book Your Session</button>
                `,
                it: `
                    <h3>Sessioni Professionali Moda & Ritratti</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Opzioni Sessione:</h4>
                            <ul>
                                <li>Sessioni in studio con illuminazione professionale</li>
                                <li>Servizi fotografici in location esterna</li>
                                <li>Styling editoriale moda</li>
                                <li>Ritratti aziendali</li>
                                <li>Fotografia per personal branding</li>
                                <li>Sviluppo portfolio modelli</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investimento:</h4>
                            <p>Sessione Studio: Da €800</p>
                            <p>Sessione Location: Da €1.200</p>
                            <p>Servizio Giornata Intera: Da €2.000</p>
                        </div>
                        <div class="deliverables">
                            <h4>Cosa Ricevi:</h4>
                            <p>20-50 immagini ad alta risoluzione professionalmente editate</p>
                            <p>Galleria online per condividere facilmente</p>
                            <p>Diritti uso commerciale disponibili</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Prenota la Tua Sessione</button>
                `,
                fr: `
                    <h3>Séances Professionnelles Mode & Portrait</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Options de Séance:</h4>
                            <ul>
                                <li>Séances en studio avec éclairage professionnel</li>
                                <li>Séances en extérieur</li>
                                <li>Styling éditorial mode</li>
                                <li>Portraits d'entreprise</li>
                                <li>Photographie de marque personnelle</li>
                                <li>Développement portfolio mannequin</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investissement:</h4>
                            <p>Séance Studio: À partir de 800€</p>
                            <p>Séance Location: À partir de 1 200€</p>
                            <p>Tournage Journée Complète: À partir de 2 000€</p>
                        </div>
                        <div class="deliverables">
                            <h4>Ce que Vous Recevez:</h4>
                            <p>20-50 images haute résolution éditées professionnellement</p>
                            <p>Galerie en ligne pour partage facile</p>
                            <p>Droits d'usage commercial disponibles</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Réservez Votre Séance</button>
                `
            }
        },
        corporate: {
            title: {
                en: 'Corporate & Event Photography',
                it: 'Fotografia Aziendale & Eventi',
                fr: 'Photographie Corporate & Événements'
            },
            content: {
                en: `
                    <h3>Professional Corporate Photography</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Corporate Services:</h4>
                            <ul>
                                <li>Conference and event coverage</li>
                                <li>Corporate headshots and team photos</li>
                                <li>Product and brand photography</li>
                                <li>Office and facility documentation</li>
                                <li>Awards ceremonies and galas</li>
                                <li>Marketing and promotional content</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investment:</h4>
                            <p>Half Day: From €1,500</p>
                            <p>Full Day: From €2,500</p>
                            <p>Multi-day Events: Custom quote</p>
                        </div>
                        <div class="deliverables">
                            <h4>Professional Service:</h4>
                            <p>Same-day or next-day delivery available</p>
                            <p>Full commercial usage rights included</p>
                            <p>Discrete, professional coverage</p>
                            <p>High-resolution edited images</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Get Corporate Quote</button>
                `,
                it: `
                    <h3>Fotografia Aziendale Professionale</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Servizi Aziendali:</h4>
                            <ul>
                                <li>Copertura conferenze ed eventi</li>
                                <li>Ritratti aziendali e foto team</li>
                                <li>Fotografia prodotti e brand</li>
                                <li>Documentazione uffici e strutture</li>
                                <li>Cerimonie di premiazione e gala</li>
                                <li>Contenuti marketing e promozionali</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investimento:</h4>
                            <p>Mezza Giornata: Da €1.500</p>
                            <p>Giornata Intera: Da €2.500</p>
                            <p>Eventi Multi-giorno: Preventivo personalizzato</p>
                        </div>
                        <div class="deliverables">
                            <h4>Servizio Professionale:</h4>
                            <p>Consegna in giornata o il giorno dopo disponibile</p>
                            <p>Diritti uso commerciale completo inclusi</p>
                            <p>Copertura discreta e professionale</p>
                            <p>Immagini modificate ad alta risoluzione</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Richiedi Preventivo Aziendale</button>
                `,
                fr: `
                    <h3>Photographie Corporate Professionnelle</h3>
                    <div class="service-details">
                        <div class="package-info">
                            <h4>Services Corporate:</h4>
                            <ul>
                                <li>Couverture conférences et événements</li>
                                <li>Portraits d'entreprise et photos d'équipe</li>
                                <li>Photographie produits et marque</li>
                                <li>Documentation bureaux et installations</li>
                                <li>Cérémonies de remise de prix et galas</li>
                                <li>Contenu marketing et promotionnel</li>
                            </ul>
                        </div>
                        <div class="pricing-info">
                            <h4>Investissement:</h4>
                            <p>Demi-journée: À partir de 1 500€</p>
                            <p>Journée complète: À partir de 2 500€</p>
                            <p>Événements multi-jours: Devis personnalisé</p>
                        </div>
                        <div class="deliverables">
                            <h4>Service Professionnel:</h4>
                            <p>Livraison le jour même ou le lendemain disponible</p>
                            <p>Droits d'usage commercial complets inclus</p>
                            <p>Couverture discrète et professionnelle</p>
                            <p>Images éditées haute résolution</p>
                        </div>
                    </div>
                    <button onclick="closeServiceModal()" class="btn-primary">Demander Devis Corporate</button>
                `
            }
        }
    };
    
    const service = serviceInfo[serviceType];
    if (service) {
        modalContent.innerHTML = service.content[currentLanguage];
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeServiceModal();
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        max-width: 400px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Placeholder Management
function initializePlaceholders() {
    updatePlaceholders(currentLanguage);
}

function updatePlaceholders(lang) {
    document.querySelectorAll('[data-' + lang + '-placeholder]').forEach(element => {
        const placeholder = element.getAttribute('data-' + lang + '-placeholder');
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy Loading for Images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Portfolio Filter (if needed in future)
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (item.style.opacity === '0') {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
}
  
function openVideo(src) {
  const videoWindow = window.open('', '_blank');
  videoWindow.document.write(`
    <video controls autoplay style="width:100%; height:100%">
      <source src="${src}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `);
}


// Performance Optimization
function optimizePerformance() {
    // Preload critical images
    const criticalImages = [
        'images/fashion/1.jpg',
        'images/fashion/2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Handle page visibility for better performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('page-hidden');
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are loaded
    setTimeout(() => {
        initializeLazyLoading();
    }, 100);
});
// Portfolio Lightbox Functionality
function initializePortfolioLightbox() {
    // Create lightbox HTML structure
    const lightboxHTML = `
        <div id="portfolioLightbox" class="lightbox" style="display: none;">
            <div class="lightbox-overlay" onclick="closeLightbox()"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
                <button class="lightbox-prev" onclick="previousImage()">‹</button>
                <button class="lightbox-next" onclick="nextImage()">›</button>
                <img id="lightboxImage" src="" alt="">
                <div class="lightbox-info">
                    <h3 id="lightboxTitle"></h3>
                    <p id="lightboxDescription"></p>
                </div>
            </div>
        </div>
    `;
    
    // Add lightbox to page
    if (!document.getElementById('portfolioLightbox')) {
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    // Add CSS for lightbox
    addLightboxCSS();
    
    // Get all portfolio items and add click functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentImageIndex = 0;
    let imageData = [];
    
    // Collect image data
    portfolioItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const titleElement = item.querySelector('.portfolio-info h3');
        const descElement = item.querySelector('.portfolio-info p');
        
        imageData.push({
            src: img.src,
            alt: img.alt,
            title: titleElement.textContent,
            description: descElement.textContent
        });

   
        // Add click event to portfolio item
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => openLightbox(index));
    });
    
    // Lightbox functions
    window.openLightbox = function(index) {
        currentImageIndex = index;
        showImage(index);
        document.getElementById('portfolioLightbox').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    window.closeLightbox = function() {
        document.getElementById('portfolioLightbox').style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    window.nextImage = function() {
        currentImageIndex = (currentImageIndex + 1) % imageData.length;
        showImage(currentImageIndex);
    };
    
    window.previousImage = function() {
        currentImageIndex = (currentImageIndex - 1 + imageData.length) % imageData.length;
        showImage(currentImageIndex);
    };
    
    function showImage(index) {
        const data = imageData[index];
        document.getElementById('lightboxImage').src = data.src;
        document.getElementById('lightboxImage').alt = data.alt;
        document.getElementById('lightboxTitle').textContent = data.title;
        document.getElementById('lightboxDescription').textContent = data.description;
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('portfolioLightbox');
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
            }
        }
    });
}

function addLightboxCSS() {
    if (document.getElementById('lightboxCSS')) return;
    
    const css = `
        <style id="lightboxCSS">
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: scale(0.8);
            animation: scaleIn 0.3s ease forwards;
        }
        
        .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            z-index: 3001;
            transition: all 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: #d4af37;
            transform: rotate(90deg);
        }
        
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 15px 20px;
            border-radius: 50px;
            transition: all 0.3s ease;
        }
        
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(212, 175, 55, 0.8);
            border-color: #d4af37;
            transform: translateY(-50%) scale(1.1);
        }
        
        .lightbox-prev { left: -80px; }
        .lightbox-next { right: -80px; }
        
        #lightboxImage {
            max-width: 100%;
            max-height: 70vh;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-info {
            text-align: center;
            color: white;
            margin-top: 30px;
            max-width: 600px;
        }
        
        .lightbox-info h3 {
            font-size: 1.8rem;
            margin-bottom: 10px;
            color: #d4af37;
        }
        
        .lightbox-info p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .portfolio-instruction {
            margin-top: 20px;
            padding: 15px 25px;
            background: rgba(212, 175, 55, 0.1);
            border-radius: 25px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            color: #d4af37;
        }
        
        .click-indicator {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(212, 175, 55, 0.9);
            color: white;
            padding: 10px;
            border-radius: 50%;
            font-size: 1.2rem;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .portfolio-item:hover .click-indicator {
            opacity: 1;
            transform: scale(1.1);
        }
        
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes scaleIn { to { transform: scale(1); } }
        
        @media (max-width: 768px) {
            .lightbox-prev, .lightbox-next { display: none; }
            .lightbox-close { top: -40px; font-size: 2rem; }
            #lightboxImage { max-height: 60vh; }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', css);
}

// Add to existing DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializePortfolioLightbox();
    }, 500);
});
function openVideoModal(src) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  video.src = src;
  modal.style.display = 'flex';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  video.pause();
  video.src = '';
  modal.style.display = 'none';
}
