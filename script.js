document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const yearSpan = document.getElementById('tahun');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Update tahun di footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Efek scroll pada navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }

        // Active link on scroll
        let current = "hero"; // Default ke hero jika di paling atas
        const mainSections = document.querySelectorAll('header, section, footer'); // Ambil semua elemen utama untuk deteksi scroll
        const navbarHeight = navbar ? navbar.offsetHeight : 70; // Default height jika navbar belum termuat

        mainSections.forEach(section => {
            if (section.id) { // Hanya proses jika section punya ID
                const sectionTop = section.offsetTop - navbarHeight - 50;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Periksa apakah href ada dan tidak kosong sebelum mengambil substring
            const hrefAttr = link.getAttribute('href');
            if (hrefAttr && hrefAttr.length > 1 && hrefAttr.substring(1) === current) {
                link.classList.add('active');
            }
        });
         // Jika di paling atas sekali (window.scrollY === 0), aktifkan link Beranda secara eksplisit
        if (window.scrollY < (document.getElementById('tentang')?.offsetTop - navbarHeight - 50 || 200) ) { // Cek sebelum section 'tentang'
            navLinks.forEach(link => link.classList.remove('active'));
            const heroLink = document.querySelector('.nav-menu a[href="#hero"]');
            if (heroLink) heroLink.classList.add('active');
        }
    });

    // Toggle menu hamburger
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Tutup menu ketika link di klik (untuk mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Kursor kustom
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }
        if (cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 300, fill: "forwards" });
        }
    });

    const interactiveElements = document.querySelectorAll('a, button, .proyek-item, input, textarea, .hamburger');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--secondary-color)';
            }
            if (cursorDot) {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--accent-color)';
            }
            if (cursorDot) {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });

    // Animasi Entri untuk Section saat Scroll
    const sectionsToAnimate = document.querySelectorAll('.section-animate, .section-animate-left, .section-animate-right');

    if (sectionsToAnimate.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // picu saat 10% elemen terlihat (sesuaikan jika perlu)
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        sectionsToAnimate.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}); // Pastikan hanya ada satu penutup untuk DOMContentLoaded