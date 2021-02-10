module.exports = {
  ci: {
    collect: {
      staticDistDir: './public',
      url: ['http://localhost/index.html', 'http://localhost/demo/index.html', 'http://localhost/pricing/index.html'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
