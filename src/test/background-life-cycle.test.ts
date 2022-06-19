import { all } from 'redux-saga/effects'
import { takeOnce } from '~/test/helper'
import { pipe } from '~/helper'
import * as fromAction from '~/action'
import configureStoreBackground from '~/store/background'
import configureStoreContent from '~/store/content'
import * as fromContentReducer from '~/reducer/content'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyTabUpdateContentProcess from '~/process/content/apply-tab-update'
import * as fromUrlKeyDomain from '~/domain/url-key'
import * as fromHandleChromeRuntimeOnMessageChannelBackgroundProcess from '~/process/background/handle-chrome-runtime-on-message'
import * as fromTransferBackgroundToContentBacgroundProcess from '~/process/background/transfer-background-to-content'
import * as fromTransferContentToBackgroundContentProcess from '~/process/content/transfer-content-to-background'
import * as fromDetectUrlSelectRangeBackgroundProcess from '~/process/background/detect-url-select-range-update'
import * as fromInitializeBackgroundScriptBackgroundProcess from '~/process/background/initialize-background-script'
import * as fromWakeContentScriptBackgroundProcess from '~/process/background/wake-content-script'

describe('backgroundの起動する', () => {
  test('backgroundをkillしたときに、content scriptを起動する', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'
    const selectStart = 19
    const selectLength = 2
    const urlKey = fromUrlKeyDomain.fromSelectStart(url, selectStart)

    const storeBackground = configureStoreBackground()
    const storeContent = configureStoreContent()

    const reducerBackground = {
      url: {
        urlKeys: [ urlKey ],
        byUrlKey: {
          [urlKey]: {
            urlSelectRange: {
              selectStart,
              selectLength,
            }
          }
        }
      },
      tab: {
        tabIds: [tabId],
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
    const chromeStorageLocalSet = jest.fn()
    const getAllTabIds: any = jest.fn(() => [tabId])
    const chromeTabsSendMessage = jest.fn(() => { throw new Error() })
    const chromeRuntimeSendMessageFromContent = jest.fn(action => storeBackground.dispatch(action))
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId, action) => storeContent.dispatch(action))
    const getUrl = jest.fn(() => url)
    const getTabUrl: any = jest.fn((_tabId: number) => url)

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromAction.INITIAL, fromInitializeBackgroundScriptBackgroundProcess.createInializeBackgroundScript(chromeStorageLocalGet, chromeStorageLocalSet, getAllTabIds)),
        takeOnce(fromWakeContentScriptBackgroundProcess.actions, fromWakeContentScriptBackgroundProcess.createWakeContentScript(chromeTabsSendMessage, openContentScript)),
        takeOnce(fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.actions, fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.createHandleChromeRuntimeOnMessage(), tabId),
        takeOnce(fromDetectUrlSelectRangeBackgroundProcess.actions, fromDetectUrlSelectRangeBackgroundProcess.createDetectUrlSelectRangeUpdate(getTabUrl)),
        takeOnce(fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground))
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
        input: url,
        selectStart: 19,
      })

    expect(fromContentReducer.getContentUiPageInput(storeContent.getState()))
      .toStrictEqual({
        input: '23',
      })

    expect(fromBackgroundReducer.getAppStatusByTabId(storeBackground.getState(), tabId))
      .toStrictEqual({
        status: fromAppStatusDomain.RUN,
      })

  })

  test.skip('killされたあとで、clickして起動する', async () => {
  })

})
