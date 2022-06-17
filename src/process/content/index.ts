import { all, fork } from 'redux-saga/effects'
import { watchHandleChromeRuntimeOnMessage, createHandleChromeRuntimeOnMessage } from '~/process/content/handle-chrome-runtime-on-message'
import { watchApplyPageInput, createApplyPageInput } from '~/process/content/apply-page-input'
import { watchSaveSelectRange, createSaveSelectRange } from '~/process/content/save-select-range'
import { watchHideExtention, createHideExtention } from '~/process/content/hide-extention'
import { watchDisplayExtention, createDisplayExtention } from '~/process/content/display-extention'
import { watchApplyTabUpdate, createApplyTabUpdate } from '~/process/content/apply-tab-update'
import { watchApplyUrlInput, createApplyUrlInput } from '~/process/content/apply-url-input'
import { watchTransferContentToBackground, createTransferContentToBackground } from '~/process/content/transfer-content-to-background'
import { watchApplyUrlSelectRangeInput, createApplyUrlSelectRangeInput } from '~/process/content/apply-url-select-range-input'
import * as fromDomModule from '~/module/dom'
import * as fromChromeModule from '~/module/chrome'

export default function* ({
  getUrlFromDomModule = fromDomModule.getUrl,
  chromeRuntimeSendMessage = fromChromeModule.chromeRuntimeSendMessage,
  hideDivElement = fromDomModule.hideDivElement,
  displayDivElement = fromDomModule.displayDivElement,
  assignUrl = fromDomModule.assignUrl,
} = {}) {
  yield all([
    fork(watchHandleChromeRuntimeOnMessage, createHandleChromeRuntimeOnMessage()),
    fork(watchApplyPageInput, createApplyPageInput(assignUrl, getUrlFromDomModule)),
    fork(watchSaveSelectRange, createSaveSelectRange(getUrlFromDomModule, chromeRuntimeSendMessage)),
    fork(watchHideExtention, createHideExtention(hideDivElement)),
    fork(watchDisplayExtention, createDisplayExtention(displayDivElement)),
    fork(watchApplyTabUpdate, createApplyTabUpdate(getUrlFromDomModule)),
    fork(watchApplyUrlInput, createApplyUrlInput(assignUrl, getUrlFromDomModule)),
    fork(watchTransferContentToBackground, createTransferContentToBackground(chromeRuntimeSendMessage)),
    fork(watchApplyUrlSelectRangeInput, createApplyUrlSelectRangeInput()),
  ])
}
