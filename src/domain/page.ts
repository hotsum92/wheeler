export type Page = number

export const invalid = (input: string): boolean => {
  const n = toPage(input)
  if(isNaN(n)) return true
  if(n.toString() !== input) return true
  return false
}

export const toPage = (input: string): Page => {
  return parseInt(input, 10)
}

export const toNumber = (page: Page): number => {
  return page
}
