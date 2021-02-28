import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte';
import pkg from './package.json'


let externalModules = [
  ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  "phin",
]

let localModules = [
  "dom",
  "components",
  "transitions",
  "dom/react-nodegui/src",
]

let plugins = [
  resolve({
    extensions: ['.mjs', '.js']
  }),
  svelte({
    include: 'src/components/**/*.svelte',
  }),
  typescript({
    sourcemap: true,
    typescript: require('typescript'),
    useTsconfigDeclarationDir: true
  })
]

function module_defs() {
  return localModules.map(mod => {
    return {
      input: `src/${mod}/index.ts`,
      output: [{
        sourcemap: true,
        file: `dist/${mod}/index.js`,
        format: 'esm',
      }],
      external: (id) => [...externalModules, ...localModules.filter(m => m != mod).map(m => `../${m}`)].some(prefix => id.startsWith(prefix)),
      plugins: plugins
    }
  })

}


export default [
  {
    input: 'src/index.ts',
    output: [{
      sourcemap: true,
      file: "dist/index.js",
      format: 'esm',
    }
    ],
    external: (id) => [...externalModules, ...localModules.map(m => `./${m}`)].some(prefix => id.startsWith(prefix)),
    plugins: plugins
  },
  ...module_defs(),
  {
    input: `src/svelte-nodegui.ts`,
    output: [{
      sourcemap: true,
      file: `dist/svelte-nodegui.js`,
      format: 'esm',
    }],
    plugins: [
      resolve({
        extensions: ['.ts']
      }),,
      typescript({
        sourcemap: true,
        typescript: require('typescript'),
        useTsconfigDeclarationDir: true
      })
    ]
  }
];