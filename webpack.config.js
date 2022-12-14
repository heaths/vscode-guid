// @ts-check
'use strict';

const path = require('path');
const webpack = require('webpack');

// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const nodeConfig = {
    target: 'node',
    mode: 'none',

    entry: './src/extension.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        // Modules added here also need to be added in the .vscodeignore file.
        vscode: 'commonjs vscode'
    },
    resolve: {
        mainFields: ['module', 'main'],
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: 'log'
    }
};

/** @type WebpackConfig */
const webConfig = {
    target: 'webworker',
    mode: 'none',

    entry: './src/extension.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        // Modules added here also need to be added in the .vscodeignore file.
        vscode: 'commonjs vscode'
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        extensions: ['.ts', '.js'],
        alias: {},
        fallback: {
            util: require.resolve('util')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: 'log'
    }
};

module.exports = [nodeConfig, webConfig];
