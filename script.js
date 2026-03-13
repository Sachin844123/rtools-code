function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    const codeText = codeElement.textContent;

    navigator.clipboard.writeText(codeText).then(() => {
        showToast();
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        fallbackCopy(codeText);
    });
}

function copyCodeOnClick(codeId) {
    const codeElement = document.getElementById(codeId);
    const codeText = codeElement.textContent;

    navigator.clipboard.writeText(codeText).then(() => {
        showToast('Code copied! Click anywhere on code to copy.');
        codeElement.classList.add('copied');
        setTimeout(() => {
            codeElement.classList.remove('copied');
        }, 300);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        fallbackCopy(codeText);
    });
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}

function showToast(message = 'Code copied to clipboard!') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.practical-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Sidebar toggle functionality
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Highlight active section in sidebar
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.practical-card');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Show/hide scroll to top button
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Progress bar
        const progressBar = document.getElementById('progressBar');
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.pageYOffset / documentHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Search functionality
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        navLinks.forEach(link => {
            const practicalName = link.getAttribute('data-practical').toLowerCase();
            if (practicalName.includes(searchTerm)) {
                link.classList.remove('hidden');
            } else {
                link.classList.add('hidden');
            }
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press 'S' to focus search
        if (e.key === 's' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            searchBox.focus();
        }
        
        // Press 'Escape' to close sidebar on mobile
        if (e.key === 'Escape') {
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
            }
            searchBox.blur();
        }
    });
});
