import { combineReducers } from 'redux'
import { Action } from '~/action'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

const status = (state = fromAppStatusDomain.newAppStatus(), action: Action): fromAppStatusDomain.AppStatus => {
  switch(action.type) {
    case fromLoadContentScriptBackgroundProcessAction.RUN_APP: {
      return fromAppStatusDomain.runApp(state)
    }
    default: {
      return state
    }
  }
}

const urlSelectRange = (state = null, action: Action): fromUrlSelectRangeDomain.UrlSelectRange | null => {
  switch(action.type) {
    default: {
      return state
    }
  }
}

const reducer = combineReducers({
  status,
  urlSelectRange,
})

export type State = ReturnType<typeof reducer>

export const getStatus = (state: State) => {
  return state.status
}

export const getUrlSelectRange = (state: State) => {
  return state.urlSelectRange
}

export default reducer
