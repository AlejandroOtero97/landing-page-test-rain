// Agregar funcionalidad al menú hamburguesa
function initMobileMenu() {
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('show');
        });
    });
}

// Sistema de diálogos mejorado
function initDialogSystem() {
    let currentDialog = 0;
    let isAnimating = false;

    document.querySelector('.avatar-container').addEventListener('click', async function() {
        if (isAnimating) return;
        isAnimating = true;
        
        const npcAlert = document.querySelector('.npc-alert');
        const speechBubbles = document.querySelectorAll('.speech-bubble');
        
        // Ocultar todos los diálogos
        speechBubbles.forEach(bubble => {
            bubble.classList.remove('show');
            bubble.style.display = 'none';
        });
        
        // Resetear contador si llega al final
        if (currentDialog >= speechBubbles.length) {
            currentDialog = 0;
        }
        
        // Mostrar signo de exclamación
        npcAlert.classList.remove('show');
        void npcAlert.offsetWidth; // Forzar reflow
        npcAlert.classList.add('show');
        
        // Esperar a que aparezca el signo
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mostrar burbuja de diálogo
        speechBubbles[currentDialog].style.display = 'block';
        void speechBubbles[currentDialog].offsetWidth; // Forzar reflow
        speechBubbles[currentDialog].classList.add('show');
        
        // Esperar a que termine la animación
        setTimeout(() => {
            isAnimating = false;
            currentDialog++;
        }, 1500);
    });
}

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initDialogSystem();
});

// ...existing code...
function handleTransition(event) {
    // ...existing code...
    const persistentLinks = currentSection.querySelectorAll('.persistent-link');
    persistentLinks.forEach(link => {
        link.setAttribute('data-original-html', link.outerHTML);
    });
    // ...existing code...
}

function resetSection(section) {
    // ...existing code...
    const persistentLinks = section.querySelectorAll('[data-original-html]');
    persistentLinks.forEach(link => {
        link.outerHTML = link.getAttribute('data-original-html');
    });
    // ...existing code...
}
