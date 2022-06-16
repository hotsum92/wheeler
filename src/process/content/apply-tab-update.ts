import { takeLatest, call, put } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromApplyTabUpdateContentProcessAction from '~/action/process/content/apply-tab-update'
import * as fromDetectUrlSelectRangeBackgroundProcessAction from '~/action/process/background/detect-url-select-range-update'

export const actions = [
  fromDetectUrlSelectRangeBackgroundProcessAction.DETECTED_URL_SELECT_RANGE_UPDATE,
]

export function* watchApplyTabUpdate(
  saga: ReturnType<typeof createApplyTabUpdate>,
) {
  yield takeLatest(
    actions,
    saga,
  )
}

export const createApplyTabUpdate = (
  getUrl: typeof fromDomModule.getUrl,
) => {
  return function* (
    action: fromDetectUrlSelectRangeBackgroundProcessAction.DetectedUrlSelectRangeUpdate,
  ) {
    const { payload: { urlSelectRange } } = action
    const url: string = yield call(getUrl)
    yield put(fromApplyTabUpdateContentProcessAction.loadedUrlSelect(url, urlSelectRange))
  }
}

