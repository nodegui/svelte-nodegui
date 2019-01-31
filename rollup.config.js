import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

let externalModules = pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: (id) => {
    for(var pkg_name of externalModules) {
      if (id.startsWith(pkg_name)) {
        return true;
      }
    }
    return false;
  },  

  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    resolve(),
  ],
}