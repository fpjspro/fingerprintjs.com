module.exports = {
  ci: {
    collect: {
      settings: {
        chromeFlags: '--no-sandbox',
        emulatedFormFactor: 'desktop',
      },
      staticDistDir: './public',
      url: [
        'http://localhost/index.html',
        'http://localhost/demo/index.html',
        'http://localhost/pricing/index.html',
        'http://localhost/case-studies/edtech/index.html',
        'http://localhost/ecommerce/index.html',
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
