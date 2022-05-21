import { combineReducers } from 'redux'
import { Action } from '~/action'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromUrlKeyDomain from '~/domain/url-key'
import * as fromSaveUrlSelectRangeBackgroundProcessAction from '~/action/process/background/save-url-select-range'

export interface UrlData {
  urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
}

const urlKeys = (state = [] as fromUrlKeyDomain.UrlKey[], action: Action): fromUrlKeyDomain.UrlKey[] => {
  switch(action.type) {

    case fromSaveUrlSelectRangeBackgroundProcessAction.SAVE_URL_SELECT_RANGE: {
      const { payload: { url, selectStart } } = action
      const newUrlKey = fromUrlKeyDomain.fromSelectStart(url, selectStart)

      return [ ...state.filter(urlKey => !fromUrlKeyDomain.matchUrl(urlKey, url)), newUrlKey ]
    }

    default:
      return state

  }
}

const byUrlKey = (state = {} as { [key: fromUrlKeyDomain.UrlKey]: UrlData }, action: Action): { [key: fromUrlKeyDomain.UrlKey]: UrlData } => {
  switch(action.type) {

    case fromSaveUrlSelectRangeBackgroundProcessAction.SAVE_URL_SELECT_RANGE: {
      const { payload: { url, selectStart } } = action
      const newUrlKey = fromUrlKeyDomain.fromSelectStart(url, selectStart)

      return {
        ...Object.keys(state)
            .filter(urlKey => !fromUrlKeyDomain.matchUrl(urlKey, url))
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

export const getUrlSelectRangeByUrl = (state: State, url: string): fromUrlSelectRangeDomain.UrlSelectRange => {
  const urlKey = state.urlKeys.find(urlKey => fromUrlKeyDomain.matchUrl(urlKey, url))

  if(urlKey == null) return fromUrlSelectRangeDomain.fromUrl(url)
  return state.byUrlKey[urlKey].urlSelectRange
}

export default reducer
