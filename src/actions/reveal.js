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

    const resetStyles = () => {
        node.style.removeProperty('transform');
    };

    const show = () => {
        if (hasRevealed) return;
        hasRevealed = true;

        animation = node.animate([
            { transform: `translate3d(0, ${distance}px, 0) scale(.985)` },
            { transform: 'translate3d(0, -2px, 0) scale(1)', offset: .82 },
            { transform: 'translate3d(0, 0, 0) scale(1)' }
        ], {
            duration,
            delay,
            easing: 'cubic-bezier(.22, 1, .36, 1)',
            fill: 'both'
        });

        resetStyles();
        animation.finished.then(() => animation?.cancel()).catch(() => {});
    };

    node.style.transform = `translate3d(0, ${distance}px, 0) scale(.985)`;
    revealCallbacks.set(node, show);
    getRevealObserver().observe(node);

    return {
        destroy() {
            getRevealObserver().unobserve(node);
            revealCallbacks.delete(node);
            animation?.cancel();
            resetStyles();
        }
    };
};
