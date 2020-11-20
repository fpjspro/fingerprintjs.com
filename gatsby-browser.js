import './src/styles/vendors/normalize.scss'
import './src/styles/vendors/tippy.scss'
import './src/styles/vendors/swiper.scss'
import './src/styles/vendors/code-theme.scss'
import './src/styles/global-styles.scss'
import './src/styles/custom-properties.scss'

import React from 'react'
import { FpjsProvider } from './src/context/FpjsContext'
export const wrapRootElement = ({ element }) => <FpjsProvider>{element}</FpjsProvider>
