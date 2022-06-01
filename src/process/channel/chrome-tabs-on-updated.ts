import { eventChannel, EventChannel } from 'redux-saga'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'

export type Action =
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading
  | fromChromeTabsOnUpdatedProcessAction.TabStatusComplete

export type Channel = EventChannel<Action>

export const createChannel = () => {
  return () => {
    return eventChannel<Action>(emitter => {
      const listener = (tabId: number, changeInfo: { status?: string }) => {
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

