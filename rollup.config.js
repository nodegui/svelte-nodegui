import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte';
import pkg from './package.json'


let externalModules = pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []

let localModules = ["dom", "components", "transitions"]

let plugins = [
  resolve({
    extensions: ['.mjs', '.js']
  }),
  svelte({
    include: 'src/components/**/*.svelte',
  }),
  typescript({
    typescript: require('typescript'),
    useTsconfigDeclarationDir: true
  })
]

function module_defs() {
  return localModules.map(mod => {
    return {
      input: `src/${mod}/index.ts`,
      output: [{
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
      file: "dist/index.js",
      format: 'esm',
    }
    ],
    external: (id) => [...externalModules, ...localModules.map(m => `./${m}`)].some(prefix => id.startsWith(prefix)),
    plugins: plugins
  },
  ...module_defs()
];