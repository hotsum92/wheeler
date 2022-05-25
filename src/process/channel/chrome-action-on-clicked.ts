import { eventChannel, EventChannel } from 'redux-saga'
import { chromeActionOnClickedAddListener, chromeActionOnClickedRemoveListener } from '~/module/chrome'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'

export type Message =
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention

export type Channel = EventChannel<Message>

export const createChannel = () => {
  return () => {
    return eventChannel<Message>(emitter => {
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

