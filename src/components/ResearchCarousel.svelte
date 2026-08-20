<script>
    import { onMount, tick, untrack } from 'svelte';
    import { slide } from 'svelte/transition';
    import { subscribeReducedMotion } from 'utils/motion.js';

    let { areas } = $props();
    let viewport;
    let track;
    let autoplayTimer;
    let transitionTimer;
    let interactionTimer;
    let reduceMotion = $state(false);
    let carouselReady = $state(false);
    let autoplayPaused = $state(false);
    let transitionEnabled = $state(false);
    let offset = $state(0);
    let orderedAreas = $state(untrack(() => areas.map((area, index) => ({
        ...area,
        originalIndex: index,
        number: String(index + 1).padStart(2, '0')
    }))));
    let expandedIndex = $state(null);
    let announcedIndex = $state(0);
    let visibleCount = $state(3);
    let detailTrigger;
    let detailCloseButton = $state();
    let animating = false;
    let dragging = $state(false);
    let suppressDetailClick = false;
    let dragPointerId;
    let dragCaptureTarget;
    let dragStartX = 0;
    let dragDistance = 0;
    let dragStep = 0;

    const waitForTransition = () => new Promise(resolve => {
        window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(resolve, reduceMotion ? 0 : 850);
    });

    const getStep = () => {
        const card = track?.querySelector('.research-card');
        if (!card) return 0;
        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
        return card.getBoundingClientRect().width + gap;
    };

    const updateVisibleCount = () => {
        const step = getStep();
        if (!step || !viewport) return;
        visibleCount = Math.max(1, Math.round(viewport.clientWidth / step));
    };

    const rotateLeft = (count = 1) => {
        const split = count % orderedAreas.length;
        orderedAreas = [...orderedAreas.slice(split), ...orderedAreas.slice(0, split)];
    };

    const rotateRight = () => {
        orderedAreas = [orderedAreas.at(-1), ...orderedAreas.slice(0, -1)];
    };

    const stopAutoplay = () => {
        window.clearTimeout(autoplayTimer);
        autoplayTimer = undefined;
    };

    const scheduleAutoplay = () => {
        stopAutoplay();
        if (reduceMotion || autoplayPaused || expandedIndex !== null || document.hidden) return;
        autoplayTimer = window.setTimeout(() => advance(1), 4500);
    };

    const animateOffset = async target => {
        transitionEnabled = true;
        await tick();
        track.getBoundingClientRect();
        offset = target;
        await waitForTransition();
        transitionEnabled = false;
    };

    const advance = async direction => {
        if (animating || dragging || expandedIndex !== null || orderedAreas.length < 2) return;
        const step = getStep();
        if (!step) return;

        animating = true;
        stopAutoplay();

        if (direction > 0) {
            await animateOffset(-step);
            rotateLeft();
            offset = 0;
        } else {
            rotateRight();
            offset = -step;
            await tick();
            track.getBoundingClientRect();
            await animateOffset(0);
        }

        await tick();
        announcedIndex = orderedAreas[0].originalIndex;
        animating = false;
        scheduleAutoplay();
    };

    const toggleAutoplay = () => {
        autoplayPaused = !autoplayPaused;
        if (autoplayPaused) stopAutoplay();
        else scheduleAutoplay();
    };

    const closeDetail = async () => {
        if (expandedIndex === null) return;
        expandedIndex = null;
        await tick();
        const focusTarget = detailTrigger && !detailTrigger.inert ? detailTrigger : viewport;
        focusTarget?.focus();
        scheduleAutoplay();
    };

    const toggleDetail = async (index, trigger) => {
        if (expandedIndex === index) {
            await closeDetail();
            return;
        }
        if (suppressDetailClick) {
            suppressDetailClick = false;
            return;
        }
        stopAutoplay();
        detailTrigger = trigger;
        expandedIndex = index;
        await tick();
        detailCloseButton?.focus();
    };

    const startDrag = event => {
        if (animating || dragPointerId !== undefined || expandedIndex !== null || event.button !== 0) return;
        dragStep = getStep();
        if (!dragStep) return;

        stopAutoplay();
        dragPointerId = event.pointerId;
        dragStartX = event.clientX;
        dragDistance = 0;
        transitionEnabled = false;
        dragCaptureTarget = event.target.closest?.('.research-card') || viewport;
        dragCaptureTarget.setPointerCapture?.(event.pointerId);
        window.clearTimeout(interactionTimer);
        interactionTimer = window.setTimeout(() => finishDrag(event, true), 8000);
    };

    const moveDrag = async event => {
        if (event.pointerId !== dragPointerId) return;
        dragDistance = event.clientX - dragStartX;

        if (!dragging) {
            if (Math.abs(dragDistance) < 6) return;
            dragging = true;
            rotateRight();
            offset = -dragStep;
            await tick();
        }

        offset = -dragStep + dragDistance;
    };

    const finishDrag = async (event, cancelled = false) => {
        if (dragPointerId === undefined || event.pointerId !== dragPointerId) return;
        const wasDragGesture = dragging;
        dragging = false;
        window.clearTimeout(interactionTimer);
        if (dragCaptureTarget?.hasPointerCapture?.(dragPointerId)) dragCaptureTarget.releasePointerCapture(dragPointerId);

        if (!wasDragGesture) {
            dragPointerId = undefined;
            dragCaptureTarget = undefined;
            scheduleAutoplay();
            return;
        }

        const threshold = Math.min(90, dragStep * .2);
        suppressDetailClick = true;
        window.setTimeout(() => suppressDetailClick = false, 0);
        animating = true;
        if (!cancelled && dragDistance > threshold) {
            await animateOffset(0);
        } else if (!cancelled && dragDistance < -threshold) {
            await animateOffset(-dragStep * 2);
            rotateLeft(2);
            offset = 0;
        } else {
            await animateOffset(-dragStep);
            rotateLeft();
            offset = 0;
        }

        await tick();
        announcedIndex = orderedAreas[0].originalIndex;
        animating = false;
        dragPointerId = undefined;
        dragCaptureTarget = undefined;
        scheduleAutoplay();
    };

    const handleKeydown = event => {
        if (event.key === 'Escape' && expandedIndex !== null) closeDetail();
    };

    onMount(() => {
        const handleVisibilityChange = () => scheduleAutoplay();
        const resizeObserver = new ResizeObserver(updateVisibleCount);

        const unsubscribeMotion = subscribeReducedMotion(value => {
            reduceMotion = value;
            if (value) transitionEnabled = false;
            scheduleAutoplay();
        });
        document.addEventListener('visibilitychange', handleVisibilityChange);
        resizeObserver.observe(viewport);
        updateVisibleCount();
        scheduleAutoplay();
        carouselReady = true;

        return () => {
            stopAutoplay();
            window.clearTimeout(transitionTimer);
            window.clearTimeout(interactionTimer);
            resizeObserver.disconnect();
            unsubscribeMotion();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    });
</script>

<svelte:window
    onkeydown={handleKeydown}
    onpointerup={finishDrag}
    onpointercancel={event => finishDrag(event, true)}
/>

<section class="research-section" id="research" aria-labelledby="research-title" data-ready={carouselReady}>
    <div class="section-heading">
        <div>
            <p class="section-kicker">What we explore</p>
            <h2 id="research-title">Statistical insights, intelligent systems.</h2>
        </div>
        <div class="research-heading-actions">
            <a class="text-link" href="/publication/">
                Browse our publications <span aria-hidden="true">→</span>
            </a>
            <div class="carousel-controls" aria-label="Research carousel controls">
                <button type="button" onclick={() => advance(-1)} aria-label="Previous research area" disabled={expandedIndex !== null}>←</button>
                <button
                    class="autoplay-toggle"
                    type="button"
                    onclick={toggleAutoplay}
                    aria-label={autoplayPaused ? 'Resume automatic carousel movement' : 'Pause automatic carousel movement'}
                    aria-pressed={autoplayPaused}
                    disabled={expandedIndex !== null}
                >{autoplayPaused ? '▶' : 'Ⅱ'}</button>
                <button type="button" onclick={() => advance(1)} aria-label="Next research area" disabled={expandedIndex !== null}>→</button>
            </div>
        </div>
    </div>

    <div
        class="carousel-viewport"
        bind:this={viewport}
        tabindex="-1"
        onpointerdown={startDrag}
        onpointermove={moveDrag}
        role="region"
        aria-roledescription="carousel"
        aria-label="Research areas"
    >
        <div
            class="research-grid"
            class:transitioning={transitionEnabled}
            class:dragging
            bind:this={track}
            style={`transform: translate3d(${offset}px, 0, 0)`}
        >
            {#each orderedAreas as area, position (area.number)}
                {#if area.detail}
                    <button
                        class="research-card expandable"
                        class:expanded={expandedIndex === area.originalIndex}
                        type="button"
                        onclick={event => toggleDetail(area.originalIndex, event.currentTarget)}
                        tabindex={position < visibleCount ? 0 : -1}
                        inert={position >= visibleCount}
                        aria-hidden={position >= visibleCount}
                        aria-expanded={expandedIndex === area.originalIndex}
                        aria-controls={expandedIndex === area.originalIndex ? 'research-topic-detail' : undefined}
                        aria-label={`${area.title}. ${expandedIndex === area.originalIndex ? 'Hide' : 'Show'} topic overview`}
                    >
                        <h3>{area.title}</h3>
                        <span class="research-card-action" aria-hidden="true">
                            {expandedIndex === area.originalIndex ? 'Hide overview' : 'View topic overview'}
                            <i>{expandedIndex === area.originalIndex ? '−' : '+'}</i>
                        </span>
                    </button>
                {:else}
                    <article
                        class="research-card"
                        role="group"
                        inert={position >= visibleCount}
                        aria-hidden={position >= visibleCount}
                        aria-roledescription="slide"
                        aria-label={`${area.title}, ${area.originalIndex + 1} of ${areas.length}`}
                    >
                        <h3>{area.title}</h3>
                    </article>
                {/if}
            {/each}
        </div>
    </div>

    <p class="carousel-status" aria-live="polite" aria-atomic="true">
        Research topic {announcedIndex + 1} of {areas.length}: {areas[announcedIndex].title}
    </p>

    {#if expandedIndex !== null}
        {@const detail = areas[expandedIndex].detail}
        <figure
            class="research-detail"
            id="research-topic-detail"
            transition:slide={{ duration: reduceMotion ? 0 : 520 }}
        >
            <button bind:this={detailCloseButton} type="button" onclick={closeDetail} aria-label="Close research topic overview">×</button>
            <img
                src={`/${detail.image}`}
                alt={detail.alt}
                width="960"
                height="540"
                decoding="async"
            />
        </figure>
    {/if}
</section>

<style lang="scss">
    @use "utils/variables" as *;

    .research-section {
        width: min(calc(100% - 3rem), 1280px);
        margin: 0 auto;
        padding: clamp(3.5rem, 5vw, 5rem) 0;
    }

    .section-heading {
        margin-bottom: 1.75rem;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 2rem;
        align-items: end;
    }

    .section-kicker {
        margin: 0 0 .7rem;
        color: $kaist-dark-blue;
        font-size: .74rem;
        font-weight: 700;
        letter-spacing: .18em;
        text-transform: uppercase;
    }

    .section-heading h2 {
        margin: 0;
        color: $black;
        font-size: clamp(2.1rem, 3.4vw, 3.6rem);
        font-weight: 500;
        letter-spacing: -.055em;
        line-height: 1.05;
        white-space: nowrap;
    }

    .research-heading-actions {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: .75rem;
    }

    .text-link {
        width: fit-content;
        padding-bottom: .25rem;
        display: flex;
        gap: 2.5rem;
        border-bottom: 1px solid rgba($kaist-dark-gray, .6);
        color: $black;
        font-size: .88rem;
        font-weight: 700;
        transition: gap .2s ease, border-color .2s ease;
    }

    .text-link:hover { gap: 3rem; border-color: $black; color: $black; }

    .carousel-controls { display: flex; align-items: center; gap: .5rem; }

    .carousel-controls button {
        width: 2.75rem;
        height: 2.75rem;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid rgba($kaist-dark-gray, .3);
        border-radius: 50%;
        color: $kaist-dark-blue;
        background: transparent;
        font-size: 1rem;
        cursor: pointer;
        transition: color .2s ease, border-color .2s ease, background-color .2s ease;
    }

    .carousel-controls button:hover {
        border-color: $kaist-dark-blue;
        color: $kaist-white;
        background: $kaist-dark-blue;
    }

    .carousel-controls .autoplay-toggle { font-size: .68rem; }

    .carousel-controls button:disabled {
        opacity: .4;
        cursor: not-allowed;
    }

    .carousel-controls button:disabled:hover {
        border-color: rgba($kaist-dark-gray, .3);
        color: $kaist-dark-blue;
        background: transparent;
    }

    .carousel-viewport {
        padding: .35rem .15rem 1.25rem;
        overflow: hidden;
        touch-action: pan-y;
    }

    .research-grid {
        display: flex;
        gap: 1rem;
        will-change: transform;
    }

    .research-grid.transitioning { transition: transform .82s cubic-bezier(.22, 1, .36, 1); }
    .research-grid.dragging { cursor: grabbing; }

    .research-card {
        position: relative;
        min-width: 0;
        min-height: 160px;
        padding: clamp(1.25rem, 2vw, 1.5rem);
        display: flex;
        flex: 0 0 calc((100% - 2rem) / 3);
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba($kaist-dark-gray, .28);
        border-radius: 1.2rem;
        background: $kaist-white;
        font: inherit;
        text-align: left;
        transition: transform .3s ease, box-shadow .3s ease;
    }

    .research-card:hover { transform: translateY(-5px); box-shadow: 0 24px 60px rgba($kaist-dark-blue, .1); }
    .research-card.expandable { cursor: pointer; }

    .research-card.expandable:hover,
    .research-card.expanded {
        border-color: rgba($kaist-blue, .55);
        background: linear-gradient(110deg, $kaist-white 0 62%, rgba($kaist-light-blue, .14));
    }

    .research-card.expandable:focus-visible { outline-offset: -3px; }

    .research-card h3 {
        max-width: 580px;
        margin: auto 0;
        color: $black;
        font-size: clamp(1.25rem, 1.65vw, 1.6rem);
        font-weight: 500;
        letter-spacing: -.035em;
        line-height: 1.12;
    }

    .research-card-action {
        margin-top: .85rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        color: $kaist-dark-blue;
        font-size: .68rem;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
    }

    .research-card-action i {
        width: 1.65rem;
        height: 1.65rem;
        display: grid;
        place-items: center;
        border: 1px solid rgba($kaist-blue, .4);
        border-radius: 50%;
        background: rgba($kaist-light-blue, .18);
        font-size: 1rem;
        font-style: normal;
        line-height: 1;
        transition: color .2s ease, background-color .2s ease;
    }

    .research-card.expandable:hover .research-card-action i,
    .research-card.expanded .research-card-action i {
        color: $kaist-white;
        background: $kaist-dark-blue;
    }

    .carousel-status {
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

    .research-detail {
        position: relative;
        margin: .25rem .15rem 0;
        overflow: hidden;
        border: 1px solid rgba($kaist-blue, .28);
        border-radius: 1.25rem;
        background: $kaist-white;
        box-shadow: 0 20px 55px rgba($kaist-dark-blue, .08);
    }

    .research-detail img { width: 100%; height: auto; display: block; }

    .research-detail > button {
        position: absolute;
        z-index: 2;
        top: 1rem;
        right: 1rem;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid rgba($kaist-dark-gray, .3);
        border-radius: 50%;
        color: $kaist-dark-blue;
        background: rgba($kaist-white, .92);
        font-size: 1.25rem;
        line-height: 1;
        cursor: pointer;
    }

    .research-detail > button:hover { color: $kaist-white; background: $kaist-dark-blue; }

    @media (max-width: 992px) {
        .section-heading { grid-template-columns: 1fr; gap: 1rem; }
        .research-heading-actions { justify-self: end; }
        .research-card { flex-basis: calc((100% - 1rem) / 2); }
    }

    @media (max-width: 720px) {
        .research-section { width: min(calc(100% - 2rem), 1280px); }
        .section-heading h2 { white-space: normal; overflow-wrap: anywhere; }
        .research-heading-actions { width: 100%; align-items: stretch; justify-self: stretch; }
        .text-link { width: 100%; justify-content: space-between; gap: .5rem; }
        .carousel-controls { justify-content: flex-end; }
        .carousel-controls button { width: 44px; height: 44px; }
        .research-card { min-height: 150px; flex-basis: calc(100% - 2rem); }
        .research-detail { border-radius: 1rem; }
        .research-detail img { width: 100%; min-width: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
        .research-grid,
        .research-card { transition: none; }
    }
</style>
