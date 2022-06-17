import { takeLatest, call } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromChromeModule from '~/module/chrome'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromSaveSelectRangeBackgroundProcessAction from '~/action/process/background/save-url-select-range'

export const actions = [
  fromContentUiAction.ON_SELECT_URL_INPUT,
]

export function* watchSaveSelectRange(saga: ReturnType<typeof createSaveSelectRange>) {
  yield takeLatest(
    actions,
    saga,
  )
}

// TODO: テストの変更で削除できる
export const createSaveSelectRange = (
  getUrlFromDomModule: typeof fromDomModule.getUrl,
  chromeRuntimeSendMessage: typeof fromChromeModule.chromeRuntimeSendMessage,
) => {
  return function* (action: fromContentUiAction.OnSelectUrlInput) {
    const { payload: { selectStart } } = action
    const url: string = yield call(getUrlFromDomModule)
    yield call(chromeRuntimeSendMessage, fromSaveSelectRangeBackgroundProcessAction.requestSaveUrlSelectRange(url, selectStart))
  }
}

