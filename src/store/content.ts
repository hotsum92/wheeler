import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducer from '~/reducer/content'

const logger = createLogger({
  collapsed: true,
})

export default (initialState: any = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  return {
    ...createStore(reducer, initialState,
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
    ...createStore(reducer, initialState,
      applyMiddleware(
        sagaMiddleware,
        logger,
      )
    ),
    runSaga: sagaMiddleware.run
  }
}
