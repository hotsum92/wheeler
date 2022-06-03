import { eventChannel, EventChannel } from 'redux-saga'
import { chromeWindowsOnCreatedAddListener, chromeWindowsOnCreatedRemoveListener } from '~/module/chrome'
import * as fromChromeWindowsOnCreatedChannelProcessAction from '~/action/process/channel/chrome-windows-on-created'

export type Action =
  | fromChromeWindowsOnCreatedChannelProcessAction.OnCreatedWindow

export type Channel = EventChannel<Action>

export const createChannel = () => {
  return () => {
    return eventChannel<Action>(emitter => {
      const listener = () => {
        emitter(fromChromeWindowsOnCreatedChannelProcessAction.onCreatedWindow())
      }

      chromeWindowsOnCreatedAddListener(listener)

      return () => {
        chromeWindowsOnCreatedRemoveListener(listener)
      }
    })
  }
}

