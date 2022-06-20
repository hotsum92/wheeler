import { combineReducers } from 'redux'
import { Action } from '~/action'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromInitializeBackgroundScriptBackgroundProcessAction from '~/action/process/background/initialize-background-script'
import * as fromAppStatusDomain from '~/domain/app-status'

export interface TabData {
  appStatus: fromAppStatusDomain.AppStatus
}

const tabIds = (state = [] as number[], action: Action): number[] => {
  switch(action.type) {

    case fromLoadContentScriptBackgroundProcessAction.RUN_APP: {
      if(state.includes(action.payload.tabId)) return state
      return [ ...state, action.payload.tabId ]
    }

    case fromInitializeBackgroundScriptBackgroundProcessAction.LOAD_STATE: {
      return [ ...state, ...action.payload.reducerStorage.tab.tabIds ]
        .filter((elem, index, self) => self.indexOf(elem) === index)
    }

    default:
      return state
  }
}

const byTabId = (state = {} as { [key: number]: TabData }, action: Action): { [key: number]: TabData } => {
  switch(action.type) {

    case fromLoadContentScriptBackgroundProcessAction.RUN_APP: {
      const appStatus = state[action.payload.tabId] ? state[action.payload.tabId].appStatus : fromAppStatusDomain.newAppStatus()

      return {
        ...state,
        [action.payload.tabId]: {
          ...state[action.payload.tabId],
          appStatus: fromAppStatusDomain.runApp(appStatus)
        }
      }
    }

    case fromLoadContentScriptBackgroundProcessAction.STOP_APP: {
      const appStatus = state[action.payload.tabId].appStatus

      return {
        ...state,
        [action.payload.tabId]: {
          ...state[action.payload.tabId],
          appStatus: fromAppStatusDomain.stopApp(appStatus)
        }
      }
    }

    case fromInitializeBackgroundScriptBackgroundProcessAction.LOAD_STATE: {
      return {
        ...action.payload.reducerStorage.tab.byTabId,
        ...state,
      }
    }

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
  if(state.byTabId[tabId] == null) return fromAppStatusDomain.newAppStatus()
  return state.byTabId[tabId].appStatus
}

export const getAllTabIds = (state: State): number[] => {
  return state.tabIds
}

export default reducer
