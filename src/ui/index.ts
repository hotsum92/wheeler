import React from 'react'
import * as fromContentReducer from '~/reducer/content'
import * as fromAction from '~/action'

export const useReducer = (initialState?: any) => {
  const [state, dispatch] = React.useReducer(
    fromContentReducer.reducer,
    fromContentReducer.reducer(initialState, fromAction.initial())
  )

  return {
    state,
    dispatch: (action: fromAction.Action) => {
      console.log(action)
      dispatch(action)
    }
  }
}
