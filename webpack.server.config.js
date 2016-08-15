var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

module.exports = {
    entry: './src/server',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.bundle.js',
    },
    
    externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
      'react-dom/server', 'react/addons',
    ]).reduce(function (ext, mod) {
      ext[mod] = 'commonjs ' + mod
      return ext
    }, {}),
    
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader']
        }]
    },
    devServer: {
        contentBase: "./dist",
        hot: true
    }
}
