class Lightning {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.lastLightning = 0;
        this.minInterval = 1000; // Reducido a 1 segundo
        this.maxInterval = 8000; // Aumentado a 8 segundos
        this.opacity = 0;
        this.fadeState = 'none'; // 'none', 'fadeIn', 'fadeOut'
        this.maxOpacity = 0.2; // Reducido de 0.5
        this.lastStrike = Date.now();
        this.isActive = false; // Añadir flag de activación
    }

    createFork(startX, startY, angle, depth) {
        if (depth <= 0) return;

        const length = Math.random() * 50 + 20;
        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;

        // Dibujar el rayo
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = depth;
        this.ctx.stroke();

        // Añadir resplandor localizado con fade
        const gradient = this.ctx.createRadialGradient(
            endX, endY, 0,
            endX, endY, 120 * depth // Aumentado de 30 a 120
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.6})`); // Reducido a 60% de la opacidad
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.beginPath();
        this.ctx.fillStyle = gradient;
        this.ctx.arc(endX, endY, 120 * depth, 0, Math.PI * 2); // Aumentado de 30 a 120
        this.ctx.fill();

        // Crear ramificaciones
        if (Math.random() < 0.5) {
            this.createFork(endX, endY, angle + 0.5, depth - 1);
            this.createFork(endX, endY, angle - 0.5, depth - 1);
        }
    }

    strike() {
        this.opacity = 0;
        this.fadeState = 'fadeIn';
        this.animateFade();

        // Crear varios rayos
        const numStrikes = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numStrikes; i++) {
            const startX = Math.random() * this.canvas.width;
            this.createFork(startX, 0, Math.PI / 2, 3);
        }
    }

    animateFade() {
        if (this.fadeState === 'fadeIn') {
            this.opacity += 0.2; // Reducido de 0.3
            if (this.opacity >= this.maxOpacity) {
                this.opacity = this.maxOpacity;
                this.fadeState = 'fadeOut';
            }
        } else if (this.fadeState === 'fadeOut') {
            this.opacity -= 0.01; // Reducido de 0.02 para un fade out más suave
            if (this.opacity <= 0) {
                this.opacity = 0;
                this.fadeState = 'none';
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                return;
            }
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Generar rayos con características aleatorias
        const numStrikes = Math.floor(Math.random() * 3) + 1; // 1 a 3 rayos
        for (let i = 0; i < numStrikes; i++) {
            const startX = Math.random() * this.canvas.width;
            const depth = Math.random() * 2 + 2; // Profundidad entre 2 y 4
            const angle = (Math.PI / 2) + (Math.random() * 0.4 - 0.2); // Ángulo ligeramente variado
            this.createFork(startX, 0, angle, depth);
        }

        if (this.fadeState !== 'none') {
            requestAnimationFrame(() => this.animateFade());
        }
    }

    drawLightning() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Crear gradiente radial alrededor del rayo
        const segments = this.generateLightningPath();
        
        segments.forEach((segment, index) => {
            // Dibujar el rayo
            this.ctx.beginPath();
            this.ctx.moveTo(segment.x1, segment.y1);
            this.ctx.lineTo(segment.x2, segment.y2);
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Añadir resplandor localizado (4 veces más grande)
            const gradient = this.ctx.createRadialGradient(
                segment.x2, segment.y2, 0,
                segment.x2, segment.y2, 200 // Aumentado de 50 a 200
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(segment.x2, segment.y2, 200, 0, Math.PI * 2); // Aumentado de 50 a 200
            this.ctx.fill();
        });

        // Reducir la opacidad gradualmente
        if (this.opacity > 0) {
            this.opacity -= 0.1;
        }
    }

    animate(timestamp) {
        if (!this.isActive) return; // Si no está activo, no hacer nada
        
        const now = Date.now();
        const timeSinceLastStrike = now - this.lastStrike;
        const randomChance = Math.random();
        
        // Probabilidad variable basada en el tiempo transcurrido
        const probability = Math.min(0.3, timeSinceLastStrike / 10000);

        if (timeSinceLastStrike > this.minInterval && randomChance < probability) {
            this.strike();
            this.lastStrike = now;
            // Intervalo más aleatorio para el próximo rayo
            this.minInterval = Math.random() * (this.maxInterval - this.minInterval) + this.minInterval;
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }

    start() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.isActive = false; // Iniciar desactivado
        requestAnimationFrame(this.animate.bind(this));
    }

    // Método para activar/desactivar
    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.lastStrike = Date.now(); // Reiniciar el tiempo del último rayo
        }
    }
}
