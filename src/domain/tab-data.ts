import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export interface TabData {
  urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
}

export const applyUrlSelectRange = (tabData: TabData, urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange): TabData => {
  return {
    ...tabData,
    urlSelectRange,
  }
}
