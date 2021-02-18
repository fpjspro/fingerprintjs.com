import { FPJS_LEAD_URL } from '../constants/env'

export async function createNewLead(email: string, website: string, utmInfo: Record<string, string>) {
  return fetch(FPJS_LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      website,
      name: email,
      utmInfo,
    }),
  })
}
