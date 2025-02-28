import { useEffect, useRef } from 'react';
import styles from './RainCanvas.module.css';

const RainCanvas = () => {
    const canvasRef = useRef(null);
    const dropsRef = useRef([]);

    const initDrops = (canvas) => {
        dropsRef.current = [];
        const numberOfDrops = canvas.width / 15;
        for (let i = 0; i < numberOfDrops; i++) {
            dropsRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 3 + Math.random() * 5,
                length: 10 + Math.random() * 20
            });
        }
    };

    const draw = (canvas, ctx) => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        dropsRef.current.forEach(drop => {
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            
            drop.y += drop.speed;
            if (drop.y > canvas.height) {
                drop.y = 0;
                drop.x = Math.random() * canvas.width;
            }
        });
        
        ctx.stroke();
        requestAnimationFrame(() => draw(canvas, ctx));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDrops(canvas);
        };

        resizeCanvas();
        draw(canvas, ctx);

        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return <canvas ref={canvasRef} className={styles.rainCanvas} />;
};

export default RainCanvas;
