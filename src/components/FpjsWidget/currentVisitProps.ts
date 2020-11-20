import { VisitorResponse } from './visitorResponse'

export interface CurrentVisitProps {
  currentVisit?: VisitorResponse
  visits: VisitorResponse[]
  visitorId: string
}
