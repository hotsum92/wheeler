import { fork } from 'redux-saga/effects'

export function* watchInitializeAfterLoadBackgroundScript(saga: ReturnType<typeof createInializeAfterLoadBackgroundScript>) {
  yield fork(saga)
}

export const createInializeAfterLoadBackgroundScript = (
) => {
  return function* () {
  }
}

