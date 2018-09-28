const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');
const { ProvidePlugin, IgnorePlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

// config helpers:
const ensureArray = config => (config && (Array.isArray(config) ? config : [config])) || [];
const when = (condition, config, negativeConfig) => (condition ? ensureArray(config) : ensureArray(negativeConfig));

// primary config:
const title = 'Tour of Heroes';
const distDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const baseUrl = '/';

const scssRules = [
    { loader: 'css-loader' },
    {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] },
    },
    { loader: 'sass-loader' },
];

module.exports = (env, { p } = argv) => ({
    // `p` gets destructed from the arguments vector and is `true` for production builds
    mode: p ? 'production' : 'development',
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [srcDir, 'node_modules'],
    },
    entry: { app: 'aurelia-bootstrapper' },
    output: {
        path: distDir,
        publicPath: baseUrl,
        filename: p ? '[name].[contenthash].js' : '[name].[hash].js',
        sourceMapFilename: '[file].map',
        hashDigestLength: 8,
    },
    externals: {
        'build-config': 'buildConfig',
    },
    devServer: {
        contentBase: distDir,
        overlay: true,
    },
    devtool: p ? false : 'cheap-module-source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
            // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
            {
                test: /\.scss$/i,
                issuer: [{ not: [{ test: /\.html$/i }] }],
                use: [
                    {
                        loader: p ? MiniCssExtractPlugin.loader : 'style-loader',
                    },
                    ...scssRules,
                ],
            },
            {
                test: /\.scss$/i,
                issuer: [{ test: /\.html$/i }],
                // CSS required in templates cannot be extracted safely
                // because Aurelia would try to require it again in runtime
                use: scssRules,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
            },
            // use Bluebird as the global Promise implementation:
            {
                test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/,
                loader: 'expose-loader?Promise',
            },
            // embed small images as Data Urls
            {
                test: /\.(png|gif|jpg|cur)$/i,
                loader: 'url-loader',
                options: { limit: 8192 },
            },
            {
                test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new AureliaPlugin(),
        new ModuleDependenciesPlugin({
            'aurelia-testing': ['./compile-spy', './view-spy'],
        }),
        new ProvidePlugin({
            Promise: 'bluebird',
        }),
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            minify: p
                ? {
                      removeComments: true,
                      collapseWhitespace: true,
                      collapseInlineTagWhitespace: true,
                      collapseBooleanAttributes: true,
                      removeAttributeQuotes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      ignoreCustomFragments: [/\${.*?}/g],
                  }
                : undefined,
            metadata: {
                // available in index.ejs //
                title,
                baseUrl,
            },
        }),
        new CleanWebpackPlugin(distDir),
        // Forces webpack-dev-server to write files to the file system
        new WriteFilePlugin({ exitOnErrors: false }),
        new CopyWebpackPlugin(
            [
                'login.html',
            ],
            { debug: false }
        ),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[contenthash].css',
        }),
    ],
});
