import { takeEvery, call, select } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromReducerStorage from '~/domain/reducer-storage'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromSaveUrlSelectRangeBackgroundProcessAction from '~/action/process/background/save-url-select-range'

export const actions = [
  fromLoadContentScriptBackgroundProcessAction.RUN_APP,
  fromLoadContentScriptBackgroundProcessAction.HIDE_APP,
  fromLoadContentScriptBackgroundProcessAction.STOP_APP,
  fromSaveUrlSelectRangeBackgroundProcessAction.SAVE_URL_SELECT_RANGE,
]

type Action =
  | fromLoadContentScriptBackgroundProcessAction.RunApp
  | fromLoadContentScriptBackgroundProcessAction.HideApp
  | fromLoadContentScriptBackgroundProcessAction.StopApp
  | fromSaveUrlSelectRangeBackgroundProcessAction.SaveUrlSelectRange

export function* watchSaveReducerLocalStorage(
  saga: ReturnType<typeof createSaveReducerLocalStorage>,
) {
  yield takeEvery(
    actions,
    saga,
  )
}

export const createSaveReducerLocalStorage = (
  chromeStorageLocalSet: typeof fromChromeModule.chromeStorageLocalSet,
) => {
  return function* (_: Action) {
    const state: fromBackgroundReducer.State = yield select(fromBackgroundReducer.getAllState)
    const reducerStorage = fromReducerStorage.fromState(state)
    yield call(chromeStorageLocalSet, fromReducerStorage.REDUCER_STORAGE_KEY, reducerStorage)
  }
}
