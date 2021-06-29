import CMS from 'netlify-cms-app'

import { LongFormContentPreview } from '../templates/long-form-content'
import { StaticPageContentPreview } from '../templates/static-page-content'
import { CaseStudiesContentPreview } from '../templates/case-studies-content'

CMS.registerPreviewTemplate('blog', LongFormContentPreview)
CMS.registerPreviewTemplate('index', StaticPageContentPreview)
CMS.registerPreviewTemplate('case-studies', CaseStudiesContentPreview)
