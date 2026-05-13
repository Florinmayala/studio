
"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface ConfettiRef {
  fire: () => void;
}

const ConfettiCanvas = forwardRef<ConfettiRef>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  class Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    angle: number;
    spin: number;
    color: string;
    vx: number;
    vy: number;
    opacity: number;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth;
      this.y = -10;
      this.size = Math.random() * 10 + 5;
      this.speed = Math.random() * 3 + 2;
      this.angle = Math.random() * 360;
      this.spin = Math.random() * 5 - 2.5;
      this.opacity = 1;
      
      const colors = ['#E63946', '#FFD700', '#E6399D', '#FFB3B8', '#FFFFFF'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = Math.random() * 10 + 5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.spin;
      this.vy += 0.1; // gravity
      if (this.y > window.innerHeight) {
        this.opacity -= 0.01;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      
      if (Math.random() > 0.5) {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  const fire = () => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current;
    for (let i = 0; i < 150; i++) {
      particles.current.push(new Particle(width, height));
    }
  };

  useImperativeHandle(ref, () => ({
    fire
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current = particles.current.filter(p => p.opacity > 0);
      
      particles.current.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
});

ConfettiCanvas.displayName = 'ConfettiCanvas';

export default ConfettiCanvas;
