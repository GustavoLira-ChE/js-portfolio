const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    // Entry point is the modele that webpack uses to start building its internal dependency graph.
    entry: './src/index.js',
    // output property instructs webpack where to emit the bundle(s) and what name to use for the file(s)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    // Options for resolving module request. (Does not apply to resolving of loaders)
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
        }
    },
    //Webpack only understands JS and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph
    module: {
        rules: [
            //Babel loader
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
            // stylus loader
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader','stylus-loader'],
            },
            // image loader
            {
                test: /\.png$/,
                type: 'asset/resource'
            },
            //
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //Can be boolean too
                        //Enable or disable trandformation of file to base64
                        limit: 10000,
                        //Specify the MIME (Multipurpose Internet Mail Extensions), it's the standar way to sent media file througth internet
                        mimetype: "application/font-woff",
                        //Specify the output name
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        //Specify this is not a module
                        esModule: false,
                    }
                }
            }
        ]    
    },
    //while loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of enviroment varibles
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src', 'assets/images'),
            to: "assets/images"}
            ]
        }),
        new Dotenv(),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 8001,
        open: true
    }
}