import CMS from 'netlify-cms-app'

import { AccountSharingPagePreview } from '../templates/account-sharing-page'
import { CmsStaticPagePreview } from '../templates/cms-static-page'

CMS.registerPreviewTemplate('account-sharing-page', AccountSharingPagePreview)
CMS.registerPreviewTemplate('cms-static-page', CmsStaticPagePreview)
