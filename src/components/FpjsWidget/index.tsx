import Loadable from '@loadable/component'

const LoadableFpjsWidget = Loadable(() => import('./FpjsWidget'))

export default LoadableFpjsWidget
