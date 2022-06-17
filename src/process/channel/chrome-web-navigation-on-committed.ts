import { eventChannel, EventChannel } from 'redux-saga'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeWebNavigationOnCommittedChannelProcessAction from '~/action/process/channel/chrome-web-navigation-on-committed'

export type Action =
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeLink
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeReload
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TrasitionAutoBookmark
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTyped

  // TODO: rename

export type Channel = EventChannel<Action>

export const createChannel = () => {
  return () => {
    return eventChannel<Action>(emitter => {
      const listener = (details: { tabId: number, transitionType?: string }) => {
        if(details.transitionType === fromChromeModule.TRANSITION_TYPE_LINK) {
          emitter(fromChromeWebNavigationOnCommittedChannelProcessAction.transitionTypeLink(details.tabId))
        }

        if(details.transitionType === fromChromeModule.TRANSITION_TYPE_RELOAD) {
          emitter(fromChromeWebNavigationOnCommittedChannelProcessAction.transitionTypeReload(details.tabId))
        }

        if(details.transitionType === fromChromeModule.TRANSITION_AUTO_BOOKMARK) {
          emitter(fromChromeWebNavigationOnCommittedChannelProcessAction.transitionAutoBookmark(details.tabId))
        }

        if(details.transitionType === fromChromeModule.TRANSITION_TYPED) {
          emitter(fromChromeWebNavigationOnCommittedChannelProcessAction.transitionTyped(details.tabId))
        }
      }

      fromChromeModule.chromeWebNavigationOnCommittedAddListener(listener)

      return () => {
        fromChromeModule.chromeWebNavigationOnCommittedRemoveListener(listener)
      }
    })
  }
}

