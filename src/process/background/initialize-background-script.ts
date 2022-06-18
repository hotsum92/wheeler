import { fork, put, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromReducerStorageDomain from '~/domain/reducer-storage'
import * as fromInitializeBackgroundScriptBackgroundProcessAction from '~/action/process/background/initialize-background-script'

export function* watchInitializeBackgroundScript(saga: ReturnType<typeof createInializeBackgroundScript>) {
  yield fork(saga)
}

export const createInializeBackgroundScript = (
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
    yield put(fromInitializeBackgroundScriptBackgroundProcessAction.loadState(newReducerStoratge))
  }
}

