import { Breadcrumb } from '../components/Breadcrumbs'

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export interface GeneratedPageContext {
  breadcrumb: { crumbs: Array<Breadcrumb> }
}
