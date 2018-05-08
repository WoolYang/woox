import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

function createConfig(entry, out, name) {
    return [
        {
            input: `./src/${entry}.js`,
            output: { file: `dist/${out}.es.js`, format: 'es' },
        },
        {
            input: `./src/${entry}.js`,
            output: { file: `dist/${out}.cjs.js`, format: 'cjs' },
        },
        {
            input: `./src/${entry}.js`,
            output: {
                file: `dist/${out}.umd.js`,
                format: 'umd',
                name
            },
            plugins: [
                resolve(),
                commonjs(),
                sizeSnapshot(),
                uglify({ compress: true, mangle: { toplevel: true } }),
            ],
        },
    ]
}

export default [
    ...createConfig('index', 'woox', 'Woox'),
]

/* export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        babel(
            { exclude: 'node_modules/**' },
            sizeSnapshot()
        )
    ]
}; */