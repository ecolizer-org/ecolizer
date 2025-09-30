// Ecolizer Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Crow mascot interactive functionality
    const crowMascot = document.getElementById('crow-mascot');
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;

    // Function to guide to next section
    function guideToNextSection() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            const nextSection = sections[currentSectionIndex];
            nextSection.scrollIntoView({ behavior: 'smooth' });
            updateCrowTooltip(`Exploring ${nextSection.id.charAt(0).toUpperCase() + nextSection.id.slice(1)} section!`);
        } else {
            updateCrowTooltip('You\'ve seen everything! Contact us for more info.');
        }
    }

    // Update crow tooltip
    function updateCrowTooltip(message) {
        const tooltip = crowMascot.querySelector('.crow-tooltip');
        tooltip.textContent = message;
    }

    // Crow mascot click event
    if (crowMascot) {
        crowMascot.addEventListener('click', guideToNextSection);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Update current section index
                const sectionIndex = Array.from(sections).indexOf(target);
                if (sectionIndex !== -1) {
                    currentSectionIndex = sectionIndex;
                }
            }
        });
    });

    // Enhanced fade in animation on scroll with stagger
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade in
    document.querySelectorAll('.card, .section-transition').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Stagger animation for service and project cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    card.classList.add('card-stagger');
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    // Observe card containers
    document.querySelectorAll('#services .row, #projects .row').forEach(container => {
        cardObserver.observe(container);
    });

    // Particle effect for hero section
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                heroSection.appendChild(particle);
            }
        }
    }

    createParticles();

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const rate = scrolled * -0.5;
            el.style.transform = `translateY(${rate}px)`;
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple form validation
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
            }
            // If valid, let the form submit to formsubmit.co
        });
    }

    // Check if redirected back after successful submission
    if (window.location.search === '?submitted=true') {
        alert('Thank you for your message! We\'ll get back to you soon.');
    }

    // Navbar background change on scroll with blur and animations
    const navbar = document.querySelector('.modern-navbar');
    const navLinks = document.querySelectorAll('.modern-nav-link');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.backdropFilter = 'blur(25px)';
            navbar.style.transform = 'translateY(0)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.transform = 'translateY(0)';
        }
    });

    // Add active class to nav links on scroll
    const allSections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Crow mascot follows scroll slightly with enhanced movement
    if (crowMascot) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            crowMascot.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.01}deg)`;
        });
    }

    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize crow tooltip
    if (crowMascot) {
        updateCrowTooltip('Click me to explore the site!');
    }

    // Counter animation for achievements
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to slow
                const inc = target / speed;

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    }

    // Trigger counter animation when achievements section is visible
    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
        const achievementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        achievementsObserver.observe(achievementsSection);
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    }

    // Load theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        setTheme(!isDark);
    });

    // Navbar toggler icon change
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const icon = this.querySelector('.fas');
            setTimeout(() => {
                if (this.getAttribute('aria-expanded') === 'true') {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }, 10);
        });
    }
});
