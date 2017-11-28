// vim:ts=2:et

module.exports = {
  entry: './client/App.jsx',
  output: {
    path: __dirname + '/static',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  }
};

