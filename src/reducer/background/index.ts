import { combineReducers } from 'redux'
import app from '~/reducer/background/app'
import url from '~/reducer/background/url'
import tab from '~/reducer/background/tab'
import * as fromAppBackgroundReducer from '~/reducer/background/app'
import * as fromUrlBackgroundReducer from '~/reducer/background/url'
import * as fromTabBackgroundReducer from '~/reducer/background/tab'

const reducer = combineReducers({
  app,
  url,
  tab,
})

export type State = ReturnType<typeof reducer>

export const getAppStatusByTabId = (state: State, tabId: number) =>
  fromTabBackgroundReducer.getAppStatusByTabId(state.tab, tabId)

export const getAppStatus = (state: State) =>
  fromAppBackgroundReducer.getStatus(state.app)

export const getUrlSelectRangeByUrl = (state: State, url: string) =>
  fromUrlBackgroundReducer.getUrlSelectRangeByUrl(state.url, url)

export default reducer
