import { eventChannel, EventChannel } from 'redux-saga'
import { chromeActionOnClickedAddListener, chromeActionOnClickedRemoveListener } from '~/module/chrome'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'

export type Action =
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention

export type Channel = EventChannel<Action>

export const createChannel = () => {
  return () => {
    return eventChannel<Action>(emitter => {
      const listener = (tab: { id?: number }) => {
        if(tab.id != null) {
          emitter(fromChromeActionOnClickedChannelProcessAction.onClickExtention(tab.id))
        }
      }

      chromeActionOnClickedAddListener(listener)

      return () => {
        chromeActionOnClickedRemoveListener(listener)
      }
    })
  }
}

