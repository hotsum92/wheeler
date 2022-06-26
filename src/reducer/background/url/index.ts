import { combineReducers } from 'redux'
import { Action } from '~/action'
import * as fromUrlDomain from '~/domain/url'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromUrlKeyDomain from '~/domain/url-key'
import * as fromSaveUrlSelectRangeBackgroundProcessAction from '~/action/process/background/save-url-select-range'

export interface UrlData {
  urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
}

const urlKeys = (state = [] as fromUrlKeyDomain.UrlKey[], action: Action): fromUrlKeyDomain.UrlKey[] => {
  switch(action.type) {

    case fromSaveUrlSelectRangeBackgroundProcessAction.SAVE_URL_SELECT_RANGE: {
      const { payload: { url } } = action
      const urlKey = fromUrlKeyDomain.fromUrl(url)

      return [ ...state.filter(fromUrlKeyDomain.excludeByUrl(url)), urlKey ]
    }

    default:
      return state

  }
}

const byUrlKey = (state = {} as { [key: fromUrlKeyDomain.UrlKey]: UrlData }, action: Action): { [key: fromUrlKeyDomain.UrlKey]: UrlData } => {
  switch(action.type) {

    case fromSaveUrlSelectRangeBackgroundProcessAction.SAVE_URL_SELECT_RANGE: {
      const { payload: { url } } = action
      const newUrlKey = fromUrlKeyDomain.fromUrl(url)

      return {
        ...Object.keys(state)
            .filter(fromUrlKeyDomain.excludeByUrl(url))
            .reduce((obj, urlKey) => {
              return {
                ...obj,
                [urlKey]: state[urlKey]
              }
            }, {}),
        [newUrlKey]: {
          urlSelectRange: fromUrlSelectRangeDomain.fromAction(action)
        },
      }
    }

    default:
      return state

  }
}

const reducer = combineReducers({
  urlKeys,
  byUrlKey,
})

export type State = ReturnType<typeof reducer>

export const getUrlSelectRangeByUrl = (state: State, url: fromUrlDomain.Url): fromUrlSelectRangeDomain.UrlSelectRange => {
  const urlKey = state.urlKeys.find(fromUrlKeyDomain.filterByUrl(url))

  if(urlKey == null) return fromUrlSelectRangeDomain.fromUrl(url)
  return state.byUrlKey[urlKey].urlSelectRange
}

export default reducer
