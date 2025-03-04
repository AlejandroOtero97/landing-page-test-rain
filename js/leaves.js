class Leaf {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.size = Math.random() * 15 + 5; // Tamaño entre 5 y 20
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.image = new Image();
        this.image.src = './images/leaf.png'; // Asegúrate de tener esta imagen
        this.accumulated = false;
        this.accumulationTime = 0;
        this.maxAccumulationTime = Math.random() * 9000 + 4000; // 1-3 segundos
        this.opacity = 1;
    }

    reset() {
        this.accumulated = false;
        this.accumulationTime = 0;
        this.opacity = 1;
        this.x = Math.random() * this.canvas.width;
        this.y = -20;
        this.speed = Math.random() * 1 + 0.5;
        this.swing = Math.random() * 2 * Math.PI;
        this.swingSpeed = Math.random() * 0.02;
    }

    update() {
        if (this.accumulated) {
            this.accumulationTime += 16; // ~16ms por frame
            if (this.accumulationTime >= this.maxAccumulationTime) {
                this.opacity -= 0.02;
                if (this.opacity <= 0) {
                    this.reset();
                }
            }
            return;
        }

        this.y += this.speed;
        this.x += Math.sin(this.swing) * 0.5;
        this.swing += this.swingSpeed;
        this.rotation += this.rotationSpeed;

        if (this.y > this.canvas.height - this.size/2) {
            this.y = this.canvas.height - this.size/2;
            this.accumulated = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            this.image,
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.restore();
    }
}

class LeavesAnimation {
    constructor() {
        this.canvas = document.getElementById('leavesCanvas');
        if (!this.canvas) {
            console.error('No se encontró el canvas de hojas');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.section3 = document.getElementById('section3');
        if (!this.section3) {
            console.error('No se encontró la sección 3');
            return;
        }
        
        // Asegurarse que la imagen está cargada antes de empezar
        const leaf = new Image();
        leaf.src = './images/leaf.png';
        leaf.onload = () => {
            this.leaves = [];
            this.resizeCanvas();
            this.initLeaves();
            window.addEventListener('resize', () => this.resizeCanvas());
            this.animate();
        };
    }

    resizeCanvas() {
        const section3Rect = this.section3.getBoundingClientRect();
        this.canvas.width = section3Rect.width;
        this.canvas.height = window.innerHeight;
        this.canvas.style.left = '0';
    }

    initLeaves() {
        const numberOfLeaves = 40;
        for (let i = 0; i < numberOfLeaves; i++) {
            this.leaves.push(new Leaf(this.canvas));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const leaf of this.leaves) {
            leaf.update();
            leaf.draw(this.ctx);
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Iniciar la animación cuando se carga la página
window.addEventListener('load', () => {
    new LeavesAnimation();
});
