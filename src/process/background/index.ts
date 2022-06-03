import { all, fork } from 'redux-saga/effects'
import { forkChannel } from '~/process'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeActionOnClickedChannelProcess from '~/process/channel/chrome-action-on-clicked'
import * as fromChromeWebNavigationOnCommittedChannelProcess from '~/process/channel/chrome-web-navigation-on-committed'
import * as fromChromeTabsOnUpdatedChannelProcess from '~/process/channel/chrome-tabs-on-updated'
import * as fromChromeWindowsOnCreated from '~/process/channel/chrome-windows-on-created'
import { watchInitializeAfterLoadBackgroundScript, createInializeAfterLoadBackgroundScript} from '~/process/background/initialize-after-load-background-script'
import { watchLoadContentScript, createLoadContentScript } from '~/process/background/load-content-script'
import { watchLoadUrlSelectRange, createLoadUrlSelectRange } from '~/process/background/load-url-select-range'
import { watchSaveUrlSelectRange, createSaveUrlSelectRange } from '~/process/background/save-url-select-range'
import { watchTransferBackgroundToContent, createTransferBackgroundToContent } from '~/process/background/transfer-background-to-content'

export default function* ({
  openContentScript = fromChromeModule.openContentScript,
  chromeTabsSendMessage = fromChromeModule.chromeTabsSendMessage,
} = {}) {
  yield all([
    forkChannel(fromChromeActionOnClickedChannelProcess.createChannel()),
    forkChannel(fromChromeWebNavigationOnCommittedChannelProcess.createChannel()),
    forkChannel(fromChromeTabsOnUpdatedChannelProcess.createChannel()),
    forkChannel(fromChromeWindowsOnCreated.createChannel()),
    fork(watchInitializeAfterLoadBackgroundScript, createInializeAfterLoadBackgroundScript()),
    fork(watchLoadContentScript, createLoadContentScript(openContentScript, chromeTabsSendMessage)),
    fork(watchLoadUrlSelectRange, createLoadUrlSelectRange()),
    fork(watchSaveUrlSelectRange, createSaveUrlSelectRange()),
    fork(watchTransferBackgroundToContent, createTransferBackgroundToContent(chromeTabsSendMessage)),
  ])
}

