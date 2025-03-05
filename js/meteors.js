const meteorCanvas = document.getElementById('meteorCanvas');
const meteorCtx = meteorCanvas.getContext('2d');

// Resize canvas to match section size
function resizeMeteorCanvas() {
    meteorCanvas.width = meteorCanvas.parentElement.offsetWidth;
    meteorCanvas.height = meteorCanvas.parentElement.offsetHeight;
}

resizeMeteorCanvas();
window.addEventListener('resize', resizeMeteorCanvas);

class Meteor {
    constructor() {
        this.reset();
    }

    reset() {
        this.size = Math.random() * 60 + 10;
        // Comenzar desde fuera de la pantalla, en la esquina superior izquierda
        this.x = Math.random() * (meteorCanvas.width * 0.5) - meteorCanvas.width * 0.5;
        this.y = Math.random() * (meteorCanvas.height * 0.5) - meteorCanvas.height * 0.5;
        // Reducimos la velocidad un 15%
        this.speed = (Math.random() * 2.55 + 1.7) * 0.85; // 15% más lento que antes
        this.angle = Math.PI / 3.2;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.image = new Image();
        this.image.src = './images/meteorite.png';
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed * 2;
        this.y += Math.sin(this.angle) * this.speed * 2;

        // Resetear cuando el meteoro sale completamente de la vista
        if (this.y > meteorCanvas.height + this.size || 
            this.x > meteorCanvas.width + this.size) {
            this.reset();
        }
    }

    draw() {
        meteorCtx.save();
        meteorCtx.globalAlpha = this.opacity;
        meteorCtx.drawImage(this.image, this.x, this.y, this.size, this.size);
        
        // Add a subtle glow effect
        meteorCtx.globalAlpha = this.opacity * 0.3;
        meteorCtx.shadowColor = '#fff';
        meteorCtx.shadowBlur = 20;
        meteorCtx.drawImage(this.image, this.x, this.y, this.size, this.size);
        meteorCtx.restore();
    }
}

// Aumentamos la cantidad de meteoros para mejor cobertura
const meteors = Array(15).fill().map(() => new Meteor());

function animateMeteors() {
    meteorCtx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);

    meteors.forEach(meteor => {
        meteor.update();
        meteor.draw();
    });

    requestAnimationFrame(animateMeteors);
}

animateMeteors();
