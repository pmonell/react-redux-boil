var path = require('path');

module.exports = {
    entry: './src/client',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    module: {
        loaders: [{
            test: /\jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader']
        }]
    }
}
