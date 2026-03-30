// Muhammad Nasir Portfolio - Main JS

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksList = document.querySelector('.nav-links');

    // 1. Hide Loader
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // 2. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // 4. Page View Tracking (Flask Integration)
    const trackPageView = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/track-view', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page_name: window.location.pathname === '/' ? 'home' : window.location.pathname
                }),
            });
            const data = await response.json();
            console.log('Page view tracked:', data.message);
        } catch (error) {
            console.error('Error tracking page view:', error);
        }
    };

    trackPageView();

    // 5. Contact Form Submission (Flask Integration)
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // UI Feedback
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    formStatus.innerText = 'Message sent successfully! I will get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }
            } catch (error) {
                formStatus.innerText = 'Oops! Something went wrong. Please try again.';
                formStatus.className = 'form-status error';
                console.error('Form error:', error);
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                
                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.innerText = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }
        });
    }

    // 6. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinksList.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('open');
            }
        });
    });

    // 7. Intersection Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });
});
