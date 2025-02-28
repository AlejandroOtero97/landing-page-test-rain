document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    let currentSection = 'home';
    let isAnimating = false; // Flag para controlar la animación
    const ANIMATION_DURATION = 500; // Duración de la animación en ms

    function wrapLettersInSpans(element) {
        const text = element.textContent;
        element.textContent = '';
        return [...text].map((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${Math.random() * 0.3}s`;
            element.appendChild(span);
            return span;
        });
    }

    function switchSection(sectionId) {
        // Prevenir cambios si hay una animación en curso
        if (isAnimating || currentSection === sectionId) return;
        
        // Activar el flag de animación
        isAnimating = true;

        const oldSection = document.getElementById(currentSection);
        const newSection = document.getElementById(sectionId);

        // Ocultar inmediatamente la nueva sección mientras se prepara
        newSection.style.visibility = 'hidden';
        newSection.style.opacity = '0';
        newSection.classList.remove('active');

        // Preparar la sección actual para la animación
        const textElements = oldSection.querySelectorAll('h1, p');
        textElements.forEach(el => wrapLettersInSpans(el));

        // Iniciar animación de salida
        oldSection.classList.remove('active');
        oldSection.classList.add('exit');

        // Ocultar la sección anterior antes de que termine la animación
        setTimeout(() => {
            oldSection.style.visibility = 'hidden';
        }, 450); // Ligeramente antes de que termine la animación

        // Esperar a que terminen las animaciones de caída
        setTimeout(() => {
            // Limpiar la sección anterior
            oldSection.classList.remove('exit');
            oldSection.style.opacity = '0';
            
            // Restaurar contenido original
            textElements.forEach(el => {
                const originalText = [...el.querySelectorAll('span')].map(span => span.textContent).join('');
                el.textContent = originalText;
            });

            // Mostrar nueva sección
            requestAnimationFrame(() => {
                newSection.style.visibility = 'visible';
                newSection.style.opacity = '1';
                newSection.classList.add('active');
                currentSection = sectionId;
                
                // Desactivar el flag de animación después de completar todo
                setTimeout(() => {
                    isAnimating = false;
                }, 100); // Pequeño buffer adicional
            });
        }, ANIMATION_DURATION);

        // Actualizar navegación
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
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
