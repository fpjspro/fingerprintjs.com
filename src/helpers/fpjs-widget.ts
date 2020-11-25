export function pluralize(num, one, many) {
  num = Math.floor(num)

  if (num === 1) {
    return `${num} ${one}`
  }

  return `${num} ${many}`
}

export function getVisitTitle(timestamp, now = Date.now()) {
  const secondsDiff = Math.floor((now - timestamp) / 1000)

  if (secondsDiff < 1) {
    return 'Just now'
  }

  if (secondsDiff < 60) {
    return pluralize(secondsDiff, 'second ago', 'seconds ago')
  }

  if (secondsDiff < 60 * 60) {
    return pluralize(secondsDiff / 60, 'minute ago', 'minutes ago')
  }

  if (secondsDiff < 60 * 60 * 24) {
    return pluralize(secondsDiff / (60 * 60), 'hour ago', 'hours ago')
  }

  if (secondsDiff < 60 * 60 * 24 * 7) {
    return pluralize(secondsDiff / (60 * 60 * 24), 'day ago', 'days ago')
  }

  return new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function getBrowserName({ browserName, browserVersion, os, osVersion, device }) {
  let browserStr = browserName

  if (browserVersion) {
    browserStr += ' ' + browserVersion
  }
  if (os) {
    browserStr += ' on ' + os
  }
  if (osVersion) {
    browserStr += ' (' + osVersion + ')'
  }
  if (device && device !== 'Unknown' && device !== 'Other') {
    browserStr += ', ' + device
  }

  return browserStr
}

export function getBotDecision(botProbability) {
  if (botProbability < 0.6) {
    return 'No'
  } else if (botProbability < 0.8) {
    return 'Probably'
  }

  return 'Yes'
}
