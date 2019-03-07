const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const is_dev = process.env.NODE_ENV === 'development'

const mode = process.env.NODE_ENV || 'production'

const rootAssetPath = path.join(__dirname, 'assets')

const plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin(),
]

const jsLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
    },
}

const extensions = ['.js', '.jsx', '.json', '.css']

const alias = {
    Assets: path.resolve(__dirname, 'assets'),
}

module.exports = {
    mode,
    entry: [path.join(__dirname, '/src/index.js')],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[hash].js',
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions,
        alias,
    },
    module: {
        rules: [
            jsLoader,
            {
                test: /\.(s)?css$/,
                use: [
                    {
                        loader: is_dev
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                //eslint-disable-next-line
                test: /\.(wav|webm|mp3|woff|woff2|ttf|eot|png|jpe?g|gif|ico)(\?.*)?$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash].[ext]',
                        context: rootAssetPath,
                    },
                },
            },
        ],
    },
    plugins,
    devServer: {
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
    },
}