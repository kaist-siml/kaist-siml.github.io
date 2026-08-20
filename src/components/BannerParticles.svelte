<script>
    import { onMount } from 'svelte';
    import { subscribeReducedMotion } from 'utils/motion.js';

    let { people = [] } = $props();
    let canvas;
    let ctx;
    let animationId;
    let particles = [];
    let canvasWidth = 0;
    let canvasHeight = 0;
    let canvasRect;
    let selectedParticle;
    let selectionTimer;
    let nameTag = $state();
    let keyboardPersonIndex = -1;
    let announcedName = $state('');
    const mouse = { x: null, y: null, radius: 150 };

    let reducedMotion = false;
    let canvasVisible = true;
    let documentVisible = true;
    const connectionDistance = 130;
    
    const colors = {
        particle: { r: 225, g: 228, b: 235, a: 0.5 },
        particleHover: { r: 95, g: 190, b: 235, a: 1.0 },
        line: { r: 225, g: 228, b: 235, a: 0.3 },
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
        constructor(width, height, person = null) {
            this.width = width;
            this.height = height;
            this.person = person;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = person ? Math.random() * 1.4 + 1.8 : Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.hoverRatio = 0;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > this.width) this.vx *= -1;
            if (this.y < 0 || this.y > this.height) this.vy *= -1;

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
            
            if (this.hoverRatio > 0) {
                ctx.shadowBlur = 15 * this.hoverRatio;
                ctx.shadowColor = `rgba(95, 190, 235, ${this.hoverRatio})`;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + (this.size * this.hoverRatio), 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
    }

    function init(width, height) {
        selectedParticle = undefined;
        announcedName = '';
        window.clearTimeout(selectionTimer);
        particles = Array.from(
            { length: people.length },
            (_, index) => new Particle(width, height, people[index] || null)
        );
    }

    function drawSelectedName() {
        if (!selectedParticle?.person) return;

        const particle = selectedParticle;
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(95, 190, 235, .8)';
        ctx.strokeStyle = 'rgba(95, 190, 235, 1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(7, particle.size + 5), 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font = '700 13px Rubik, sans-serif';
        const labelWidth = Math.ceil(ctx.measureText(particle.person).width) + 24;
        const labelHeight = 30;
        const placeLeft = particle.x > canvasWidth * .58;
        const preferredX = placeLeft
            ? particle.x - labelWidth - 14
            : particle.x + 14;
        const labelX = Math.max(8, Math.min(canvasWidth - labelWidth - 8, preferredX));
        const safeTop = canvasWidth < 720 ? 76 : 88;
        const preferredY = particle.y - labelHeight - 14;
        const labelY = preferredY >= safeTop
            ? preferredY
            : Math.min(canvasHeight - labelHeight - 8, particle.y + 14);

        if (nameTag) nameTag.style.transform = `translate3d(${labelX}px, ${labelY}px, 0)`;
        ctx.restore();
    }

    function animate() {
        animationId = undefined;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distanceSquared = dx * dx + dy * dy;

                if (distanceSquared < connectionDistance * connectionDistance) {
                    const distance = Math.sqrt(distanceSquared);
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

        drawSelectedName();

        if (!reducedMotion && canvasVisible && documentVisible) {
            animationId = requestAnimationFrame(animate);
        }
    }

    function syncAnimation() {
        cancelAnimationFrame(animationId);
        animationId = undefined;
        if (!ctx || canvasWidth === 0 || canvasHeight === 0) return;
        animate();
    }

    function handleResize() {
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        canvasRect = { left: rect.left + window.scrollX, top: rect.top + window.scrollY };
        canvasWidth = parent.clientWidth;
        canvasHeight = parent.clientHeight;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(canvasWidth * pixelRatio);
        canvas.height = Math.round(canvasHeight * pixelRatio);
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        if (canvasWidth > 0 && canvasHeight > 0) {
            init(canvasWidth, canvasHeight);
            syncAnimation();
        }
    }

    function findPersonParticle(x, y, hitRadius = 20) {
        let closest;
        let closestDistance = hitRadius * hitRadius;

        for (const particle of particles) {
            if (!particle.person) continue;
            const dx = x - particle.x;
            const dy = y - particle.y;
            const distance = dx * dx + dy * dy;
            if (distance <= closestDistance) {
                closest = particle;
                closestDistance = distance;
            }
        }

        return closest;
    }

    function getPointerPosition(event) {
        if (!canvasRect) return null;
        return {
            x: event.clientX + window.scrollX - canvasRect.left,
            y: event.clientY + window.scrollY - canvasRect.top
        };
    }

    function selectParticle(particle) {
        if (!particle?.person) return;
        selectedParticle = particle;
        announcedName = particle.person;
        window.clearTimeout(selectionTimer);
        selectionTimer = window.setTimeout(() => {
            selectedParticle = undefined;
            announcedName = '';
            syncAnimation();
        }, 3000);
        syncAnimation();
    }

    function handlePointerMove(event) {
        if (!canvasVisible) return;
        const position = getPointerPosition(event);
        if (!position) return;
        mouse.x = position.x;
        mouse.y = position.y;
    }

    function handleCanvasClick(event) {
        const position = getPointerPosition(event);
        if (!position) return;
        selectParticle(findPersonParticle(position.x, position.y));
    }

    function handleCanvasKeydown(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        const personParticles = particles.filter(particle => particle.person);
        if (personParticles.length === 0) return;
        keyboardPersonIndex = (keyboardPersonIndex + 1) % personParticles.length;
        selectParticle(personParticles[keyboardPersonIndex]);
    }

    function handleMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }

    onMount(() => {
        ctx = canvas.getContext('2d');
        if (!ctx) return;

        const parent = canvas.parentElement;
        const handleVisibilityChange = () => {
            documentVisible = !document.hidden;
            syncAnimation();
        };
        const resizeObserver = new ResizeObserver(handleResize);
        const visibilityObserver = new IntersectionObserver(entries => {
            canvasVisible = entries[0]?.isIntersecting ?? true;
            syncAnimation();
        });

        documentVisible = !document.hidden;
        if (parent) {
            resizeObserver.observe(parent);
            parent.addEventListener('pointermove', handlePointerMove, { passive: true });
            parent.addEventListener('pointerleave', handleMouseLeave);
        }
        visibilityObserver.observe(canvas);
        const unsubscribeMotion = subscribeReducedMotion(value => {
            reducedMotion = value;
            syncAnimation();
        });
        document.addEventListener('visibilitychange', handleVisibilityChange);
        handleResize();

        return () => {
            cancelAnimationFrame(animationId);
            window.clearTimeout(selectionTimer);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            unsubscribeMotion();
            parent?.removeEventListener('pointermove', handlePointerMove);
            parent?.removeEventListener('pointerleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    });
</script>

<canvas
    bind:this={canvas}
    role="button"
    tabindex="0"
    aria-label={`Interactive lab constellation with ${people.length} researchers. Select a dot or press Enter to reveal a name.`}
    data-people-count={people.length}
    onclick={handleCanvasClick}
    onkeydown={handleCanvasKeydown}
></canvas>
<span
    bind:this={nameTag}
    class="particle-name-tag"
    class:visible={Boolean(announcedName)}
    aria-hidden="true"
>{announcedName}</span>
<span class="particle-announcement" aria-live="polite" aria-atomic="true">{announcedName}</span>

<style>
    canvas {
        position: absolute;
        inset: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: auto;
    }

    canvas:focus-visible {
        outline: 2px solid rgba(95, 190, 235, .9);
        outline-offset: -5px;
    }

    .particle-name-tag {
        position: absolute;
        z-index: 4;
        top: 0;
        left: 0;
        padding: 6px 12px;
        pointer-events: none;
        border: 1px solid rgba(95, 190, 235, .75);
        border-radius: 8px;
        opacity: 0;
        color: #E1E4EB;
        background: rgba(0, 65, 145, .96);
        box-shadow: 0 6px 18px rgba(26, 26, 26, .24);
        font-size: 13px;
        font-weight: 700;
        line-height: 16px;
        white-space: nowrap;
        transition: opacity .15s ease;
    }

    .particle-name-tag.visible { opacity: 1; }

    .particle-announcement {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
    }
</style>
