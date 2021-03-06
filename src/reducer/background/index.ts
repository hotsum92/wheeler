import { combineReducers } from 'redux'
import url from '~/reducer/background/url'
import tab from '~/reducer/background/tab'
import * as fromUrlBackgroundReducer from '~/reducer/background/url'
import * as fromTabBackgroundReducer from '~/reducer/background/tab'

const reducer = combineReducers({
  url,
  tab,
})

export type State = ReturnType<typeof reducer>

export const getAppStatusByTabId = (state: State, tabId: number) =>
  fromTabBackgroundReducer.getAppStatusByTabId(state.tab, tabId)

export const getUrlSelectRangeByUrl = (state: State, url: string) =>
  fromUrlBackgroundReducer.getUrlSelectRangeByUrl(state.url, url)

export default reducer
