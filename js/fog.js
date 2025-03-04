class Fog {
    constructor(x, y, tamanho, direction, velocity, canvas) {
        this.x = x;
        this.y = y;
        this.width = tamanho.w;
        this.height = tamanho.h;
        this.me = document.createElement("div");
        this.direction = direction;
        this.velocity = velocity;
        this.canvas = canvas;
    }

    create() {
        this.me.style.width = this.width + "px";
        this.me.style.height = this.height + "px";
        this.me.style.backgroundColor = "#b3b8bb";
        this.me.style.position = "absolute";
        this.me.style.opacity = 0.4; // Reducido de 0.7
        this.me.style.filter = "blur(40px)";
        this.canvas.appendChild(this.me);
        this.me.style.borderRadius = "120%";
    }

    animation() {
        this.me.style.left = this.x + "px";
        this.me.style.top = this.y + "px";
        
        this.x -= this.velocity;
        if (this.x + this.width < 0) {
            this.x = this.canvas.clientWidth + this.width;
        }
    }
}

// Inicializar efecto de niebla
function initFog() {
    // Crear el canvas para la niebla
    const section2 = document.getElementById('section2');
    const fogCanvas = document.createElement('div');
    fogCanvas.id = 'fogCanvas';
    section2.appendChild(fogCanvas);

    // Ajustamos las posiciones y tamaños para cubrir toda la sección
    const fogInstances = [
        // Capa superior
        new Fog(200, 0, { w: 300, h: 300 }, 0, 0.5, fogCanvas),
        new Fog(600, 50, { w: 250, h: 250 }, 0, 0.4, fogCanvas),
        new Fog(0, 100, { w: 400, h: 300 }, 0, 0.3, fogCanvas),
        
        // Capa media
        new Fog(300, 350, { w: 350, h: 300 }, 0, 0.6, fogCanvas),
        new Fog(0, 400, { w: 280, h: 250 }, 0, 0.5, fogCanvas),
        new Fog(600, 450, { w: 320, h: 280 }, 0, 0.4, fogCanvas),
        
        // Capa inferior
        new Fog(150, 700, { w: 300, h: 300 }, 0, 0.3, fogCanvas),
        new Fog(500, 750, { w: 350, h: 350 }, 0, 0.4, fogCanvas),
        new Fog(0, 800, { w: 400, h: 300 }, 0, 0.5, fogCanvas),
        
        // Capas adicionales para llenar espacios
        new Fog(200, 250, { w: 280, h: 250 }, 0, 0.4, fogCanvas),
        new Fog(400, 600, { w: 320, h: 280 }, 0, 0.5, fogCanvas),
        new Fog(100, 550, { w: 300, h: 300 }, 0, 0.3, fogCanvas)
    ];

    function animateFog() {
        fogInstances.forEach((fog) => {
            if (!fog.initialized) {
                fog.create();
                fog.initialized = true;
            }
            fog.animation();
        });
        requestAnimationFrame(animateFog);
    }

    animateFog();
}

// Iniciar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initFog);
