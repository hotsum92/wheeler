import { all } from 'redux-saga/effects'
import { pipe, takeOnce } from '~/test/helper'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import * as fromContentReducer from '~/reducer/content'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromChromeWebNavigationOnCommittedProcessChannelAction from '~/action/process/channel/chrome-web-navigation-on-committed'
import * as fromChromeTabsOnUpdatedProcessChannelAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromInitializeContentContentProcess from '~/process/content/initialize-content'
import * as fromLoadContentScriptBackgroundProcess from '~/process/background/load-content-script'
import * as fromUrlKeyDomain from '~/domain/url-key'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromLoadUrlSelectRangeBackgroundProcess from '~/process/background/load-url-select-range'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromTransferBackgroundToContentBacgroundProcess from '~/process/background/transfer-background-to-content'
import * as fromApplyTabUpdateContentProcess from '~/process/content/apply-tab-update'
import * as fromDetectUrlSelectRangeBackgroundProcess from '~/process/background/detect-url-select-range-update'
import * as fromDetectUrlSelectRangeBackgroundProcessAction from '~/action/process/background/detect-url-select-range-update'

describe('拡張ボタンをクリックした後、content scriptを開始する', () => {

  test.skip('初期値からの起動', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'

    const storeBackground = configureStoreBackground()
    const storeContent = configureStoreContent()

    const openContentScriptFromChromeModuleMock = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const getUrlFromDomModuleMock = jest.fn(() => url)
    let sendResponse: any = null
    const chromeTabsSendMessageFromContent = jest.fn(action => new Promise((resolve) => {
      sendResponse = resolve
      storeBackground.dispatch(action)
    }))

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE, fromLoadUrlSelectRangeBackgroundProcess.createLoadUrlSelectRange(), (args?: any) => sendResponse(args)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromInitializeContentContentProcess.actions, fromInitializeContentContentProcess.createInitializeContent(getUrlFromDomModuleMock, chromeTabsSendMessageFromContent)),
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

  test.skip('すでに訪れたことのあるURLから起動', async () => {

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

    const openContentScriptFromChromeModuleMock = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const getUrlFromDomModuleMock = jest.fn(() => url)
    let sendResponse: any = null
    const chromeTabsSendMessageFromContent = jest.fn(action => new Promise((resolve) => {
      sendResponse = resolve
      storeBackground.dispatch(action)
    }))

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE, fromLoadUrlSelectRangeBackgroundProcess.createLoadUrlSelectRange(), (args?: any) => sendResponse(args)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromInitializeContentContentProcess.actions, fromInitializeContentContentProcess.createInitializeContent(getUrlFromDomModuleMock, chromeTabsSendMessageFromContent)),
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

  test.skip('URLアドレスを直接変更した後に、起動する', () => {
    throw new Error('未実装')
  })

  test('初期値からの起動', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'

    const storeBackground = configureStoreBackground({
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
    })

    const storeContent = configureStoreContent()

    const openContentScriptFromChromeModuleMock = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const getUrlFromDomModuleMock = jest.fn(() => url)
    let sendResponse: any = null
    const chromeTabsSendMessageFromContent = jest.fn(action => new Promise((resolve) => {
      sendResponse = resolve
      storeBackground.dispatch(action)
    }))

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE, fromLoadUrlSelectRangeBackgroundProcess.createLoadUrlSelectRange(), (args?: any) => sendResponse(args)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromInitializeContentContentProcess.actions, fromInitializeContentContentProcess.createInitializeContent(getUrlFromDomModuleMock, chromeTabsSendMessageFromContent)),
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

})

