import CMS from 'netlify-cms-app'

import { AccountSharingPagePreview } from '../templates/account-sharing-page'
import { HeroPagePreview } from '../templates/hero-page'

CMS.registerPreviewTemplate('account-sharing-page', AccountSharingPagePreview)
CMS.registerPreviewTemplate('hero-page', HeroPagePreview)
