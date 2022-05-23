import { all, fork } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import { watchHandleChromeTabsOnUpdated } from '~/process/background/handle-chrome-tabs-on-updated'
import { watchHandleChromeActionOnClicked } from '~/process/background/handle-chrome-action-on-clicked'
import { watchHandleChromeWebNavigationOnCommitted } from '~/process/background/handle-chrome-web-navigation-on-committed'
import { watchLoadContentScript, createLoadContentScript } from '~/process/background/load-content-script'
import { watchLoadUrlSelectRange, createLoadUrlSelectRange } from '~/process/background/load-url-select-range'
import { watchSaveUrlSelectRange, createSaveUrlSelectRange } from '~/process/background/save-url-select-range'

export default function* ({
  openContentScript = fromChromeModule.openContentScript,
  chromeTabsSendMessage = fromChromeModule.chromeTabsSendMessage,
} = {}) {
  yield all([
    fork(watchHandleChromeTabsOnUpdated),
    fork(watchHandleChromeActionOnClicked),
    fork(watchHandleChromeWebNavigationOnCommitted),
    fork(watchLoadContentScript, createLoadContentScript(openContentScript, chromeTabsSendMessage)),
    fork(watchLoadUrlSelectRange, createLoadUrlSelectRange()),
    fork(watchSaveUrlSelectRange, createSaveUrlSelectRange()),
  ])
}

