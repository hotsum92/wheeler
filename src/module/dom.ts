export const getUrl = (): string => {
  return window.location.href
}

export const assignUrl = (url: string): void => {
  window.location.assign(url)
}
