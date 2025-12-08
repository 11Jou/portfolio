// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    console.log('Form submitted:', formData);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
    successMessage.style.cssText = `
        background-color: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;

    contactForm.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Intersection Observer for Fade-in Animations
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

// Observe all sections and cards
function observeElements() {
    const animatedElements = document.querySelectorAll('.skill-category, .experience-item, .project-card, .education-card');
    animatedElements.forEach(el => {
        // Only set up animation if not already observed
        if (!el.hasAttribute('data-observed')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.setAttribute('data-observed', 'true');
            observer.observe(el);
        }
    });
}

// Initial observation
observeElements();

// Scroll to Top Button (Optional Enhancement)
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
});

// Projects Loading and Modal
const projectsGrid = document.getElementById('projects-grid');
const projectModal = document.getElementById('project-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

let projectsData = [];

// Projects data (embedded to avoid CORS issues when opening file directly)
const projectsDataJSON = {
    "projects": [
        {
            "id": 1,
            "title": "Braille Learn Platform",
            "image": "images/braille.svg",
            "description": "Braille-learn platform for Auq Basry Association, this platform is designed to assist visually impaired and blind individuals in learning Braille in both Arabic and English. The platform provides comprehensive support, including screen reading assistance, braille input support, guidance on utilizing devices like Perkins machines, and a complete learning journey for students.",
            "startDate": "2024-08",
            "endDate": "2025-02",
            "technologies": [
                "Django",
                "Celery",
                "Redis",
                "REST APIs",
                "JWT",
                "Next.js",
                "React.js",
                "Tailwind CSS",
                "MySQL",
                "Docker",
                "Hostinger VPS",
                "S3",
                "Apache",
            ],
            "status": "production",
            "demoLink": "https://braille-learn.com"
        },
        {
            "id": 2,
            "title": "Braille Dot Desktop App",
            "image": "images/Braille-Logo.png",
            "description": "Braille Dot is a desktop application designed to translate and print Braille documents using supported Braille embosser machines. It is built for organizations and associations that specialize in producing Braille materials, helping them streamline and simplify the Braille printing process.",
            "startDate": "2025-05",
            "endDate": "2025-11",
            "status": "production",
            "technologies": [
                "C#",
                ".NET",
                "Avalonia",
                "CI/CD",
                "InnoSetup",
                "Apple Developer",
            ],
            "demoLink": "https://braille-dot.com"
        },
        {
            "id": 3,
            "title": "Green Saudi",
            "image": "images/green.png",

            "description": "Green Saudi is an environmental awareness and engagement application designed to promote tree planting, sustainability, and community participation across Saudi Arabia. The app allows users to explore suitable tree types for different regions, locate nearby nurseries, track planting progress, participate in volunteering activities, and access educational content.",
            "startDate": "2025-05",
            "endDate": "2025-11",
            "technologies": [
                "Java Spring Boot",
                "JPA",
                "JWT",
                "REST APIs",
                "MySQL",
                "React Admin",
                "Flutter",
                "Google Maps API",
                "Docker",
                "Hostinger VPS",
                "Apache",
            ],
            "status": "completed",
            "demoLink": "https://mubsiroun.my.canva.site/saudi-green-tester"
        },
        {
            "id": 4,
            "title": "Digital Immunity Website",
            "image": "images/logo.png",
            "description": "Digital Immunity is a website designed to provide information and resources about the digital immunity company.",
            "startDate": "2025-11",
            "endDate": "2025-12",
            "technologies": ["Django", "HTML", "CSS", "JavaScript", "sqlite", "Google Recaptcha", "Hostinger VPS", "Nginx"],
            "status": "production",
            "demoLink": "https://digital-immunity.io"
        },
        {
            "id": 5,
            "title": "Trading Academy",
            "image": "images/no.png",
            "description": "Web application for a trading education academy, offering personalized dashboards for users to track sales performance, progress, and rankings.",
            "startDate": "2024-01",
            "endDate": "2024-03",
            "technologies": ["Django", "HTML", "CSS", "JavaScript", "Mysql", "Digital Ocean App Platform"],
            "status": "completed",
            "demoLink": "#"
        }
    ]
};

// Format date from YYYY-MM to readable format
function formatDate(dateString) {
    const [year, month] = dateString.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

// Format status badge
function getStatusBadge(status) {
    if (!status) return '';

    const statusLower = status.toLowerCase().trim();
    let statusClass = 'status-';
    let statusText = status;

    if (statusLower === 'under dev' || statusLower === 'under development' || statusLower === 'development') {
        statusClass += 'under-dev';
        statusText = 'Under Development';
    } else if (statusLower === 'completed' || statusLower === 'done' || statusLower === 'finished') {
        statusClass += 'completed';
        statusText = 'Completed';
    } else if (statusLower === 'production' || statusLower === 'live' || statusLower === 'deployed') {
        statusClass += 'production';
        statusText = 'Production';
    } else {
        statusClass += 'default';
    }

    return `<span class="project-status ${statusClass}">${statusText}</span>`;
}

// Load projects from embedded data
function loadProjects() {
    try {
        projectsData = projectsDataJSON.projects;
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Failed to load projects. Please try again later.</p>';
    }
}

// Render projects to the grid
function renderProjects() {
    projectsGrid.innerHTML = '';

    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            ${project.image ? `<div class="project-image-container"><img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'"></div>` : ''}
            <h3>${project.title}</h3>
            ${getStatusBadge(project.status)}
            <p>${project.description}</p>
            <div class="project-date">
                <span>${formatDate(project.startDate)}</span>
                <span>-</span>
                <span>${formatDate(project.endDate)}</span>
            </div>
            <div class="project-links">
                <a href="#" class="project-link read-more-btn" data-project-id="${project.id}">Read More</a>
                ${project.demoLink !== '#' ? `<a href="${project.demoLink}" class="project-link" target="_blank">View Project</a>` : ''}
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Add event listeners to "Read More" buttons
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = parseInt(btn.getAttribute('data-project-id'));
            openModal(projectId);
        });
    });

    // Observe newly loaded project cards
    observeElements();
}

// Open modal with project details
function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        ${getStatusBadge(project.status)}
        <div class="modal-date">${formatDate(project.startDate)} - ${formatDate(project.endDate)}</div>
        <div class="modal-description">${project.description}</div>
        <div class="modal-tech">
            <h3>Technologies Used</h3>
            <div class="modal-tech-tags">
                ${project.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="modal-links">
            ${project.demoLink !== '#' ? `<a href="${project.demoLink}" class="modal-link" target="_blank">View Project</a>` : ''}
        </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// Load projects when page loads
loadProjects();

