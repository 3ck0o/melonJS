import babel from 'rollup-plugin-babel';
import multiEntry from "rollup-plugin-multi-entry";
import replace from 'rollup-plugin-replace';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';


const pkg = require('./package.json');


// credit/license information
const license = [
    `/*!`,
    ` * ${pkg.description} - v${pkg.version}`,
    ` * http://www.melonjs.org`,
    ` * ${pkg.name} is licensed under the MIT License.`,
    ` * http://www.opensource.org/licenses/mit-license`,
    ` * @copyright (C) 2011 - ${(new Date()).getFullYear()} ${pkg.author.name}`,
    ` */`,
].join('\n');

export default {
    input: require('./sourceFiles.json'),
    plugins: [
        resolve({
            module: false,
            browser: false,
            preferBuiltins: false
        }),
        commonjs({
            include: 'node_modules/**',
            sourceMap: false
        }),
        multiEntry(),
        replace({
            '__VERSION__': pkg.version,
            //'/this\._super\(\s*([\w\.]+)\s*,\s*"(\w+)"\s*(,\s*)?/g' : '$1.prototype.$2.apply(this$3',
             delimiters: ['', '']
        }),
        babel({
          exclude: 'node_modules/**'
      }),
      bundleSize()
    ],
    output: {
      file: 'build/melonjs.js',
      banner: license,
      format: 'iife'
    }
};
