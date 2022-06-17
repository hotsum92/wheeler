import { TakeableChannel } from 'redux-saga'
import { call, take, put } from 'redux-saga/effects'
import { Action } from '~/action'

export function* forkChannel(createChannel: () => TakeableChannel<Action>) {
  const channel: TakeableChannel<Action> = yield call(createChannel)

  while(true) {
    const action: Action = yield take(channel)
    yield put(action)
  }
}
