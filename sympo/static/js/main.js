document.addEventListener('DOMContentLoaded', function () {
    /* =========================================
       1. Theme Toggle Logic
    ========================================= */
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function (e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    /* =========================================
       2. SPA Navigation & Hamburger Logic
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-register), .logo-container');
    const sections = document.querySelectorAll('.page-section');

    // Toggle Mobile Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Handle Navigation Clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Get target ID from data attribute
            const targetId = this.getAttribute('data-target');
            if (!targetId) return;

            e.preventDefault();

            // 1. Update Active Nav Link
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }

            // 2. Hide all sections, show target section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.classList.add('active');
            }

            // 3. Close mobile menu if open
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }

            // 4. Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    /* =========================================
       3. Countdown Timer
    ========================================= */
    const countDownDate = new Date("Apr 8, 2026 09:00:00").getTime();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) {
        const timer = setInterval(function () {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerHTML = days.toString().padStart(2, '0');
            hoursEl.innerHTML = hours.toString().padStart(2, '0');
            minutesEl.innerHTML = minutes.toString().padStart(2, '0');
            secondsEl.innerHTML = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(timer);
                daysEl.innerHTML = "00"; hoursEl.innerHTML = "00";
                minutesEl.innerHTML = "00"; secondsEl.innerHTML = "00";
            }
        }, 1000);
    }

    /* =========================================
       4. Format Description as List
    ========================================= */
    const descElements = document.querySelectorAll('.event-desc');
    descElements.forEach(desc => {
        let text = desc.textContent.trim();
        if (text) {
            // Split by newline or period (if followed by space or end of string)
            const points = text.split(/\n|\.\s+|\.$/).filter(p => p.trim().length > 0);
            
            if (points.length > 0) {
                const ul = document.createElement('ul');
                ul.className = 'event-desc-list';
                
                points.forEach(point => {
                    const li = document.createElement('li');
                    let liText = point.trim();
                    if (!/[.!?]$/.test(liText)) {
                        liText += '.';
                    }
                    li.textContent = liText;
                    ul.appendChild(li);
                });
                
                desc.replaceWith(ul);
            }
        }
    });
});