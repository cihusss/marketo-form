const path = require('path')
const CleanCSS = require('clean-css')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'mkto-form-bundle.js',
  },
  mode: 'production',
  stats: {
    orphanModules: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        to: './mkto-form.min.css',
        from: path.resolve(__dirname, 'src/css', 'marketo-form.css'),
        transform: content => (new CleanCSS({level: 2}).minify(content)).styles
      }]
    })
  ]
}