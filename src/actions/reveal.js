import { subscribeReducedMotion } from '../utils/motion.js';

const revealCallbacks = new WeakMap();
let revealObserver;

const getRevealObserver = () => {
    if (!revealObserver) {
        revealObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                revealCallbacks.get(entry.target)?.();
                revealObserver.unobserve(entry.target);
            }
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -7% 0px'
        });
    }

    return revealObserver;
};

export const reveal = (node, options = {}) => {
    const { delay = 0, distance = 34, duration = 760 } = options;
    let animation;
    let hasRevealed = false;
    let observing = false;

    const resetStyles = () => {
        node.style.removeProperty('opacity');
        node.style.removeProperty('transform');
    };

    const showImmediately = () => {
        hasRevealed = true;
        animation?.cancel();
        getRevealObserver().unobserve(node);
        observing = false;
        resetStyles();
    };

    const show = () => {
        if (hasRevealed) return;
        hasRevealed = true;
        observing = false;

        animation = node.animate([
            { opacity: 0, transform: `translate3d(0, ${distance}px, 0) scale(.985)` },
            { opacity: 1, transform: 'translate3d(0, -2px, 0) scale(1)', offset: .82 },
            { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
        ], {
            duration,
            delay,
            easing: 'cubic-bezier(.22, 1, .36, 1)',
            fill: 'both'
        });

        resetStyles();
        animation.finished.then(() => animation?.cancel()).catch(() => {});
    };

    revealCallbacks.set(node, show);
    const unsubscribeMotion = subscribeReducedMotion(reduceMotion => {
        if (reduceMotion) {
            showImmediately();
        } else if (!hasRevealed && !observing) {
            node.style.opacity = '0';
            node.style.transform = `translate3d(0, ${distance}px, 0) scale(.985)`;
            getRevealObserver().observe(node);
            observing = true;
        }
    });

    return {
        destroy() {
            unsubscribeMotion();
            getRevealObserver().unobserve(node);
            revealCallbacks.delete(node);
            animation?.cancel();
            resetStyles();
        }
    };
};
