import { eventChannel, EventChannel } from 'redux-saga'
import { chromeActionOnClickedAddListener, chromeActionOnClickedRemoveListener } from '~/module/chrome'
import * as fromHandleChromeActionOnClickedChromeProcessAction from '~/action/chrome/handle-chrome-action-on-clicked'

export type Message =
  | fromHandleChromeActionOnClickedChromeProcessAction.OnClickExtention

export type Channel = EventChannel<Message>

export const createChannel = () => {
  return () => {
    return eventChannel<Message>(emitter => {
      const listener = (tab: { id?: number }) => {
        if(tab.id != null) {
          emitter(fromHandleChromeActionOnClickedChromeProcessAction.onClickExtention(tab.id))
        }
      }

      chromeActionOnClickedAddListener(listener)

      return () => {
        chromeActionOnClickedRemoveListener(listener)
      }
    })
  }
}

