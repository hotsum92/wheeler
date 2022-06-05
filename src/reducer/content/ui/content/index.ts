import { combineReducers } from 'redux'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromUrlInputDomain from '~/domain/url-input'
import { Action } from '~/action'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromApplyUrlInputContentProcessAction from '~/action/process/content/apply-url-input'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromInitializeContentContentProcessAction from '~/action/process/content/initialize-content'
import * as fromApplyPageInputContentProcessAction from '~/action/process/content/apply-page-input'
import * as fromApplyTabUpdateContentProcessAction from '~/action/process/content/apply-tab-update'

export const pageInput = (state = fromPageInputDomain.newPageInput(), action: Action): fromPageInputDomain.PageInput => {
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

    case fromApplyTabUpdateContentProcessAction.APPLY_TAB_UPDATE:
    case fromApplyUrlInputContentProcessAction.VALIDATED_URL_INPUT:
    case fromDisplayExtentionContentProcessAction.LOAD_URL_SELECT_RANGE_SUCCESS:
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

export const urlInput = (state = fromUrlInputDomain.newUrlInput(), action: Action): fromUrlInputDomain.UrlInput => {
  switch(action.type) {
    case fromContentUiAction.ON_CHANGE_URL_INPUT: {
      return fromUrlInputDomain.assignInput(state, action.payload.input)
    }

    case fromContentUiAction.ON_SELECT_URL_INPUT: {
      return fromUrlInputDomain.assignSelect(
        state,
        action.payload.selectStart,
      )
    }

    case fromApplyTabUpdateContentProcessAction.APPLY_TAB_UPDATE:
    case fromApplyUrlInputContentProcessAction.VALIDATED_URL_INPUT:
    case fromDisplayExtentionContentProcessAction.LOAD_URL_SELECT_RANGE_SUCCESS:
    case fromInitializeContentContentProcessAction.LOAD_URL_SELECT_RANGE_SUCCESS: {
      return fromUrlInputDomain.fromTabObject(action.payload.url, action.payload.selectTabObject)
    }

    case fromApplyPageInputContentProcessAction.VALIDATED_PAGE_INPUT: {
      return fromUrlInputDomain.assignPageInput(state, action.payload.pageInput)
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
