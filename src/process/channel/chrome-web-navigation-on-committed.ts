import { eventChannel, EventChannel } from 'redux-saga'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeWebNavigationOnCommittedChannelProcessAction from '~/action/process/channel/chrome-web-navigation-on-committed'

export type Message =
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeLink
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeReload

export type Channel = EventChannel<Message>


export const createChannel = () => {
  return () => {
    return eventChannel(emitter => {
      const listener = (details: { tabId: number, transitionType?: string }) => {
        if(details.transitionType === fromChromeModule.TRANSITION_TYPE_LINK) {
          emitter(fromChromeWebNavigationOnCommittedChannelProcessAction.transitionTypeLink(details.tabId))
        }

        if(details.transitionType === fromChromeModule.TRANSITION_TYPE_RELOAD) {
          emitter(fromChromeWebNavigationOnCommittedChannelProcessAction.transitionTypeReload(details.tabId))
        }
      }

      fromChromeModule.chromeWebNavigationOnCommittedAddListener(listener)

      return () => {
        fromChromeModule.chromeWebNavigationOnCommittedRemoveListener(listener)
      }
    })
  }
}

