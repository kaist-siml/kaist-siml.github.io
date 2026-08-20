export const ALLOWED_URL_PROTOCOLS = new Set(['https:', 'http:']);

export const isAllowedHttpUrl = value => {
    if (!value) return false;
    try {
        return ALLOWED_URL_PROTOCOLS.has(new URL(value).protocol);
    } catch {
        return false;
    }
};

export const getSafeExternalUrl = value => isAllowedHttpUrl(value) ? value : null;
