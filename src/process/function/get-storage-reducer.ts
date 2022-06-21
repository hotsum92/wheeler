import { call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromReducerStorageDomain from '~/domain/reducer-storage'

export const createGetStorageReducer = (
  chromeStorageLocalGet: typeof fromChromeModule.chromeStorageLocalGet,
) => {
  return function*<T>(
    selector: (state: fromReducerStorageDomain.ReducerStorage, ...args: any) => T,
    ...args: any
  ) {
    const nullableReducerStorage: fromReducerStorageDomain.ReducerStorage | null =
      yield call(chromeStorageLocalGet, fromReducerStorageDomain.REDUCER_STORAGE_KEY)
    const reducerStorage = nullableReducerStorage ?? fromReducerStorageDomain.newReducerStoratge()
    return selector(reducerStorage, ...args)
  }
}
