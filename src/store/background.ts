import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

const logger = createLogger({
  collapsed: true,
})

export default (initialState: any = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  return {
    ...createStore(() => ({}), initialState,
      applyMiddleware(
        sagaMiddleware,
      )
    ),
    runSaga: sagaMiddleware.run
  }
}

export const configureStore = (initialState: any = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  return {
    ...createStore(() => ({}), initialState,
      applyMiddleware(
        sagaMiddleware,
        logger,
      )
    ),
    runSaga: sagaMiddleware.run
  }
}
