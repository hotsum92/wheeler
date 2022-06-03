import * as fromReducerStorageDomain from '~/domain/reducer-storage'

export const LOAD_STATE = 'INITIALIZE-AFTER-LOAD-BACKGROUND-SCRIPT.LOAD_STATE'

export interface LoadState {
  type: typeof LOAD_STATE
  payload: {
    reducerStorage: fromReducerStorageDomain.ReducerStorage,
  }
}

export const loadState =
  (reducerStorage: fromReducerStorageDomain.ReducerStorage): LoadState =>
    ({
      type: LOAD_STATE,
      payload: {
        reducerStorage
      }
    })
