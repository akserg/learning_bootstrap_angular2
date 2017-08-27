const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const helpers = require('./helpers');

module.exports = function() {

  return {

    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
      modules: [
        helpers.root('src'),
        helpers.root('node_modules')
      ],
    },

    // Entry points the bundles
    entry: {
      'polyfills': helpers.root('src', 'polyfills.ts'),
      'vendor': helpers.root('src', 'vendor.ts'),
      'app': [
        helpers.root('src', 'main.ts'),
        helpers.root('src', 'assets', 'ecommerce.scss')
      ],
    },

    module: {
      rules: [
        // Compiles all .ts files
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader?silent=true', 'angular2-template-loader'],
          exclude: /\.spec\.ts$/
        },
        // Injects all html templates into their components and loads referenced assets
        {
          test: /\.html$/,
          use: 'html-loader',
          exclude: helpers.root('src/index.html')
        },
        // Copies all images and fonts into dist/assets
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
          use: 'file-loader?name=assets/[name].[ext]'
        },
        // Puts all styles from assets/ecommerce.scss in a separate file
        {
          test: /\.scss$/,
          exclude: helpers.root('src', 'app'),
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
        },
        {
          test: /\.scss$/,
          include: helpers.root('src', 'app'),
          loaders: ['raw-loader', 'sass-loader']
        },
        // Loads all "required" json files into their components
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        // Support for CSS as raw text
        // all css in src/style will be bundled in an external css file
        {
          test    : /\.css$/,
          exclude : helpers.root('src', 'app'),
          use:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']}) // , 
        },
        // all css required in src/app files will be merged in js files
        {test: /\.css$/, include: helpers.root('src', 'app'), use: 'raw-loader'},
      ]
    },

    plugins: [
      new WebpackMd5Hash(),
      // File name for the extracted styles
      new ExtractTextPlugin('[name].css'),
      // Identifies common modules and puts them into a commons chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills'],
        minChunks: Infinity
      }),
      // Provides context to Angular's use of System.import
      // See: https://github.com/AngularClass/angular2-webpack-starter/issues/993#issuecomment-283423040
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('src')
      ),
      // Generates an HTML5 file that includes all webpack bundles
      new HtmlWebpackPlugin({
        chunkSortMode: 'dependency', 
        inject: 'body', 
        template: helpers.root('src', 'index.html')
      }),
      new ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
        Button: "exports-loader?Button!bootstrap/js/dist/button",
        Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
        Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Util: "exports-loader?Util!bootstrap/js/dist/util"
      })
    ],

    performance: {
      hints: false
    }

  };

};
