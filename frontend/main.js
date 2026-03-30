/**
 * Vanilla JS logic for Portfolio - AI/ML Engine v1.0
 */

// =========================================
// AI/ML Engine Startup Sequence
// =========================================
console.log('%c[NASIR-AI]: INITIALIZING NEURAL NETWORK...', 'color: #00f2fe; font-weight: bold; font-family: monospace;');
console.log('%c[NASIR-AI]: LOADING PREDICTIVE WEIGHTS (Landslide, Road_Safety, Water)...', 'color: #bc4e9c; font-family: monospace;');
console.log('%c[NASIR-AI]: CORE STACK: PURE_VANILLA_JS // FLASK_BACKEND // SQLITE_DATA', 'color: #94a3b8; font-family: monospace;');
console.log('%c[NASIR-AI]: SYSTEM READY.', 'color: #10b981; font-weight: bold; font-family: monospace;');


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
        const isOpen = navbar.classList.toggle('nav-open');
        mobileToggle.classList.toggle('open', isOpen);
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('nav-open');
            mobileToggle.classList.remove('open');
        });
    });
}

// =========================================
// Projects Data & Rendering
// =========================================
const projectsData = [
    {
        title: "Landslide Risk Prediction",
        description: "ML model predicting potential landslide zones in Northern Pakistan utilizing rainfall, slope elevation, and geological topologies.",
        technologies: ["Python", "XGBoost", "Geopandas", "Flask"],
        image: "https://images.unsplash.com/photo-1579290076326-e179e8630044?auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/nasir-official/Land-Slide-Risk-Prediction",
        live: "https://land-sliding-risk-predictor--naasm214.replit.app"
    },
    {
        title: "Road Accident Risk Analysis",
        description: "Spatiotemporal analysis identifying high-risk intersections in urban Pakistan to improve traffic safety infrastructure.",
        technologies: ["Pandas", "Scikit-Learn", "Folium"],
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/nasir-official/road_accident_predictor",
        live: "#"
    },
    {
        title: "Water Availability System",
        description: "Early warning system for forecasting reservoir levels and seasonal water availability based on snowmelt sensors.",
        technologies: ["React", "Python", "Prophet"],
        image: "https://images.unsplash.com/photo-1469122312224-c5846569feb1?auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/nasir-official/water_availability_predictor",
        live: "#"
    },
    {
        title: "Student Dropout Predictor",
        description: "Predictive system analyzing student demographics, grades, and attendance to identify and prevent potential dropouts.",
        technologies: ["Flask", "Scikit-learn", "Numpy", "Pandas"],
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/nasir-official/student_dropout_predictor",
        live: "#"
    },
    {
        title: "Tourist Demand Predictor",
        description: "Forecasting tourist arrivals in Northern Pakistan based on seasonal weather patterns and local promotional factors.",
        technologies: ["Flask", "Scikit-learn", "Folium", "Joblib"],
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/nasir-official/tourist-demand-predict",
        live: "#"
    }
];

const projectsGrid = document.getElementById('projects-grid');
if (projectsGrid) {
    projectsData.forEach((proj, idx) => {
        const delay = (idx % 3) * 0.1 + 's'; // Stagger effect for grid rows
        const html = `
            <div class="project-card fade-in-up" style="transition-delay: ${delay}">
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
                    <div class="project-links" style="display: flex; gap: 1rem; margin-top: auto; padding-top: 1rem;">
                        <a href="${proj.live}" target="_blank" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.75rem;">Live Demo</a>
                        <a href="${proj.github}" target="_blank" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem;"><i class="fab fa-github"></i> Code</a>
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
