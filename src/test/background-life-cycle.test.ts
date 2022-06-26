import { all } from 'redux-saga/effects'
import { takeOnce } from '~/test/helper'
import { pipe } from '~/helper'
import * as fromAction from '~/action'
import configureStoreBackground from '~/store/background'
import configureStoreContent from '~/store/content'
import * as fromUrlDomain from '~/domain/url'
import * as fromContentReducer from '~/reducer/content'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyTabUpdateContentProcess from '~/process/content/apply-tab-update'
import * as fromUrlKeyDomain from '~/domain/url-key'
import * as fromHandleChromeRuntimeOnMessageChannelBackgroundProcess from '~/process/background/handle-chrome-runtime-on-message'
import * as fromTransferBackgroundToContentBacgroundProcess from '~/process/background/transfer-background-to-content'
import * as fromTransferContentToBackgroundContentProcess from '~/process/content/transfer-content-to-background'
import * as fromDetectUrlSelectRangeBackgroundProcess from '~/process/background/detect-url-select-range-update'
import * as fromWakeContentScriptBackgroundProcess from '~/process/background/wake-content-script'

describe('backgroundの起動する', () => {
  test('backgroundをkillしたときに、content scriptを起動する', async () => {

    const tabId = -1
    const urlStr = 'http://example.com/23/356/'
    const url = fromUrlDomain.fromString(urlStr)
    const selectStart = 19
    const urlKey = fromUrlKeyDomain.fromUrl(url)

    const storeBackground = configureStoreBackground()
    const storeContent = configureStoreContent()

    const reducerBackground = {
      url: {
        urlKeys: [ urlKey ],
        byUrlKey: {
          [urlKey]: {
            urlSelectRange: {
              selectStart,
            }
          }
        }
      },
      tab: {
        tabIds: [ tabId ],
        byTabId: {
          [tabId]: {
            appStatus: pipe(fromAppStatusDomain.newAppStatus())
                        (fromAppStatusDomain.runApp)
                        ()
          }
        }
      }
    }

    const openContentScript = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const chromeStorageLocalGet: any = jest.fn(() => reducerBackground)
    const getAllTabIds: any = jest.fn(() => [tabId])
    const chromeTabsSendMessage = jest.fn(() => { throw new Error() })
    const chromeRuntimeSendMessageFromContent = jest.fn(action => storeBackground.dispatch(action))
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId, action) => storeContent.dispatch(action))
    const getUrl = jest.fn(() => urlStr)
    const getTabUrl: any = jest.fn((_tabId: number) => urlStr)

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromAction.INITIAL, fromWakeContentScriptBackgroundProcess.createWakeContentScript(chromeTabsSendMessage, openContentScript, chromeStorageLocalGet, getAllTabIds)),
        takeOnce(fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.actions, fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.createHandleChromeRuntimeOnMessage(), tabId),
        takeOnce(fromDetectUrlSelectRangeBackgroundProcess.actions, fromDetectUrlSelectRangeBackgroundProcess.createDetectUrlSelectRangeUpdate(getTabUrl, chromeStorageLocalGet)),
        takeOnce(fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground, chromeStorageLocalGet)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromTransferContentToBackgroundContentProcess.actions, fromTransferContentToBackgroundContentProcess.createTransferContentToBackground(chromeRuntimeSendMessageFromContent)),
        takeOnce(fromApplyTabUpdateContentProcess.actions, fromApplyTabUpdateContentProcess.createApplyTabUpdate(getUrl)),
      ])
    })

    storeBackground.dispatch(fromAction.initial())

    await Promise.all([
      taskContent.toPromise(),
      taskBackground.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: urlStr,
        selectStart: 19,
      })

    expect(fromContentReducer.getContentUiPageInput(storeContent.getState()))
      .toStrictEqual({
        input: '23',
      })

  })

  test.skip('killされたあとで、clickして起動する', async () => {
  })

})
