import { call, take, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromHandleChromeRuntimeOnMessageChannelProcessAction from '~/action/process/background/handle-chrome-runtime-on-message-channel'
import * as fromChromeRuntimeOnMessageBackgroundChannelProcess from '~/process/channel/chrome-runtime-on-message-background'
import * as fromApplyUrlSelectRangeInputContentProcessAction from '~/action/process/content/apply-url-select-range-input'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromHideExtentionContentProcessAction from '~/action/process/content/hide-extention'

export const actions = [
  fromContentUiAction.ON_LOAD_CONTENT_UI,
  fromApplyUrlSelectRangeInputContentProcessAction.VALIDATED_URL_SELECT_RANGE_INPUT,
  fromDisplayExtentionContentProcessAction.DISPLAYED_DIV_ELEMNET,
  fromHideExtentionContentProcessAction.HID_DIV_ELEMENT,
]

export function* watchHandleChromeRuntimeOnMessage(
  saga: ReturnType<typeof createHandleChromeRuntimeOnMessage>,
) {
  const chan: fromChromeRuntimeOnMessageBackgroundChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageBackgroundChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse, tabId }: fromChromeRuntimeOnMessageBackgroundChannelProcess.Message = yield take(chan)

    if(actions.includes(action.type)) {
      yield call(sendResponse)
      yield call(saga, action, tabId)
      continue
    }

  }
}

export const createHandleChromeRuntimeOnMessage = (
) => {
  return function* (
    action: Action,
    tabId: number
  ) {
    if(action.type === fromContentUiAction.ON_LOAD_CONTENT_UI) {
      yield put(fromHandleChromeRuntimeOnMessageChannelProcessAction.onLoadContentUi(tabId))
      return
    }

    if(action.type === fromDisplayExtentionContentProcessAction.DISPLAYED_DIV_ELEMNET) {
      yield put(fromHandleChromeRuntimeOnMessageChannelProcessAction.displayedDivElement(tabId))
      return
    }

    if(action.type === fromHideExtentionContentProcessAction.HID_DIV_ELEMENT) {
      yield put(fromHandleChromeRuntimeOnMessageChannelProcessAction.hidDivElement(tabId))
      return
    }

    if(action.type === fromApplyUrlSelectRangeInputContentProcessAction.VALIDATED_URL_SELECT_RANGE_INPUT) {
      const { payload: { urlSelectRangeInput } } = action
      yield put(fromHandleChromeRuntimeOnMessageChannelProcessAction.validatedUrlSelectRangeInput(tabId, urlSelectRangeInput))
      return
    }

    yield put(action)
  }
}
