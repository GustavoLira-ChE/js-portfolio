const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // Entry point is the modele that webpack uses to start building its internal dependency graph.
    entry: './src/index.js',
    // output property instructs webpack where to emit the bundle(s) and what name to use for the file(s)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // Options for resolving module request. (Does not apply to resolving of loaders)
    resolve: {
        extensions: ['.js']
    },
    //Webpack only understands JS and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph
    module: {
        rules: [
            {
                // test property identifies which file or files should be transform
                test: /\.m?js$/, 
                // Exclude all modules matching any of these conditions
                exclude: /node_modules/,
                // use property indicates which loader should be used to do the transform
                use:{ 
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: [miniCssExtractPlugin.loader, 'css-loader'],
            }
        ]    
    },
    //while loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of enviroment varibles
    plugins: [
        new htmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new miniCssExtractPlugin(),
    ]
}