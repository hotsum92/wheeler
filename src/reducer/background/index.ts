import { combineReducers } from 'redux'
import app from '~/reducer/background/app'
import url from '~/reducer/background/url'
import * as fromAppBackgroundReducer from '~/reducer/background/app'
import * as fromUrlBackgroundReducer from '~/reducer/background/url'

const reducer = combineReducers({
  app,
  url,
})

export type State = ReturnType<typeof reducer>

export const getAppStatus = (state: State) =>
  fromAppBackgroundReducer.getStatus(state.app)

export const getUrlSelectRangeByUrl = (state: State, url: string) =>
  fromUrlBackgroundReducer.getUrlSelectRangeByUrl(state.url, url)

export default reducer
