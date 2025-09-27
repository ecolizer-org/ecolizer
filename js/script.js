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
    crowMascot.addEventListener('click', guideToNextSection);

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

    // Fade in animation on scroll
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

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple form validation
            if (name && email && message) {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Crow mascot follows scroll slightly
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        crowMascot.style.transform = `translateY(${rate}px)`;
    });

    // Initialize crow tooltip
    updateCrowTooltip('Click me to explore the site!');
});
