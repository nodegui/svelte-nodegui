import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

const dev = process.env.ROLLUP_WATCH;

// bundle workers
export default ['bundler'].map(x => ({
    input: `${x}/index.js`,
    output: {
        file: `dist/${x}.js`,
        format: 'iife'
    },
    plugins: [
        commonjs(),
        resolve(),
        json(),
    //    !dev && terser()
    ]
}));