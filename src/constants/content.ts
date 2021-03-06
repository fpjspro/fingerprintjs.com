import { BRANCH } from './env'

export const BASE_URL = 'https://fingerprintjs.com/'

export const PATH = {
  demoUrl: '/demo/',
  pricingUrl: '/pricing/',
  accountTakeover: '/account-takeover/',
  ecommerce: '/ecommerce/',
  gaming: '/gaming/',
  cryptocurrency: '/cryptocurrency/',
  paymentFraud: '/payment-fraud/',
  accountSharing: '/account-sharing/',
  whyFpjs: '/why-fpjs/',
  blog: '/blog/',
  paywall: '/paywall/',
  caseStudies: '/case-studies/',
} as const

export const URL = {
  githubRepoUrl: 'https://github.com/fingerprintjs/fingerprintjs/',
  githubApiUrl: 'https://api.github.com/repos/fingerprintjs/fingerprintjs',
  dashboardLoginUrl: 'https://dashboard.fingerprintjs.com/login/',
  careersUrl: 'https://fingerprintjs.breezy.hr/',
  linkedinUrl: 'https://www.linkedin.com/company/fingerprintjs/',
  twitterUrl: 'https://twitter.com/FingerprintJs/',
  signupUrl: 'https://dashboard.fingerprintjs.com/signup/',
  statusUrl: 'https://status.fingerprintjs.com/',
  newsletterUrl: 'https://mailchi.mp/708d84efc0c1/updates-signup',
} as const

export const MAILTO = { mailToUrl: 'mailto:support@fingerprintjs.com' } as const

export const DOC_URL = {
  documentationUrl: 'https://dev.fingerprintjs.com/',
  getStartedUrl: 'https://dev.fingerprintjs.com/docs/quick-start-guide/',
  proVsOpenUrl: 'https://dev.fingerprintjs.com/docs/pro-vs-open-source/',
  browserFingerprintUrl: 'https://dev.fingerprintjs.com/docs/browser-fingerprinting/',
  incognitoUrl: 'https://dev.fingerprintjs.com/docs/incognito-private-mode-detection/',
  serverApiUrl: 'https://dev.fingerprintjs.com/docs/server-api/',
  legalUrl: 'https://dev.fingerprintjs.com/docs/dpa-gdpr/',
  termOfUseUrl: 'https://dev.fingerprintjs.com/docs/terms-of-service/',
  privacyPolicyUrl: 'https://dev.fingerprintjs.com/docs/privacy-policy/',
  browserSupportUrl: 'https://dev.fingerprintjs.com/docs/browser-support/',
} as const

export const useCaseLinks = [
  { title: 'Account Takeover', url: PATH.accountTakeover, isLocal: true },
  { title: 'Payment Fraud', url: PATH.paymentFraud, isLocal: true },
  { title: 'Account Sharing', url: PATH.accountSharing, isLocal: true },
  { title: 'Paywall', url: PATH.paywall, isLocal: true },
  { title: 'Ecommerce', url: PATH.ecommerce, isLocal: true },
  { title: 'Gaming', url: PATH.gaming, isLocal: true },
  { title: 'Cryptocurrency', url: PATH.cryptocurrency, isLocal: true },
]

export const defaultDataLayer = [{ branch: BRANCH }]
