import CMS from 'netlify-cms-app'

import { AccountSharingPagePreview } from '../templates/account-sharing-page'
import { LongFormContentPreview } from '../templates/long-form-content'

CMS.registerPreviewTemplate('account-sharing-page', AccountSharingPagePreview)
CMS.registerPreviewTemplate('blog', LongFormContentPreview)
