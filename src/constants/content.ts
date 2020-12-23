export const BASE_URL = 'https://fingerprintjs.com'

export const PATH = {
  demoUrl: '/demo/',
  pricingUrl: '/pricing/',
  ecommerce: 'ecommerce/',
  whyFpjs: '/why-fpjs/',
} as const

export const URL = {
  githubRepoUrl: 'https://github.com/fingerprintjs/fingerprintjs',
  githubApiUrl: 'https://api.github.com/repos/fingerprintjs/fingerprintjs',
  dashboardLoginUrl: 'https://dashboard.fingerprintjs.com/login',
  careersUrl: 'https://fingerprintjs.breezy.hr/',
  linkedinUrl: 'https://www.linkedin.com/company/fingerprintjs/',
  twitterUrl: 'https://twitter.com/FingerprintJs',
  signupUrl: 'https://dashboard.fingerprintjs.com/signup',
} as const

export const MAILTO = { mailToUrl: 'mailto:support@fingerprintjs.com' } as const

export const DOC_URL = {
  documentationUrl: 'https://dev.fingerprintjs.com',
  getStartedUrl: 'https://dev.fingerprintjs.com/docs/quick-start-guide',
  proVsFreeUrl: 'https://dev.fingerprintjs.com/docs/pro-vs-free',
  browserFingerprintUrl: 'https://dev.fingerprintjs.com/docs/browser-fingerprinting',
  incognitoUrl: 'https://dev.fingerprintjs.com/docs/incognito-private-mode-detection',
  serverApiUrl: 'https://dev.fingerprintjs.com/docs/server-api',
  legalUrl: 'https://dev.fingerprintjs.com/docs/dpa-gdpr',
  termOfUseUrl: 'https://dev.fingerprintjs.com/docs/terms-of-service',
  privacyPolicyUrl: 'https://dev.fingerprintjs.com/docs/privacy-policy',
} as const

export const useCaseLinks = [
  { title: 'Account Takeover', url: '/account-takeover/', isLocal: true },
  { title: 'Gaming', url: '/gaming/', isLocal: true },
  { title: 'Cryptocurrency', url: '/cryptocurrency/', isLocal: true },
  { title: 'Payment Fraud', url: '/payment-fraud/', isLocal: true },
  { title: 'Account Sharing', url: '/account-sharing/', isLocal: true },
]
