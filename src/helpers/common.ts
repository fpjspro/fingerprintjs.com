export function objectFromEntries(entries: IterableIterator<[string, string]>) {
  const result = {} as Record<string, string>

  // Creating an array from the iterator removes the need to use the --downlevelIteration compiler option.
  for (const [key, value] of Array.from(entries)) {
    result[key] = value
  }
  return result
}

export function buildQueryString(values: Record<string, string>) {
  const queryString = new URLSearchParams(values).toString()
  return queryString.length > 0 ? `?${queryString}` : ''
}
