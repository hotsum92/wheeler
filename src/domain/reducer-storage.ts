import * as fromBackgroundReducer from '~/reducer/background'

export type ReducerStorage = fromBackgroundReducer.State

export const REDUCER_STORAGE_KEY = 'REDUCER_STORAGE_KEY'

export const fromState = (state: fromBackgroundReducer.State): ReducerStorage => {
  return state
}
