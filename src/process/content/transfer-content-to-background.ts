import { takeEvery, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyUrlSelectRangeInputContentProcessAction from '~/action/process/content/apply-url-select-range-input'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromHideExtentionContentProcessAction from '~/action/process/content/hide-extention'

export const actions = [
  fromContentUiAction.ON_LOAD_CONTENT_UI,
  fromApplyUrlSelectRangeInputContentProcessAction.VALIDATED_URL_SELECT_RANGE_INPUT,
  fromDisplayExtentionContentProcessAction.DISPLAYED_DIV_ELEMNET,
  fromHideExtentionContentProcessAction.HID_DIV_ELEMENT,
]

type Action =
  | fromContentUiAction.OnLoadContentUi
  | fromApplyUrlSelectRangeInputContentProcessAction.ValidatedUrlSelectRangeInput
  | fromDisplayExtentionContentProcessAction.DisplayedDivElement
  | fromHideExtentionContentProcessAction.HidDivElement

export function* watchTransferContentToBackground(
  saga: ReturnType<typeof createTransferContentToBackground>,
) {
  yield takeEvery(
    actions,
    saga,
  )
}

export const createTransferContentToBackground = (
  chromeRuntimeSendMessage: typeof fromChromeModule.chromeRuntimeSendMessage,
) => {
  return function* (action: Action) {
    if(actions.includes(action.type)) {
      yield call(chromeRuntimeSendMessage, action)
    }
  }
}
