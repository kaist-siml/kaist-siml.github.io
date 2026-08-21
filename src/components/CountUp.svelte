<script>
    import { onMount, untrack } from 'svelte';

    let { value, start = 0, duration = 1400, delay = 0 } = $props();
    let element;
    let displayedValue = $state(untrack(() => value));

    onMount(() => {
        let animationFrame;
        let delayTimer;
        let hasAnimated = false;

        const stopAnimation = () => {
            window.clearTimeout(delayTimer);
            window.cancelAnimationFrame(animationFrame);
        };

        const observer = new IntersectionObserver(entries => {
            if (hasAnimated || !entries.some(entry => entry.isIntersecting)) return;
            hasAnimated = true;
            observer.disconnect();

            delayTimer = window.setTimeout(() => {
                const startedAt = performance.now();
                const animate = now => {
                    const progress = Math.min(1, (now - startedAt) / duration);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    displayedValue = Math.round(start + (value - start) * eased);

                    if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
                };
                animationFrame = window.requestAnimationFrame(animate);
            }, delay);
        }, { threshold: .45 });

        displayedValue = start;
        observer.observe(element);

        return () => {
            observer.disconnect();
            stopAnimation();
        };
    });
</script>

<span
    class="count-up"
    bind:this={element}
    style={`--count-digits: ${String(value).length}ch`}
    aria-hidden="true"
>{displayedValue}</span>
<span class="accessible-value">{value}</span>

<style>
    .count-up {
        min-width: var(--count-digits);
        display: inline-block;
        font-variant-numeric: tabular-nums;
    }

    .accessible-value {
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
