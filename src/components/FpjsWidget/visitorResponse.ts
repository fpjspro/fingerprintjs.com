import { FullIpExtendedGetResult } from '@fingerprintjs/fingerprintjs-pro'

export interface VisitorResponse extends FullIpExtendedGetResult {
  timestamp: number
  browserDetails: {
    botProbability: number
    browserName: string
    browserVersion: string
    os: string
    osVersion: string
    device: string
  }
}
