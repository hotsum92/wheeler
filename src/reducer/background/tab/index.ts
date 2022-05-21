import { combineReducers } from 'redux'
import { Action } from '~/action'
import * as fromAppStatusDomain from '~/domain/app-status'

export interface TabData {
  appStatus: fromAppStatusDomain.AppStatus
}

const tabIds = (state = [] as number[], action: Action): number[] => {
  switch(action.type) {

    default:
      return state
  }
}

const byTabId = (state = {} as { [key: number]: TabData }, action: Action): { [key: number]: TabData } => {
  switch(action.type) {

    default:
      return state
  }
}

const reducer = combineReducers({
  tabIds,
  byTabId,
})

export type State = ReturnType<typeof reducer>

export const getAppStatusByTabId = (state: State, tabId: number): fromAppStatusDomain.AppStatus => {
  return state.byTabId[tabId].appStatus
}

export default reducer
