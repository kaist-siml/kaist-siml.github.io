let motionQuery;
let listening = false;
const subscribers = new Set();

const notifySubscribers = event => {
    for (const subscriber of subscribers) subscriber(event.matches);
};

const getMotionQuery = () => {
    if (typeof window === 'undefined') return null;
    motionQuery ||= window.matchMedia('(prefers-reduced-motion: reduce)');
    return motionQuery;
};

export const prefersReducedMotion = () => getMotionQuery()?.matches ?? false;

export const subscribeReducedMotion = subscriber => {
    const query = getMotionQuery();
    if (!query) return () => {};

    subscribers.add(subscriber);
    if (!listening) {
        query.addEventListener('change', notifySubscribers);
        listening = true;
    }
    subscriber(query.matches);

    return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && listening) {
            query.removeEventListener('change', notifySubscribers);
            listening = false;
        }
    };
};
