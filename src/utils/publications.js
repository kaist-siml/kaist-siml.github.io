const PUBLICATION_TYPES = ['Conference', 'Journal', 'Symposium and Workshop'];

const VENUE_MATCHERS = [
    ['NeurIPS', /NeurIPS|Neural Information Processing Systems|\bNIPS\b/i],
    ['ICML', /\bICML\b|International Conference on Machine Learning/i],
    ['ICLR', /\bICLR\b|International Conference on Learning Representations/i],
    ['UAI', /\bUAI\b|Uncertainty in Artificial Intelligence/i],
    ['AISTATS', /\bAISTATS\b|Artificial Intelligence and Statistics/i],
    ['IJCAI', /\bIJCAI\b|International Joint Conference on Artificial Intelligence/i],
    ['ECCV', /\bECCV\b|European Conference on Computer Vision/i],
    ['AAAI', /\bAAAI\b|Advancement of Artificial Intelligence/i],
    ['ICCV', /\bICCV\b|International Conference on Computer Vision/i],
    ['CVPR', /\bCVPR\b|Computer Vision and Pattern Recognition/i],
    ['ACL', /\bACL\b|Association for Computational Linguistics/i],
    ['ISBI', /\bISBI\b|International Symposium on Biomedical Imaging/i],
    ['JMLR', /Journal of Machine Learning Research/i],
    ['TMLR', /Transactions on Machine Learning Research|\bTMLR\b/i],
    ['JAMES', /Journal of Advances in Modeling Earth Systems/i],
    ['Bayesian Analysis', /Bayesian Analysis/i],
    ['Bernoulli', /\bBernoulli\b/i],
    ['AABI', /Advances in Approximate Bayesian Inference/i]
];

const DISTINCTION_MATCHERS = [
    ['Long Oral', /Long Oral Presentation/i],
    ['Oral', /Oral Presentation/i],
    ['Spotlight', /Spotlight Presentation/i],
    ['Poster', /\bPoster(?: Presentation)?\b/i],
    ['Contributed Talk', /Contributed Talk/i]
];

export const stripHtml = text => String(text || '').replace(/<[^>]*>/g, '').trim();

export const parseAuthors = value => {
    const text = String(value || '');
    const segments = [];
    const highlightPattern = /<b>([^<>]+)<\/b>/g;
    let cursor = 0;
    let match;

    while ((match = highlightPattern.exec(text)) !== null) {
        if (match.index > cursor) segments.push({ text: text.slice(cursor, match.index), highlighted: false });
        segments.push({ text: match[1], highlighted: true });
        cursor = highlightPattern.lastIndex;
    }

    if (cursor < text.length) segments.push({ text: text.slice(cursor), highlighted: false });
    return segments;
};

export const createPublicationList = publication => PUBLICATION_TYPES
    .flatMap((type, typeOrder) => (publication[type] || []).map((paper, paperOrder) => ({
        ...paper,
        type,
        year: Number(paper.date.slice(0, 4)),
        sortOrder: typeOrder * 1000 + paperOrder
    })))
    .sort((first, second) => second.date.localeCompare(first.date) || first.sortOrder - second.sortOrder);

export const getBadges = paper => {
    const text = stripHtml(`${paper.label || ''} ${paper.note || ''}`);
    const venue = paper.type === 'Symposium and Workshop'
        ? null
        : VENUE_MATCHERS.find(([, pattern]) => pattern.test(text))?.[0];
    const distinction = DISTINCTION_MATCHERS.find(([, pattern]) => pattern.test(text))?.[0];

    const categoryLabel = paper.type === 'Symposium and Workshop'
        ? 'Symposium & Workshop'
        : paper.type;

    return [
        { label: categoryLabel, kind: 'category' },
        ...(venue ? [{ label: venue, kind: 'venue' }] : []),
        ...(paper.forthcoming ? [{ label: 'To appear', kind: 'forthcoming' }] : []),
        ...(distinction ? [{ label: distinction, kind: 'notable' }] : [])
    ];
};

export const getVenueText = label => stripHtml(label)
    .replace(/,\s*(?:Long )?Oral Presentation\s*$/i, '')
    .replace(/,\s*Spotlight Presentation\s*$/i, '')
    .replace(/,\s*Poster(?: Presentation)?\s*$/i, '')
    .replace(/,\s*Contributed Talk\s*$/i, '');
