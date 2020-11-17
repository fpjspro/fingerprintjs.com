import Loadable from '@loadable/component'

const LoadableSelect = Loadable(() => import('./Select'))

export default LoadableSelect
