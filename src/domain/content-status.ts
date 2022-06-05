export const DISPLAY = 'DISPLAY'
export const HIDDEN = 'HIDDEN'

export type Status = typeof DISPLAY | typeof HIDDEN

export interface ContentStatus {
  status: Status
}

export const newContentStatus = (status: Status = DISPLAY) => {
  return {
    status,
  }
}

export const displayContent = (contentStatus: ContentStatus): ContentStatus => {
  return {
    ...contentStatus,
    status: DISPLAY,
  }
}

export const hideContent = (contentStatus: ContentStatus): ContentStatus => {
  return {
    ...contentStatus,
    status: HIDDEN,
  }
}

export const isDisplay = (contentStatus: ContentStatus): boolean => {
  return contentStatus.status === DISPLAY
}

export const isHidden = (contentStatus: ContentStatus): boolean => {
  return contentStatus.status === HIDDEN
}
