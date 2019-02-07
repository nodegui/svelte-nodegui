import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte';
import pkg from './package.json'
import * as path from 'path'

let externalModules = pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []

let plugins = [
  svelte({
    include: 'src/components/**/*.html',
  }),
  typescript({
    typescript: require('typescript'),
    useTsconfigDeclarationDir: true
  }),
  resolve(),
]

export default [{
  input: 'src/index.ts',
  output: [{
      file: pkg.main,
      format: 'cjs',
  }],
  external: (id) => [...externalModules, "./svelte-helpers", "./dom", "./components"].some( prefix => id.startsWith(prefix)),
  plugins: plugins
},
{
  input: 'src/dom/index.ts',
  output: [{
      file: path.dirname(pkg.main)+"/dom/index.js",
      format: 'cjs',
  }],
  external: (id) => [...externalModules, "../svelte-helpers/", "../components/"].some( prefix => id.startsWith(prefix)),
  plugins: plugins
},
{
  input: 'src/svelte-helpers/index.ts',
  output: [{
      file: path.dirname(pkg.main)+"/svelte-helpers/index.js",
      format: 'cjs',
  }],
  external: (id) => [...externalModules, "../dom", "../components"].some( prefix => id.startsWith(prefix)),
  plugins: plugins
},
{
  input: 'src/components/index.ts',
  output: [{
      file: path.dirname(pkg.main)+"/components/index.js",
      format: 'cjs',
  }],
  external: (id) => [...externalModules, "../dom", "../svelte-helpers"].some( prefix => id.startsWith(prefix)),
  plugins: plugins
},
];