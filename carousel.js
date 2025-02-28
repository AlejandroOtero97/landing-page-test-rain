document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    let currentSection = 'home';

    function switchSection(sectionId) {
        if (currentSection === sectionId) return;

        // Remove active class from current section and add exit animation
        const oldSection = document.getElementById(currentSection);
        oldSection.classList.remove('active');
        oldSection.classList.add('exit');

        // Reset new section position
        const newSection = document.getElementById(sectionId);
        newSection.style.transition = 'none';
        newSection.classList.remove('exit');
        newSection.classList.remove('active');
        
        // Force reflow
        void newSection.offsetWidth;
        
        // Re-enable transition and activate new section
        newSection.style.transition = '';
        newSection.classList.add('active');

        // Update current section
        currentSection = sectionId;

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        // Cleanup old section after animation
        setTimeout(() => {
            oldSection.classList.remove('exit');
        }, 500);
    }

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            switchSection(sectionId);
        });
    });

    // Initialize sections
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.remove('exit');
    });
    
    // Set home as active section
    document.getElementById('home').classList.add('active');
    document.querySelector('a[href="#home"]').classList.add('active');
    currentSection = 'home';
});
