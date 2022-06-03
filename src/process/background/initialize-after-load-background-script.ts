import { fork, put, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromReducerStorageDomain from '~/domain/reducer-storage'
import * as fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction from '~/action/process/background/initialize-after-load-background-script'

export function* watchInitializeAfterLoadBackgroundScript(saga: ReturnType<typeof createInializeAfterLoadBackgroundScript>) {
  yield fork(saga)
}

export const createInializeAfterLoadBackgroundScript = (
  chromeStorageLocalGet: typeof fromChromeModule.chromeStorageLocalGet,
  chromeStorageLocalSet: typeof fromChromeModule.chromeStorageLocalSet,
  getAllTabIds: typeof fromChromeModule.getAllTabIds,
) => {
  return function* () {
    const reducerStorage: fromReducerStorageDomain.ReducerStorage | null =
      yield call(chromeStorageLocalGet, fromReducerStorageDomain.REDUCER_STORAGE_KEY)
    if(reducerStorage == null) return
    const tabIds: number[] = yield call(getAllTabIds)
    const newReducerStoratge = fromReducerStorageDomain.extractTabIds(reducerStorage, tabIds)

    yield call(chromeStorageLocalSet, fromReducerStorageDomain.REDUCER_STORAGE_KEY, newReducerStoratge)
    yield put(fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction.loadState(newReducerStoratge))
  }
}

