import { takeEvery, call, put } from 'redux-saga/effects'
import * as fromSaveSelectRangeBackgroundProcess from '~/action/process/background/save-url-select-range'
import * as fromHandleChromeRuntimeOnMessageChannelProcessAction from '~/action/process/background/handle-chrome-runtime-on-message-channel'
import * as fromChromeModule from '~/module/chrome'

export const actions = [
  fromHandleChromeRuntimeOnMessageChannelProcessAction.ON_SELECT_URL_INPUT,
]

export function* watchSaveUrlSelectRange(
  saga: ReturnType<typeof createSaveUrlSelectRange>,
) {
  yield takeEvery(
    actions,
    saga,
  )
}

export const createSaveUrlSelectRange = (
  getTabUrl: typeof fromChromeModule.getTabUrl,
) => {
  return function* (
    action: fromHandleChromeRuntimeOnMessageChannelProcessAction.OnSelectUrlInput,
  ) {
    const { payload: { tabId, selectStart } } = action
    const url: string = yield call(getTabUrl, tabId)
    yield put(fromSaveSelectRangeBackgroundProcess.saveUrlSelectRange(url, selectStart))
  }
}

