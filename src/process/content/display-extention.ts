import { takeLatest, call, put } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromChromeModule from '~/module/chrome'

export const actions = [
  fromDisplayExtentionContentProcessAction.REQUEST_DISPLAY_EXTENTION,
]

export function* watchDisplayExtention(
  saga: ReturnType<typeof createDisplayExtention>,
) {
  yield takeLatest(
    actions,
    saga,
  )
}

export const createDisplayExtention = (
  displayDivElement: typeof fromDomModule.displayDivElement,
  getUrlFromDomModule: typeof fromDomModule.getUrl,
  chromeRuntimeSendMessage: typeof fromChromeModule.chromeRuntimeSendMessage,
) => {
  return function* (
    _action: fromDisplayExtentionContentProcessAction.RequestDisplayExtention,
  ) {
    const url: string = yield call(getUrlFromDomModule)

    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
      = yield call(chromeRuntimeSendMessage, fromLoadUrlSelectRangeBackgroundProcessAction.requestLoadUrlSelectRange(url))

    yield put(fromDisplayExtentionContentProcessAction.loadUrlSelectRangeSuccess(url, urlSelectRange))
    yield call(displayDivElement)
  }
}

