import { combineReducers } from 'redux'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromUrlInputDomain from '~/domain/url-input'
import { Action } from '~/action'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromInitializeContentContentProcessAction from '~/action/process/content/initialize-content'
import * as fromApplyPageContentProcessAction from '~/action/process/content/apply-page'

const pageInput = (state = fromPageInputDomain.newPageInput(), action: Action): fromPageInputDomain.PageInput => {
  switch(action.type) {
    case fromContentUiAction.ON_CHANGE_PAGE_INPUT: {
      return fromPageInputDomain.assignInput(state, action.payload.input)
    }

    case fromContentUiAction.ON_CLICK_FORWARD_BUTTON: {
      return fromPageInputDomain.forward(state)
    }

    case fromContentUiAction.ON_CLICK_BACKWARD_BUTTON: {
      return fromPageInputDomain.backward(state)
    }

    case fromContentUiAction.ON_WHEEL_UP: {
      return fromPageInputDomain.backward(state)
    }

    case fromContentUiAction.ON_WHEEL_DOWN: {
      return fromPageInputDomain.forward(state)
    }

    case fromContentUiAction.ON_SELECT_URL_INPUT: {
      return fromPageInputDomain.assignInput(state, action.payload.select)
    }

    case fromInitializeContentContentProcessAction.LOAD_URL_SELECT_RANGE_SUCCESS: {
      return fromPageInputDomain.fromTabObject(action.payload.url, action.payload.selectTabObject)
    }

    case fromInitializeContentContentProcessAction.LOAD_URL_SELECT_RANGE_SUCCESS: {
      return fromPageInputDomain.fromTabObject(action.payload.url, action.payload.selectTabObject)
    }

    case fromInitializeContentContentProcessAction.INITIALIZE_URL_SELECT_RANGE: {
      return fromPageInputDomain.fromUrl(action.payload.url)
    }

    default: {
      return state
    }
  }
}

const urlInput = (state = fromUrlInputDomain.newUrlInput(), action: Action): fromUrlInputDomain.UrlInput => {
  switch(action.type) {
    case fromContentUiAction.ON_CHANGE_URL_INPUT: {
      return fromUrlInputDomain.assignInput(state, action.payload.input)
    }

    case fromContentUiAction.ON_SELECT_URL_INPUT: {
      return fromUrlInputDomain.assignSelect(
        state,
        action.payload.selectStart,
        action.payload.select,
      )
    }

    case fromInitializeContentContentProcessAction.LOAD_URL_SELECT_RANGE_SUCCESS: {
      return fromUrlInputDomain.fromTabObject(action.payload.url, action.payload.selectTabObject)
    }

    case fromApplyPageContentProcessAction.APPLY_PAGE: {
      return fromUrlInputDomain.assignPage(state, action.payload.page)
    }

    case fromInitializeContentContentProcessAction.INITIALIZE_URL_SELECT_RANGE: {
      return fromUrlInputDomain.fromUrl(action.payload.url)
    }

    default: {
      return state
    }
  }
}

const reducer = combineReducers({
  pageInput,
  urlInput,
})

export type State = ReturnType<typeof reducer>

export const getPageInput = (state: State) => {
  return state.pageInput
}

export const getUrlInput = (state: State) => {
  return state.urlInput
}

export default reducer
