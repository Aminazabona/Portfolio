document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // 3. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('reveal-visible');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Lancer une fois au chargement

    // 4. EmailJS Integration
    // Remplacez 'YOUR_PUBLIC_KEY' par votre clé EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const btn = contactForm.querySelector('button');
        btn.innerText = 'Sending...';

        // Paramètres pour EmailJS (Service ID, Template ID, Form Element)
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                btn.innerText = 'Send Message';
                formStatus.innerText = 'Message sent successfully! ✨';
                formStatus.style.color = 'green';
                contactForm.reset();
            }, (error) => {
                btn.innerText = 'Send Message';
                formStatus.innerText = 'Failed to send message. Please try again.';
                formStatus.style.color = 'red';
                console.log('FAILED...', error);
            });
    });
});