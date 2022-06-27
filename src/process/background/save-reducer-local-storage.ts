import { takeEvery, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromReducerStorage from '~/domain/reducer-storage'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromSaveUrlSelectRangeBackgroundProcessAction from '~/action/process/background/save-url-select-range'
import * as fromHandleChromeRuntimeOnMessageChannelProcessAction from '~/action/process/background/handle-chrome-runtime-on-message-channel'
import * as fromReducerStorageDomain from '~/domain/reducer-storage'

export const actions = [
  fromLoadContentScriptBackgroundProcessAction.RUN_APP,
  fromLoadContentScriptBackgroundProcessAction.STOP_APP,
  fromSaveUrlSelectRangeBackgroundProcessAction.SAVE_URL_SELECT_RANGE,
  fromHandleChromeRuntimeOnMessageChannelProcessAction.DISPLAYED_DIV_ELEMNET,
  fromHandleChromeRuntimeOnMessageChannelProcessAction.HID_DIV_ELEMENT,
]

type Action =
  | fromLoadContentScriptBackgroundProcessAction.RunApp
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
  chromeStorageLocalGet: typeof fromChromeModule.chromeStorageLocalGet,
  getAllTabIds: typeof fromChromeModule.getAllTabIds,
) => {
  return function* (action: Action) {
    const nullableReducerStorage: fromReducerStorageDomain.ReducerStorage | null =
      yield call(chromeStorageLocalGet, fromReducerStorageDomain.REDUCER_STORAGE_KEY)
    const reducerStorage = nullableReducerStorage ?? fromReducerStorageDomain.newReducerStoratge()
    const tabIds: number[] = yield call(getAllTabIds)
    let extractedReducerStoratge = fromReducerStorageDomain.extractTabIds(reducerStorage, tabIds)
    extractedReducerStoratge = fromReducerStorageDomain.extractLatestUrl(extractedReducerStoratge)
    const state = fromReducerStorageDomain.toState(extractedReducerStoratge)
    const newState = fromBackgroundReducer.reducer(state, action)
    const newReducerStoratge = fromReducerStorageDomain.fromState(newState)
    yield call(chromeStorageLocalSet, fromReducerStorage.REDUCER_STORAGE_KEY, newReducerStoratge)
  }
}
