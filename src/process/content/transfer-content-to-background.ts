import { takeEvery, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromContentUiAction from '~/action/ui/content'

export const actions = [
  fromContentUiAction.ON_LOAD_CONTENT_UI,
  fromContentUiAction.ON_SELECT_URL_INPUT,
]

type Action =
  | fromContentUiAction.OnLoadContentUi

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
