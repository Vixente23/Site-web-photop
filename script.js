// Menu actif
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu actif
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav ul li a').forEach(link => {
        // On récupère le href sans le slash initial
        const linkHref = link.getAttribute('href').replace(/^\//, '');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });

    // Modal de réservation
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Réserver une séance</h2>
            <form id="booking-form">
                <div class="form-group">
                    <label for="name">Nom complet</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input type="tel" id="phone">
                </div>
                <div class="form-group">
                    <label for="date">Date souhaitée</label>
                    <input type="date" id="date" required>
                </div>
                <div class="form-group">
                    <label for="package">Type de séance</label>
                    <select id="package" required>
                        <option value="">Sélectionnez une option</option>
                        <option value="portrait">Séance portrait</option>
                        <option value="mariage">Mariage</option>
                        <option value="famille">Séance famille</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message"></textarea>
                </div>
                <button type="submit" class="submit-btn">Envoyer la demande</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Ouverture/fermeture du modal
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', () => { modal.style.display = 'block'; });
    });
    modal.querySelector('.close-btn').addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Soumission du formulaire
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Votre demande de réservation a été envoyée avec succès. Je vous contacterai bientôt pour confirmer.');
        modal.style.display = 'none';
        this.reset();
    });

    // Filtrage galerie
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-box, .gallery-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Animation au défilement
    window.addEventListener('scroll', function() {
        document.querySelectorAll('.about-section, .gallery-preview, .gallery-item, .pricing-card').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });

    // Carrousel galerie au survol
    document.querySelectorAll('.image-carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        let interval;
        if (images.length > 1) {
            const rotateImages = () => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            };
            interval = setInterval(rotateImages, 3000);
            carousel.parentElement.addEventListener('mouseenter', () => clearInterval(interval));
            carousel.parentElement.addEventListener('mouseleave', () => {
                interval = setInterval(rotateImages, 3000);
            });
        }
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImages = [];
    let currentIndex = 0;

    document.querySelectorAll('.gallery-box').forEach(box => {
        box.addEventListener('click', function() {
            currentImages = Array.from(this.querySelectorAll('.image-carousel img'));
            currentIndex = currentImages.findIndex(img => img.classList.contains('active'));
            if (currentIndex === -1) currentIndex = 0;
            updateLightboxImage();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function updateLightboxImage() {
        const img = currentImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') showPrevImage();
            else if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Thèmes
    const themes = [
        {
            '--main-bg': '#fff',
            '--main-color': '#333',
            '--header-bg': 'rgba(0, 0, 0, 0.7)',
            '--btn-bg': '#00bfff',
            '--btn-hover': '#009acd'
        },
        {
            '--main-bg': '#181818',
            '--main-color': '#f5f5f5',
            '--header-bg': 'rgba(24,24,24,0.95)',
            '--btn-bg': '#333',
            '--btn-hover': '#555'
        },
        {
            '--main-bg': '#0a2239',
            '--main-color': '#e0eaff',
            '--header-bg': 'rgba(10,34,57,0.95)',
            '--btn-bg': '#1ec6f7',
            '--btn-hover': '#00bfff'
        }
    ];
    let themeIndex = 0;

    const themeBtn = document.getElementById('theme-toggle');
    function applyTheme(theme) {
        for (const key in theme) {
            document.documentElement.style.setProperty(key, theme[key]);
        }
    }
    applyTheme(themes[0]);
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            themeIndex = (themeIndex + 1) % themes.length;
            applyTheme(themes[themeIndex]);
        });
    }

    // Menu burger responsive
    document.querySelectorAll('.nav').forEach(nav => {
        const navToggle = nav.querySelector('.nav-toggle');
        const navUl = nav.querySelector('ul');
        if (navToggle && navUl) {
            navToggle.addEventListener('click', function() {
                navUl.classList.toggle('open');
            });
        }
    });
});

// Loader
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-circle"></div>';
    document.body.prepend(loader);
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
    
    // Scroll indicator in hero
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '↓';
    document.querySelector('.hero-content').appendChild(scrollIndicator);
    
    // Floating effect for hero image
    const heroImage = document.querySelector('.hero');
    if (heroImage) {
        heroImage.classList.add('hero-image');
    }
    
    // Scroll animations for sections
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-section, .gallery-preview, .gallery-item, .pricing-card, .footer-section');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initialize on load
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Stats counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counters when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter.parentElement);
    });
    
    // Enhanced hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            const icon = this.querySelector('.service-icon');
            if (icon) icon.style.color = 'var(--btn-bg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            const icon = this.querySelector('.service-icon');
            if (icon) icon.style.color = '';
        });
    });
    
    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', function() {
            if (image) image.style.transform = 'scale(1.05)';
            if (overlay) overlay.style.opacity = '0.9';
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) image.style.transform = '';
            if (overlay) overlay.style.opacity = '';
        });
    });
    
    // Mobile menu animation
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('open');
        });
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 191, 255, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});