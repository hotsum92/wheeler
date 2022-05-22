import { all, fork } from 'redux-saga/effects'
import { watchApplyPage, createApplyPage } from '~/process/content/apply-page'
import { watchInitializeContent, createInitializeContent } from '~/process/content/initialize-content'
import { watchUpdateUrl, createUpdateUrl } from '~/process/content/update-url'
import { watchSaveSelectRange, createSaveSelectRange } from '~/process/content/save-select-range'
import { watchHideExtention, createHideExtention } from '~/process/content/hide-extention'
import { watchDisplayExtention, createDisplayExtention } from '~/process/content/display-extention'
import * as fromDomModule from '~/module/dom'
import * as fromChromeModule from '~/module/chrome'

export default function* ({
  getUrlFromDomModule = fromDomModule.getUrl,
  assignUrlFromDomModule = fromDomModule.assignUrl,
  chromeRuntimeSendMessageFromChromeModule = fromChromeModule.chromeRuntimeSendMessage,
  hideDivElement = fromDomModule.hideDivElement,
} = {}) {
  yield all([
    fork(watchInitializeContent, createInitializeContent(getUrlFromDomModule, chromeRuntimeSendMessageFromChromeModule)),
    fork(watchApplyPage, createApplyPage()),
    fork(watchUpdateUrl, createUpdateUrl(assignUrlFromDomModule)),
    fork(watchSaveSelectRange, createSaveSelectRange(getUrlFromDomModule, chromeRuntimeSendMessageFromChromeModule)),
    fork(watchHideExtention, createHideExtention(hideDivElement)),
    fork(watchDisplayExtention, createDisplayExtention()),
  ])
}
