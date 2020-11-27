import { GATSBY_FPJS_LEAD_URL } from '../constants/env'

export async function createNewLead(email: string, website: string) {
  return fetch(GATSBY_FPJS_LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      website,
      name: email,
    }),
  })
}
