import { take, fork } from 'redux-saga/effects'
import * as fromAction from '~/action'

export const takeOnce = function*(actions: string[] | string, saga: (...v: any) => void, ...args: any) {
  const action: fromAction.Action = yield take(actions)
  yield fork(saga, action, ...args)
}

export const takeSome = function*(limit: number, actions: string[] | string, saga: (...v: any) => void, ...args: any) {
  let counter = 0
  while(counter < limit) {
    const action: fromAction.Action = yield take(actions)
    yield fork(saga, action, ...args)
    counter += 1
  }
}

type Pipe<T> = {
  (): T;
  <U>(f: (x: T) => U): Pipe<U>
}

export const pipe: <T>(x: T) => Pipe<T> =
  <T>(x: T) => (<U>(f?: (x: T) => U) => f ? pipe(f(x)) : x) as Pipe<T>;
