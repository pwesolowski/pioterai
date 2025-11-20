"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

const IntroBanner: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);
    const mousePos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

    const initParticles = (width: number, height: number) => {
        const count = Math.min(100, (width * height) / 10000); // Responsive particle count
        particles.current = [];
        for (let i = 0; i < count; i++) {
            particles.current.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 2 + 1
            });
        }
    };

    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Clear with trail effect
        ctx.fillStyle = 'rgba(2, 6, 23, 0.2)'; // Very dark slate with opacity for trail
        ctx.fillRect(0, 0, width, height);

        // Update and draw particles
        particles.current.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Draw Particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d4'; // Cyan-500
            ctx.fill();

            // Connect to nearby particles (Neural Net effect)
            for (let j = i + 1; j < particles.current.length; j++) {
                const p2 = particles.current[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(6, 182, 212, ${1 - dist / 120})`; // Fade out
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            // Mouse interaction
            const dx = mousePos.current.x - p.x;
            const dy = mousePos.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 200})`; // Blue-500
                ctx.lineWidth = 0.8;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mousePos.current.x, mousePos.current.y);
                ctx.stroke();
            }
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                canvas.width = width;
                canvas.height = height;
                initParticles(width, height);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        const render = () => {
            draw(ctx, canvas.width, canvas.height);
            animationFrameId.current = requestAnimationFrame(render);
        };

        render();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId.current);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[400px] bg-slate-950 rounded-xl overflow-hidden border border-cyan-900/50 shadow-[0_0_40px_rgba(6,182,212,0.1)] group">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
                <div className="relative">
                    <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                    <h1 className="relative font-futuristic text-6xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                        pioter.ai
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default IntroBanner;
