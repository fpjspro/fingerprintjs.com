export function kebabToTitle(text: string) {
  return text
    .split('-')
    .map((word) => `${word[0].toUpperCase()}${word.substr(1)}`)
    .join(' ')
}

export function kebabToUpper(text: string) {
  return text.split('-').join(' ').toUpperCase()
}

export function kebabToStart(text: string) {
  return `${text[0].toUpperCase()}${text.split('-').join(' ').substring(1)}`
}
