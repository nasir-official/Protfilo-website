/**
 * Vanilla JS logic for Portfolio
 */

// =========================================
// Intersection Observer for Scroll Animations
// =========================================
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Select all animation classes
    const animatables = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-delayed, .stagger-children');
    animatables.forEach((el) => observer.observe(el));
};
observeElements();

// =========================================
// Navbar Toggle & Scroll Styling
// =========================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('mobile-menu');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('mobile-menu')) {
                mobileToggle.classList.remove('open');
                navLinks.classList.remove('mobile-menu');
                navLinks.classList.add('hidden');
            }
        });
    });
}

// =========================================
// Projects Data & Rendering
// =========================================
const projectsData = [
    {
        title: "Landslide Risk Prediction",
        description: "ML model predicting potential landslide zones utilizing rainfall and geological topologies.",
        technologies: ["Python", "XGBoost", "Geopandas", "Flask"],
        image: "https://images.unsplash.com/photo-1579290076326-e179e8630044?auto=format&fit=crop&w=800&q=80",
        github: "#",
        live: "#"
    },
    {
        title: "Road Accident Risk Analysis",
        description: "Spatiotemporal analysis identifying high-risk intersections in urban Pakistan.",
        technologies: ["Pandas", "Scikit-Learn", "Folium"],
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
        github: "#",
        live: "#"
    },
    {
        title: "Water Availability System",
        description: "Dashboard for forecasting reservoir levels based on snowmelt sensors.",
        technologies: ["React", "Python", "Prophet"],
        image: "https://images.unsplash.com/photo-1469122312224-c5846569feb1?auto=format&fit=crop&w=800&q=80",
        github: "#",
        live: "#"
    }
];

const projectsGrid = document.getElementById('projects-grid');
if (projectsGrid) {
    projectsData.forEach((proj, idx) => {
        const delays = ['0s', '0.1s', '0.2s']; // Stagger effect
        const html = `
            <div class="project-card fade-in-up" style="transition-delay: ${delays[idx]}">
                <div class="project-image-wrapper">
                    <div class="project-overlay"></div>
                    <img src="${proj.image}" alt="${proj.title}" class="project-image" />
                </div>
                <div class="project-content">
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-desc">${proj.description}</p>
                    <div class="project-tech">
                        ${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        projectsGrid.insertAdjacentHTML('beforeend', html);
    });
}

// =========================================
// API & Forms
// =========================================
const API_BASE = 'http://localhost:5000/api';

// Page View Tracking
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    fetch(`${API_BASE}/track-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_name: 'home_vanilla' })
    }).catch(console.error);
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const statusEl = document.getElementById('form-status');
        
        btn.disabled = true;
        btn.textContent = 'Sending...';
        statusEl.textContent = '';
        statusEl.className = 'form-status';

        const payload = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            const res = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Failed');
            
            statusEl.textContent = 'Message sent successfully! I will get back to you soon.';
            statusEl.classList.add('text-success');
            contactForm.reset();
        } catch (err) {
            statusEl.textContent = 'Oops! Something went wrong. Please try again.';
            statusEl.classList.add('text-error');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send Message';
            setTimeout(() => { statusEl.textContent = ''; }, 5000);
        }
    });
}

// =========================================
// Admin Dashboard Logic
// =========================================
const adminForm = document.getElementById('admin-login-form');
if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pwd = document.getElementById('admin-password').value;
        const errEl = document.getElementById('login-error');

        if (pwd === 'admin123') {
            document.getElementById('login-view').classList.add('hidden');
            const dashView = document.getElementById('dashboard-view');
            dashView.classList.remove('hidden');
            
            // Re-trigger observer for fading in dashboard components
            observeElements(); 

            await fetchAdminData();
        } else {
            errEl.textContent = 'Incorrect password';
        }
    });
}

async function fetchAdminData() {
    const loader = document.getElementById('dashboard-loading');
    const content = document.getElementById('dashboard-content');
    const err = document.getElementById('dashboard-error');

    try {
        loader.classList.remove('hidden');
        
        // Fetch stats
        const sRes = await fetch(`${API_BASE}/stats`);
        const sData = await sRes.json();
        document.getElementById('stat-views').textContent = sData.total_views;
        document.getElementById('stat-messages').textContent = sData.total_messages;

        // Fetch messages
        const mRes = await fetch(`${API_BASE}/messages`);
        const messages = await mRes.json();

        const grid = document.getElementById('messages-grid');
        grid.innerHTML = '';

        if (messages.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-secondary)">No messages yet.</p>';
        } else {
            messages.forEach((msg, idx) => {
                const delay = (idx * 0.1) + 's';
                grid.insertAdjacentHTML('beforeend', `
                    <div class="message-card glass-card fade-in-up visible" style="border: 1px solid var(--glass-border); border-radius: 1rem; transition-delay: ${delay};">
                        <div class="message-header">
                            <h4 class="message-subject">${msg.subject}</h4>
                            <span class="message-date">${new Date(msg.timestamp).toLocaleString()}</span>
                        </div>
                        <div class="message-sender">
                            <strong>${msg.name}</strong> (${msg.email})
                        </div>
                        <div class="message-body">${msg.message}</div>
                    </div>
                `);
            });
        }
        
        loader.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        err.textContent = 'Failed to load data. Is the backend running?';
        loader.classList.add('hidden');
    }
}
