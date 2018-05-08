import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV

const config = {
    input: 'src/index.js',
    plugins: [],
    external: ['react', 'react-dom', 'redux', 'react-redux', 'redux-saga/effects', 'redux-saga', 'redux-logger']
}

if (env === 'es' || env === 'cjs') {
    config.output = { format: env, indent: false }
    config.plugins.push(
        babel({
            plugins: ['external-helpers'],
        })
    )
}

if (env === 'development' || env === 'production') {

    config.output = { format: 'umd', name: 'Woox', indent: false }

    config.output.globals = {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'redux-saga': 'ReduxSaga',
        'redux-logger': 'ReduxLogger',
        'redux-saga/effects': 'SagaEffects'
    }

    config.plugins.push(
        nodeResolve({
            jsnext: true
        }),
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    )
}

if (env === 'production') {
    config.plugins.push(
        uglify({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    )
}

export default config