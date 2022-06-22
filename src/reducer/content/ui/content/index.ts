import { combineReducers } from 'redux'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromUrlInputDomain from '~/domain/url-input'
import { Action } from '~/action'
import * as fromContentStatusDomain from '~/domain/content-status'
import * as fromApplyUrlInputContentProcessAction from '~/action/process/content/apply-url-input'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyPageInputContentProcessAction from '~/action/process/content/apply-page-input'
import * as fromApplyTabUpdateContentProcessAction from '~/action/process/content/apply-tab-update'
import * as fromHideExtentionContentProcessAction from '~/action/process/content/hide-extention'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromApplyDefaultInputContentProcessAction from '~/action/process/content/apply-default-input'

export const status = (state = fromContentStatusDomain.newContentStatus(), action: Action): fromContentStatusDomain.ContentStatus => {
  switch(action.type) {
    case fromHideExtentionContentProcessAction.HID_DIV_ELEMENT: {
      return fromContentStatusDomain.hideContent(state)
    }

    case fromDisplayExtentionContentProcessAction.DISPLAYED_DIV_ELEMNET: {
      return fromContentStatusDomain.displayContent(state)
    }

    default: {
      return state
    }
  }
}

export const pageInput = (state = fromPageInputDomain.newPageInput(), action: Action): fromPageInputDomain.PageInput => {
  switch(action.type) {
    case fromContentUiAction.ON_CHANGE_PAGE_INPUT: {
      return fromPageInputDomain.assignInput(state, action.payload.input)
    }

    case fromContentUiAction.ON_CLICK_FORWARD_BUTTON: {
      if(fromPageInputDomain.invalid(state)) return state
      return fromPageInputDomain.forward(state)
    }

    case fromContentUiAction.ON_CLICK_BACKWARD_BUTTON: {
      if(fromPageInputDomain.invalid(state)) return state
      return fromPageInputDomain.backward(state)
    }

    case fromContentUiAction.ON_WHEEL_UP: {
      if(fromPageInputDomain.invalid(state)) return state
      return fromPageInputDomain.backward(state)
    }

    case fromContentUiAction.ON_WHEEL_DOWN: {
      if(fromPageInputDomain.invalid(state)) return state
      return fromPageInputDomain.forward(state)
    }

    case fromContentUiAction.ON_SELECT_URL_INPUT: {
      return fromPageInputDomain.assignInput(state, action.payload.select)
    }

    case fromApplyTabUpdateContentProcessAction.LOADED_URL_SELECT:
    case fromApplyUrlInputContentProcessAction.VALIDATED_URL_INPUT: {
      return fromPageInputDomain.fromTabObject(action.payload.url, action.payload.selectTabObject)
    }

    case fromApplyDefaultInputContentProcessAction.VALIDATED_URL: {
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

    case fromApplyTabUpdateContentProcessAction.LOADED_URL_SELECT:
    case fromApplyUrlInputContentProcessAction.VALIDATED_URL_INPUT: {
      return fromUrlInputDomain.fromTabObject(action.payload.url, action.payload.selectTabObject)
    }

    case fromApplyPageInputContentProcessAction.VALIDATED_PAGE_INPUT: {
      return fromUrlInputDomain.assignPageInput(state, action.payload.pageInput)
    }

    case fromApplyDefaultInputContentProcessAction.VALIDATED_URL: {
      return fromUrlInputDomain.fromUrl(action.payload.url)
    }

    default: {
      return state
    }
  }
}

const reducer = combineReducers({
  status,
  pageInput,
  urlInput,
})

export type State = ReturnType<typeof reducer>

export const getContentStatus = (state: State) => {
  return state.status
}

export const getPageInput = (state: State) => {
  return state.pageInput
}

export const getUrlInput = (state: State) => {
  return state.urlInput
}

export default reducer
