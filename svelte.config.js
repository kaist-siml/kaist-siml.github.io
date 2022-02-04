const sveltePreprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
    preprocess: sveltePreprocess({
        replace: [
            [/(?<!\/)data(?=\/)/g, path.resolve(__dirname, 'data')],
            [/(?<!\/)static(?=\/)/g, path.resolve(__dirname, 'static')],
            [/(?<!\/)components(?=\/)/g, path.resolve(__dirname, 'src', 'components')],
            [/(?<!\/)utils(?=\/)/g, path.resolve(__dirname, 'src', 'utils')],
            [/(?<!\/)node_modules(?=\/)/g, path.resolve(__dirname, 'node_modules')],
        ],
    }),
    onwarn: (warning, handler) => {
        const { code, frame } = warning;
        if (code === 'css-unused-selector')
            return;
        handler(warning);
      },
};
