const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const formatDate = require('date-fns/format');

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;

renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);

    if (href.indexOf('/') === 0) {
    // Do not open internal links on new tab
        return html;
    } else if (href.indexOf('#') === 0) {
    // Handle hash links to internal elements
        const htmlInternal = linkRenderer.call(renderer, 'javascript:;', title, text);
        return htmlInternal.replace(
            /^<a /,
            `<a onclick="document.location.hash='${href.substr(1)}';" `,
        );
    }

    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};

marked.setOptions({ renderer });

export default () => ({
    transform(md, id) {
        if (!/\.md$/.test(id)) return null;

        const fileName = path.basename(id);
        /*
         * const { data, content: rawContent } = matter(md);
         * const { title, date } = data;
         * const slug = fileName.split('.')[0];
         */

        // const html = marked(content);
        const html = marked(md);
        // const printDate = formatDate(new Date(date), 'yyyy-MM-dd');

        const exportFromModule = JSON.stringify({
            /*
             * title: title || slug,
             * slug,
             */
            html,
            /*
             * date,
             * printDate,
             */
        });

        return {
            code: `export default ${exportFromModule}`,
            map: { mappings: '' },
        };
    },
});
