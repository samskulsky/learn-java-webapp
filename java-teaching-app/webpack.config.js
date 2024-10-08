const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['javascript', 'java', 'typescript'], // Specify languages for syntax highlighting
      features: ['coreCommands', 'find', 'comment', 'wordOperations', 'suggest'], // Include autocomplete and other features
    }),
  ],
};
