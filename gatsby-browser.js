import './src/styles/vendors/normalize.scss'
import './src/styles/vendors/tippy.scss'
import './src/styles/vendors/swiper.scss'
import './src/styles/vendors/code-theme.scss'
import './src/styles/global-styles.scss'
import './src/styles/custom-properties.scss'

import React from 'react'
import AppProviders from './src/AppProviders'
export const wrapRootElement = ({ element }) => <AppProviders>{element}</AppProviders>
