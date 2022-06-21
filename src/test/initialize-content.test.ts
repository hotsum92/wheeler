/*
import { all } from 'redux-saga/effects'
import { pipe } from '~/helper'
import { takeOnce, takeSome } from '~/test/helper'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import { Action } from '~/action'
import * as fromContentReducer from '~/reducer/content'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromChromeWebNavigationOnCommittedProcessChannelAction from '~/action/process/channel/chrome-web-navigation-on-committed'
import * as fromChromeTabsOnUpdatedProcessChannelAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromLoadContentScriptBackgroundProcess from '~/process/background/load-content-script'
import * as fromUrlKeyDomain from '~/domain/url-key'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromTransferBackgroundToContentBacgroundProcess from '~/process/background/transfer-background-to-content'
import * as fromApplyTabUpdateContentProcess from '~/process/content/apply-tab-update'
import * as fromDetectUrlSelectRangeBackgroundProcess from '~/process/background/detect-url-select-range-update'
import * as fromDetectUrlSelectRangeBackgroundProcessAction from '~/action/process/background/detect-url-select-range-update'
import * as fromTransferContentToBackgroundContentProcess from '~/process/content/transfer-content-to-background'
import * as fromHandleChromeRuntimeOnMessageChannelBackgroundProcess from '~/process/background/handle-chrome-runtime-on-message'

describe('拡張ボタンをクリックした後、content scriptを開始する', () => {

  test('初期値からの起動', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'

    const storeBackground = configureStoreBackground()
    const storeContent = configureStoreContent()

    const openContentScript = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const chromeRuntimeSendMessageFromContent = jest.fn((action: Action) => storeBackground.dispatch(action))
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId: number, action: Action) => storeContent.dispatch(action))
    const getTabUrl: any = jest.fn((_tabId: number) => url)
    const getUrl = jest.fn(() => url)

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScript)),
        takeOnce(fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.actions, fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.createHandleChromeRuntimeOnMessage(), tabId),
        takeOnce(fromDetectUrlSelectRangeBackgroundProcess.actions, fromDetectUrlSelectRangeBackgroundProcess.createDetectUrlSelectRangeUpdate(getTabUrl)),
        takeSome(2, fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground))
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromTransferContentToBackgroundContentProcess.actions, fromTransferContentToBackgroundContentProcess.createTransferContentToBackground(chromeRuntimeSendMessageFromContent)),
        takeOnce(fromApplyTabUpdateContentProcess.actions, fromApplyTabUpdateContentProcess.createApplyTabUpdate(getUrl)),
      ])
    })

    storeBackground.dispatch(fromChromeActionOnClickedChannelProcessAction.onClickExtention(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: url,
        selectStart: 22,
      })

    expect(fromContentReducer.getContentUiPageInput(storeContent.getState()))
      .toStrictEqual({
        input: '356',
      })

    expect(fromBackgroundReducer.getAppStatusByTabId(storeBackground.getState(), tabId))
      .toStrictEqual({
        status: fromAppStatusDomain.RUN,
      })

  })

  test('すでに訪れたことのあるURLから起動', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'
    const selectStart = 19
    const selectLength = 2
    const urlKey = fromUrlKeyDomain.fromSelectStart(url, selectStart)

    const storeBackground = configureStoreBackground({
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
      }
    })

    const storeContent = configureStoreContent()

    const openContentScript = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const getTabUrl: any = jest.fn((_tabId: number) => url)
    const chromeRuntimeSendMessageFromContent = jest.fn((action: Action) => storeBackground.dispatch(action))
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId: number, action: Action) => storeContent.dispatch(action))
    const getUrl = jest.fn(() => url)

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScript)),
        takeOnce(fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.actions, fromHandleChromeRuntimeOnMessageChannelBackgroundProcess.createHandleChromeRuntimeOnMessage(), tabId),
        takeOnce(fromDetectUrlSelectRangeBackgroundProcess.actions, fromDetectUrlSelectRangeBackgroundProcess.createDetectUrlSelectRangeUpdate(getTabUrl)),
        takeSome(2, fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground))
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromTransferContentToBackgroundContentProcess.actions, fromTransferContentToBackgroundContentProcess.createTransferContentToBackground(chromeRuntimeSendMessageFromContent)),
        takeOnce(fromApplyTabUpdateContentProcess.actions, fromApplyTabUpdateContentProcess.createApplyTabUpdate(getUrl)),
      ])
    })

    storeBackground.dispatch(fromChromeActionOnClickedChannelProcessAction.onClickExtention(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
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

})

describe('ページを更新した後、content scriptを開始する', () => {

  test('初期値からの起動', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'

    const storeBackground = configureStoreBackground({
      tab: {
        byTabId: {
          [tabId]: {
            appStatus: pipe(fromAppStatusDomain.newAppStatus())
                        (fromAppStatusDomain.runApp)
                        ()
          }
        }
      }
    })

    const storeContent = configureStoreContent()

    const openContentScriptFromBackground = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const chromeRuntimeSendMessageFromContent = jest.fn((action: Action) => storeBackground.dispatch(action))
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId: number, action: Action) => storeContent.dispatch(action))
    const getTabUrl: any = jest.fn((_tabId: number) => url)
    const getUrl = jest.fn(() => url)

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromBackground)),
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

    storeBackground.dispatch(fromChromeWebNavigationOnCommittedProcessChannelAction.transitionTypeReload(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: url,
        selectStart: 22,
      })

    expect(fromContentReducer.getContentUiPageInput(storeContent.getState()))
      .toStrictEqual({
        input: '356',
      })

    expect(fromBackgroundReducer.getAppStatusByTabId(storeBackground.getState(), tabId))
      .toStrictEqual({
        status: fromAppStatusDomain.RUN,
      })

  })

  test('URLのみの変更の場合は、inputを変更する', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'
    const selectStart = 19
    const selectLength = 2
    const urlKey = fromUrlKeyDomain.fromSelectStart(url, selectStart)

    const storeBackground = configureStoreBackground({
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
        tabIds: [ tabId ],
        byTabId: {
          [tabId]: {
            appStatus: pipe(fromAppStatusDomain.newAppStatus())
                        (fromAppStatusDomain.runApp)
                        ()
          }
        }
      },
    })

    const storeContent = configureStoreContent()

    const sendResponse = jest.fn()
    const getUrl = jest.fn(() => url)
    const getTabUrl: any = jest.fn((_tabId: number) => url)
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId, action) => storeContent.dispatch(action))

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromDetectUrlSelectRangeBackgroundProcess.actions, fromDetectUrlSelectRangeBackgroundProcess.createDetectUrlSelectRangeUpdate(getTabUrl)),
        takeOnce(fromDetectUrlSelectRangeBackgroundProcessAction.DETECTED_URL_SELECT_RANGE_UPDATE, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromApplyTabUpdateContentProcess.actions, fromApplyTabUpdateContentProcess.createApplyTabUpdate(getUrl), sendResponse),
      ])
    })

    storeBackground.dispatch(fromChromeTabsOnUpdatedProcessChannelAction.tabStatusLoading(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
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

  test('URLアドレスを直接変更した後に、起動する', async () => {
    const tabId = -1
    const url = 'http://example.com/23/356/'

    const storeBackground = configureStoreBackground({
      tab: {
        byTabId: {
          [tabId]: {
            appStatus: pipe(fromAppStatusDomain.newAppStatus())
                        (fromAppStatusDomain.runApp)
                        ()
          }
        }
      }
    })

    const storeContent = configureStoreContent()

    const openContentScriptFromBackground = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const chromeRuntimeSendMessageFromContent = jest.fn((action: Action) => storeBackground.dispatch(action))
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId: number, action: Action) => storeContent.dispatch(action))
    const getTabUrl: any = jest.fn((_tabId: number) => url)
    const getUrl = jest.fn(() => url)

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromBackground)),
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

    storeBackground.dispatch(fromChromeWebNavigationOnCommittedProcessChannelAction.transitionTyped(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: url,
        selectStart: 22,
      })

    expect(fromContentReducer.getContentUiPageInput(storeContent.getState()))
      .toStrictEqual({
        input: '356',
      })

    expect(fromBackgroundReducer.getAppStatusByTabId(storeBackground.getState(), tabId))
      .toStrictEqual({
        status: fromAppStatusDomain.RUN,
      })

  })


})

*/
