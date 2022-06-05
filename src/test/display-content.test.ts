import { all } from 'redux-saga/effects'
import { pipe, takeOnce } from '~/test/helper'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import * as fromContentStatusDomain from '~/domain/content-status'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromLoadContentScriptBackgroundProcess from '~/process/background/load-content-script'
import * as fromContentReducer from '~/reducer/content'
import * as fromHideExtentionBackgroundProcess from '~/process/content/hide-extention'
import * as fromDisplayExtentionContentProcess from '~/process/content/display-extention'
import * as fromHandleChromeActionOnClickedChannelProcessProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromTransferBackgroundToContentBacgroundProcess from '~/process/background/transfer-background-to-content'
import * as fromBackgroundReducer from '~/reducer/background'

describe('拡張を表示、非表示する', () => {

  test('表示から非表示にする', async () => {

    const tabId = -1

    const storeBackground = configureStoreBackground({
      tab: {
        tabIds: [ tabId ],
        byTabId: {
          [tabId]: {
            appStatus: pipe(fromAppStatusDomain.newAppStatus())
                          (fromAppStatusDomain.runApp)
                          (),
          },
        },
      }
    })

    const storeContent = configureStoreContent()

    const openContentScriptFromChromeModuleMock = jest.fn()
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId, action) => storeContent.dispatch(action))
    const hideDivElement = jest.fn()

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromHideExtentionBackgroundProcess.actions, fromHideExtentionBackgroundProcess.createHideExtention(hideDivElement))
      ])
    })

    storeBackground.dispatch(fromHandleChromeActionOnClickedChannelProcessProcessAction.onClickExtention(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(hideDivElement).toHaveBeenCalled()

    expect(
      pipe(storeContent.getState())
        (fromContentReducer.getContentUiContentStatus)
        (fromContentStatusDomain.isHidden)
        ()
    ).toBe(true)

  })

  test.only('非表示から表示にする', async () => {

    const tabId = -1

    const storeBackground = configureStoreBackground({
      tab: {
        tabIds: [ tabId ],
        byTabId: {
          [tabId]: {
            appStatus: pipe(fromAppStatusDomain.newAppStatus())
                          (fromAppStatusDomain.runApp)
                          (),
          }
        }
      },
    })

    const storeContent = configureStoreContent({
      ui: {
        content: {
          status: pipe(fromContentStatusDomain.newContentStatus())
            (fromContentStatusDomain.hideContent)
            ()
        }
      }
    })

    const openContentScriptFromChromeModuleMock = jest.fn()
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId, action) => storeContent.dispatch(action))
    const displayDivElement = jest.fn()

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromDisplayExtentionContentProcess.actions, fromDisplayExtentionContentProcess.createDisplayExtention(displayDivElement))
      ])
    })

    storeBackground.dispatch(fromHandleChromeActionOnClickedChannelProcessProcessAction.onClickExtention(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromBackgroundReducer.getAppStatusByTabId(storeBackground.getState(), tabId))
      .toStrictEqual({
        status: fromAppStatusDomain.RUN
      })

    expect(displayDivElement).toHaveBeenCalled()

    expect(
      pipe(storeContent.getState())
        (fromContentReducer.getContentUiContentStatus)
        (fromContentStatusDomain.isDisplay)
        ()
    ).toBe(true)
  })

})
