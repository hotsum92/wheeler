import * as fromBackgroundReducer from '~/reducer/background'

export type ReducerStorage = fromBackgroundReducer.State

export const REDUCER_STORAGE_KEY = 'REDUCER_STORAGE_KEY'

export const fromState = (state: fromBackgroundReducer.State): ReducerStorage => {
  return state
}

export const toState = (reducerStorage: ReducerStorage): fromBackgroundReducer.State => {
  return reducerStorage
}

export const extractTabIds = (state: ReducerStorage, ids: number[]): ReducerStorage => {
  const tabIds = state.tab.tabIds.filter(id => ids.includes(id))
  const byTabId = tabIds.reduce((prev, id) => ({ ...prev, [id]: state.tab.byTabId[id] }), {})

  return {
    ...state,
    tab: {
      ...state.tab,
      tabIds,
      byTabId,
    }
  }
}

