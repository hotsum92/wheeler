export const getUrl = (): string => {
  return window.location.href
}

export const assignUrl = (url: string): void => {
  window.location.assign(url)
}

let divElement: HTMLDivElement | null = null

export const getDivElement = (): HTMLDivElement => {
  if(divElement == null) {
    const div = document.createElement('div')
    divElement = div
    return div
  }
  return divElement
}

export const appendDivElement = (element: HTMLDivElement) => {
  document.body.appendChild(element)
}

export const hideDivElement = () => {
  const div = getDivElement()
  div.style.display = 'none'
}
