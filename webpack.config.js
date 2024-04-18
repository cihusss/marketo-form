module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'mkto-form-bundle.js',
  },
  mode: 'production',
  stats: {
    orphanModules: true,
  },
}