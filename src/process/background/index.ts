import { all, fork } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import { watchHandleChromeTabsOnUpdated } from '~/process/background/handle-chrome-tabs-on-updated'
import { watchHandleChromeActionOnClicked } from '~/process/background/handle-chrome-action-on-clicked'
import { watchLoadContentScript, createLoadContentScript } from '~/process/background/load-content-script'
import { watchLoadUrlSelectRange, createLoadUrlSelectRange } from '~/process/background/load-url-select-range'
import { watchSaveUrlSelectRange, createSaveUrlSelectRange } from '~/process/background/save-url-select-range'

export default function* ({
  openContentScript = fromChromeModule.openContentScript,
} = {}) {
  yield all([
    fork(watchHandleChromeTabsOnUpdated),
    fork(watchHandleChromeActionOnClicked),
    fork(watchLoadContentScript, createLoadContentScript(openContentScript)),
    fork(watchLoadUrlSelectRange, createLoadUrlSelectRange()),
    fork(watchSaveUrlSelectRange, createSaveUrlSelectRange()),
  ])
}

