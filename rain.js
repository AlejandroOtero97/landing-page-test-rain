const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pixelSize = 3;
const dropColors = ['#ffffff', '#cccccc', '#999999', '#666666'];

class Splash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
        this.alpha = 1;
    }

    createParticles() {
        for (let i = 0; i < 3; i++) {
            this.particles.push({
                x: this.x,
                y: this.y,
                speedX: (Math.random() - 0.5) * 3,
                speedY: -Math.random() * 2,
                size: Math.random() * 1.5
            });
        }
    }

    update() {
        this.alpha -= 0.05;
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.speedY += 0.1;
        });
        return this.alpha > 0;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(174, 194, 224, ${this.alpha})`;
        this.particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

class RainDrop {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.floor(Math.random() * canvas.width / pixelSize) * pixelSize;
        this.y = -20;
        this.speed = (Math.random() * 2.4 + 1.6);
        this.length = Math.floor(Math.random() * 15 + 5) * pixelSize;
        this.color = dropColors[Math.floor(Math.random() * dropColors.length)];
        this.hasSplashed = false;
    }

    update() {
        this.y += this.speed * pixelSize;

        // Solo verificar colisión con el footer
        const footerElement = document.querySelector('.footer');
        if (footerElement) {
            const footerTop = window.innerHeight - footerElement.offsetHeight;
            if (this.y > footerTop && !this.hasSplashed) {
                this.hasSplashed = true;
                return new Splash(this.x, footerTop);
            }
        }
        
        if (this.y > canvas.height) {
            this.reset();
        }
        return null;
    }

    draw() {
        // Dibujar gotas como líneas rectas simples
        const gradient = ctx.createLinearGradient(
            this.x, 
            this.y, 
            this.x, 
            this.y + this.length
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.lineWidth = pixelSize;
        ctx.strokeStyle = gradient;
        ctx.stroke();
    }
}

class Rain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drops = [];
        this.splashes = [];
        
        // Crear gotas iniciales
        for (let i = 0; i < 120; i++) {
            this.drops.push(new RainDrop());
        }
    }

    update() {
        // Actualizar gotas y recolectar nuevas salpicaduras
        for (let i = this.drops.length - 1; i >= 0; i--) {
            const splash = this.drops[i].update();
            if (splash) {
                this.splashes.push(splash);
            }
        }

        // Actualizar salpicaduras
        this.splashes = this.splashes.filter(splash => splash.update());

        // Mantener el número de gotas constante
        while (this.drops.length < 120) {
            this.drops.push(new RainDrop());
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar gotas
        this.drops.forEach(drop => drop.draw());
        
        // Dibujar salpicaduras
        this.splashes.forEach(splash => splash.draw(this.ctx));
    }
}

const rain = new Rain(canvas);

function animate() {
    rain.update();
    rain.draw();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
});

function resizeCanvas() {
    const section = document.getElementById('section4');
    canvas.width = section.offsetWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
animate();
