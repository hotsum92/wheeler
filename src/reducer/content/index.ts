import { combineReducers } from 'redux'
import ui from '~/reducer/content/ui'
import * as fromContentUiContentReducer from '~/reducer/content/ui/content'
import * as fromUrlInputDomain from '~/domain/url-input'

export const reducer = combineReducers({
  ui,
})

export type State = ReturnType<typeof reducer>

export function getUrl(state: State): string {
  const urlInput = getContentUiUrlInput(state)
  return fromUrlInputDomain.toUrl(urlInput)
}

export function getContentUiPageInput(state: State) {
  return fromContentUiContentReducer.getPageInput(state.ui.content)
}

export function getContentUiUrlInput(state: State) {
  return fromContentUiContentReducer.getUrlInput(state.ui.content)
}

export default reducer
