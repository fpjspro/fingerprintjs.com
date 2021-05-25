module.exports = {
  ci: {
    collect: {
      settings: {
        chromeFlags: '--no-sandbox',
        emulatedFormFactor: 'desktop',
        throttling: { rttMs: 40, throughputKbps: 10 * 1024, cpuSlowdownMultiplier: 1 },
      },
      staticDistDir: './public',
      url: [
        'http://localhost/index.html',
        'http://localhost/demo/index.html',
        'http://localhost/pricing/index.html',
        'http://localhost/case-studies/edtech/index.html',
        'http://localhost/ecommerce/index.html',
        'http://localhost/github/index.html',
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
