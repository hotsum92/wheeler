import { eventChannel, EventChannel } from 'redux-saga'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'

export type Message =
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading
  | fromChromeTabsOnUpdatedProcessAction.TabStatusComplete

export type Channel = EventChannel<Message>

export const createChannel = () => {
  return () => {
    return eventChannel(emitter => {
      const listener = (tabId: number, changeInfo: any) => {
        if(changeInfo.status === fromChromeModule.TAB_STATUS_LOADING) {
          emitter(fromChromeTabsOnUpdatedProcessAction.tabStatusLoading(tabId))
        }

        if(changeInfo.status === fromChromeModule.TAB_STATUS_COMPLETE) {
          emitter(fromChromeTabsOnUpdatedProcessAction.tabStatusComplete(tabId))
        }
      }

      fromChromeModule.chromeTabsOnUpdatedAddListener(listener)

      return () => {
        fromChromeModule.chromeTabsOnUpdatedRemoveListener(listener)
      }
    })
  }
}

