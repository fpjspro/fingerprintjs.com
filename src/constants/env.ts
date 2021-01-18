type EnvironmentVariable = string | number | boolean | undefined

enum NetlifyContext {
  Production,
  DeployPreview,
  BranchDeploy,
}
const context: NetlifyContext = getNetlifyContext()

export const FPJS_TOKEN =
  getContextEnv({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_TOKEN,
  }) ?? 'test_client_token'
export const FPJS_API_TOKEN =
  getContextEnv({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_API_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_API_TOKEN,
  }) ?? 'test_fpjs_api_token'
export const FPJS_ENDPOINT =
  getContextEnv({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_ENDPOINT,
  }) ?? ''
export const FPJS_REGION = process.env.GATSBY_FPJS_REGION
export const FPJS_DASHBOARD_ENDPOINT = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT
export const FPJS_MONITORING_CLIENT_ID = process.env.GATSBY_FPJS_MONITORING_CLIENT_ID
export const FPJS_MONITORING_TOKEN = process.env.GATSBY_FPJS_MONITORING_TOKEN
export const GITHUB_API_TOKEN = process.env.GATSBY_GITHUB_API_TOKEN
export const GTM_TOKEN = process.env.GATSBY_GTM_TOKEN
export const OPTIMIZE_TOKEN = process.env.GATSBY_OPTIMIZE_TOKEN
export const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN
export const ROLLBAR_ACCESS_TOKEN = process.env.GATSBY_ROLLBAR_ACCESS_TOKEN
export const FPJS_LEAD_URL = process.env.GATSBY_FPJS_LEAD_URL ?? ''
export const BRANCH = process.env.BRANCH

function getNetlifyContext(): NetlifyContext {
  switch (process.env.CONTEXT) {
    case 'production':
      return NetlifyContext.Production
    case 'deploy-preview':
      return NetlifyContext.DeployPreview
    case 'branch-deploy':
      return NetlifyContext.BranchDeploy
    default:
      return NetlifyContext.Production
  }
}

function getContextEnv(entries: { [key in NetlifyContext]?: EnvironmentVariable }) {
  return entries[context] ?? entries[NetlifyContext.Production]
}
