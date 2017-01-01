const path = require('path')
const webpack = require('webpack')

const production = 'production' == process.env.NODE_ENV

module.exports = {

    entry: {
        'index'     : './src/index.js',

        'vendor'    : ['react', 'react-dom', 'redux', 'three', 'refinery-js'],

    },

    output: {
        path        : path.join(__dirname, 'dist'),
        filename    : '[name].js'
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                use : [
                    {
                        loader : 'babel-loader',
                    },
                ],
            },

            {
                test: /\.html?$/,
                use : [
                    {
                        loader  : 'html-minify-loader',
                    },
                ],
            },

            {
                test: /\.css$/,
                use : [
                    {
                        loader  : 'style-loader',
                    },
                    {
                        loader  : 'css-loader',
                        options : {
                            modules         : true,
                            importLoaders   : 1,
                            localIdentName  : production
                                ? '[emoji:6]'
                                : '[path][name]---[local]'
                            ,
                        },
                    },
                    {
                        loader  : 'postcss-loader',
                        options : {
                        },
                    },
                ],
            },

        ],
    },

    plugins : [
        ...(
            production
                ? [
                    // minify
                    new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} }),
                ]
                : [
                    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
                ]
        ),
    ],

    devtool : 'source-map',
}
