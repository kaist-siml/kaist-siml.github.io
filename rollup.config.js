import path from 'path';
import autoprefixer from 'autoprefixer';

import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import yaml from '@rollup/plugin-yaml';

import { terser } from 'rollup-plugin-terser'
import glob from 'rollup-plugin-glob'

import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';
import config from 'sapper/config/rollup.js'

import markdown from './src/utils/markdown.js'
import pkg from './package.json'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) =>
 	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
 	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
 	onwarn(warning);

const replacePath = [
  [/(?<!\/)data(?=\/)/g, path.resolve(__dirname, 'data')],
  [/(?<!\/)static(?=\/)/g, path.resolve(__dirname, 'static')],
  [/(?<!\/)components(?=\/)/g, path.resolve(__dirname, 'src', 'components')],
  [/(?<!\/)utils(?=\/)/g, path.resolve(__dirname, 'src', 'utils')],
  [/(?<!\/)node_modules(?=\/)/g, path.resolve(__dirname, 'node_modules')],
];

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.browser': false,
          'process.env.NODE_ENV': JSON.stringify(mode),
        }
      }),
      svelte({
        preprocess: sveltePreprocess({
          sourceMap: !!dev,
          replace: replacePath,
          postcss: {
              plugins: [
                  autoprefixer(),
              ]
          },
        }),
        compilerOptions: {
          dev,
          hydratable: true,
        },
        emitCss: true,
        onwarn: (warning, handler) => {
          const { code, frame } = warning;
          if (code === 'css-unused-selector')
              return;
          handler(warning);
        },
      }),
      resolve(),
      commonjs(),
      markdown(),
      yaml(),
      glob(),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.browser': false,
          'process.env.NODE_ENV': JSON.stringify(mode),
        }
      }),
      svelte({
        preprocess: sveltePreprocess({
          sourceMap: !!dev,
          replace: replacePath,
          postcss: {
              plugins: [
                  autoprefixer(),
              ]
          },
        }),
        compilerOptions: {
          dev,
          hydratable: true,
          generate: 'ssr',
        },
        emitCss: false,
        onwarn: (warning, handler) => {
          const { code, frame } = warning;
          if (code === 'css-unused-selector')
              return;
          handler(warning);
        },
      }),
      resolve(),
      commonjs(),
      markdown(),
      yaml(),
      glob(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives'))
    ),

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        preventAssignment: true,
        values: {
          'process.browser': false,
          'process.env.NODE_ENV': JSON.stringify(mode),
        }
      }),
      commonjs(),
      !dev && terser(),
    ],
    onwarn,
  },
}
