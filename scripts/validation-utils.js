export const hasAllowedAuthorMarkup = value => {
    if (typeof value !== 'string' || value.trim() === '') return false;
    const withoutHighlights = value.replace(/<b>[^<>]+<\/b>/g, '');
    return !/[<>]/.test(withoutHighlights);
};
