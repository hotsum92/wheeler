import { combineReducers } from 'redux'
import { Action } from '~/action'
import url from '~/reducer/background/url'
import tab from '~/reducer/background/tab'
import * as fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction from '~/action/process/background/initialize-after-load-background-script'
import * as fromUrlBackgroundReducer from '~/reducer/background/url'
import * as fromTabBackgroundReducer from '~/reducer/background/tab'

const reducer = combineReducers({
  url,
  tab,
})

export type State = ReturnType<typeof reducer>

const rootReducer = (state: any, action: Action): any => {
  if(action.type === fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction.INITIALIZED) {
    return action.payload.reducerStorage
  }
  return reducer(state, action)
}

export const getAllState = (state: State) => state

export const getAppStatusByTabId = (state: State, tabId: number) =>
  fromTabBackgroundReducer.getAppStatusByTabId(state.tab, tabId)

export const getUrlSelectRangeByUrl = (state: State, url: string) =>
  fromUrlBackgroundReducer.getUrlSelectRangeByUrl(state.url, url)

export default rootReducer
