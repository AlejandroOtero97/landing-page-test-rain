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
