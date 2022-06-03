import { fork, put, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromReducerStorageDomain from '~/domain/reducer-storage'
import * as fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction from '~/action/process/background/initialize-after-load-background-script'

export function* watchInitializeAfterLoadBackgroundScript(saga: ReturnType<typeof createInializeAfterLoadBackgroundScript>) {
  yield fork(saga)
}

export const createInializeAfterLoadBackgroundScript = (
  chromeStorageLocalGet: typeof fromChromeModule.chromeStorageLocalGet,
) => {
  return function* () {
    const reducerStorage: fromReducerStorageDomain.ReducerStorage =
      yield call(chromeStorageLocalGet, fromReducerStorageDomain.REDUCER_STORAGE_KEY)
    yield put(fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction.initialized(reducerStorage))
  }
}

