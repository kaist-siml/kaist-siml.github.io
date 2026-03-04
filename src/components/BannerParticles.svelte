<script>
    import { onMount } from 'svelte';

    let canvas;
    let ctx;
    let animationId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const particleCount = 160;
    const connectionDistance = 130;
    
    // Using objects for easier interpolation
    const colors = {
        particle: { r: 255, g: 255, b: 255, a: 0.5 },
        particleHover: { r: 95, g: 190, b: 235, a: 1.0 }, // #5FBEEB (Kaist Light Blue)
        line: { r: 255, g: 255, b: 255, a: 0.3 },
        lineHover: { r: 95, g: 190, b: 235, a: 0.9 }
    };

    function interpolateColor(c1, c2, ratio) {
        const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
        const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
        const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
        const a = c1.a + (c2.a - c1.a) * ratio;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    class Particle {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.hoverRatio = 0;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > this.width) this.vx *= -1;
            if (this.y < 0 || this.y > this.height) this.vy *= -1;

            // Mouse interaction
            this.hoverRatio = 0;
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    this.hoverRatio = (mouse.radius - distance) / mouse.radius;
                    this.x -= dx * this.hoverRatio * 0.02;
                    this.y -= dy * this.hoverRatio * 0.02;
                }
            }
        }

        draw() {
            ctx.fillStyle = interpolateColor(colors.particle, colors.particleHover, this.hoverRatio);
            
            // Add true glow effect
            if (this.hoverRatio > 0) {
                ctx.shadowBlur = 15 * this.hoverRatio;
                ctx.shadowColor = `rgba(95, 190, 235, ${this.hoverRatio})`;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + (this.size * this.hoverRatio), 0, Math.PI * 2);
            ctx.fill();
            
            // Reset shadow to prevent bleeding into other drawing operations
            ctx.shadowBlur = 0;
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const maxHoverRatio = Math.max(particles[i].hoverRatio, particles[j].hoverRatio);
                    ctx.strokeStyle = interpolateColor(colors.line, colors.lineHover, maxHoverRatio);
                    
                    if (maxHoverRatio > 0) {
                        ctx.shadowBlur = 10 * maxHoverRatio;
                        ctx.shadowColor = `rgba(95, 190, 235, ${maxHoverRatio})`;
                    } else {
                        ctx.shadowBlur = 0;
                    }

                    ctx.lineWidth = (1 - distance / connectionDistance) * (1 + maxHoverRatio * 2);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    
                    ctx.shadowBlur = 0;
                }
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    function handleResize() {
        if (!canvas) return;
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        init();
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }

    onMount(() => {
        ctx = canvas.getContext('2d');
        handleResize();
        animate();

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<canvas
    bind:this={canvas}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: auto;"
></canvas>
