import { takeLeading, call } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromUpdateUrlContentProcessAction from '~/action/process/content/update-url'

export const actions = [
  fromUpdateUrlContentProcessAction.UPDATE_URL,
]

export function* watchUpdateUrl(saga: ReturnType<typeof createUpdateUrl>) {
  yield takeLeading(
    actions,
    saga,
  )
}

export const createUpdateUrl = (
  assignUrl: typeof fromDomModule.assignUrl,
) => {
  return function* (action: fromUpdateUrlContentProcessAction.UpdateUrl) {
    yield call(assignUrl, action.payload.url)
  }
}
