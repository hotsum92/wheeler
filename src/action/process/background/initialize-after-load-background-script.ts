import * as fromReducerStorageDomain from '~/domain/reducer-storage'

export const INITIALIZED = 'INITIALIZE-AFTER-LOAD-BACKGROUND-SCRIPT.INITIALIZED'

export interface Initiallized {
  type: typeof INITIALIZED
  payload: {
    reducerStorage: fromReducerStorageDomain.ReducerStorage,
  }
}

export const initialized =
  (reducerStorage: fromReducerStorageDomain.ReducerStorage): Initiallized =>
    ({
      type: INITIALIZED,
      payload: {
        reducerStorage
      }
    })
