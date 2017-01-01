const production = 'production' == process.env.NODE_ENV


module.exports = {
    plugins: [
        require('postcss-import')({}),
        require('postcss-simple-vars')({}),

        ...(
            production
                ? [
                    require('autoprefixer')({}),
                ]
                : []
        ),
    ]
}