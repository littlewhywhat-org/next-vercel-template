module.exports = {
  default: {
    paths: ['docs/flows/*.feature'],
    import: ['features/support/**/*.ts'],
    format: ['progress', 'json:cucumber-report.json'],
  },
};
