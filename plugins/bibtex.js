import { createFilter } from '@rollup/pluginutils';
import path from 'path';

const bibtexParse = require('bibtex-parse');

export default (options = {}) => {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'bibtex',
        async transform(code, id) {
            if (!filter(id) === -1 || path.extname(id) !== '.bib') return;

            const bibtex = bibtexParse.entries(code)
                                      .map(entry => {
                                          const newEntry = {};
                                          for(const key of Object.keys(entry)) {
                                              newEntry[key.toLowerCase()] = entry[key];
                                          }
                                          return newEntry;
                                      });

            const exportFromModule = JSON.stringify(bibtex);

            return {
                code: `export default ${exportFromModule}`,
                map: { mappings: '' },
            };
        },
    };
};
