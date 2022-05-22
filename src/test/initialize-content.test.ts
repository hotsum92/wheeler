import { all } from 'redux-saga/effects'
import { pipe, takeOnce } from '~/test/helper'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import * as fromContentReducer from '~/reducer/content'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromChromeAction from '~/action/chrome'
import * as fromInitializeContentContentProcess from '~/process/content/initialize-content'
import * as fromLoadContentScriptBackgroundProcess from '~/process/background/load-content-script'
import * as fromUrlKeyDomain from '~/domain/url-key'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromLoadUrlSelectRangeBackgroundProcess from '~/process/background/load-url-select-range'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'

describe('拡張ボタンをクリックした後、content scriptを開始する', () => {

  test('初期値からの起動', async () => {

    const tabId = -1
    const url = 'http://example.com/23/356/'

    const storeBackground = configureStoreBackground()
    const storeContent = configureStoreContent()

    const openContentScriptFromChromeModuleMock = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const getUrlFromDomModuleMock = jest.fn(() => url)
    const obj: any = {}
    const chromeTabsSendMessage = jest.fn(action => new Promise((resolve) => {
      obj.sendResponse = resolve
      storeBackground.dispatch(action)
    }))

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE, fromLoadUrlSelectRangeBackgroundProcess.createLoadUrlSelectRange(), (args?: any) => obj.sendResponse(args)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromInitializeContentContentProcess.actions, fromInitializeContentContentProcess.createInitializeContent(getUrlFromDomModuleMock, chromeTabsSendMessage)),
      ])
    })

    storeBackground.dispatch(fromChromeAction.onClickExtention(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: url,
        selectStart: 22,
        select: '356',
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

    const openContentScriptFromChromeModuleMock = jest.fn(() => storeContent.dispatch(fromContentUiAction.onLoadContentUi()))
    const getUrlFromDomModuleMock = jest.fn(() => url)
    const obj: any = {}
    const chromeTabsSendMessage = jest.fn(action => new Promise((resolve) => {
      obj.sendResponse = resolve
      storeBackground.dispatch(action)
    }))

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE, fromLoadUrlSelectRangeBackgroundProcess.createLoadUrlSelectRange(), (args?: any) => obj.sendResponse(args)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromInitializeContentContentProcess.actions, fromInitializeContentContentProcess.createInitializeContent(getUrlFromDomModuleMock, chromeTabsSendMessage)),
      ])
    })

    storeBackground.dispatch(fromChromeAction.onClickExtention(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: url,
        selectStart: 19,
        select: '23',
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
    const obj: any = {}
    const chromeTabsSendMessage = jest.fn(action => new Promise((resolve) => {
      obj.sendResponse = resolve
      storeBackground.dispatch(action)
    }))

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock)),
        takeOnce(fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE, fromLoadUrlSelectRangeBackgroundProcess.createLoadUrlSelectRange(), (args?: any) => obj.sendResponse(args)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromInitializeContentContentProcess.actions, fromInitializeContentContentProcess.createInitializeContent(getUrlFromDomModuleMock, chromeTabsSendMessage)),
      ])
    })

    storeBackground.dispatch(fromChromeAction.onUpdateWebPage(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: url,
        selectStart: 22,
        select: '356',
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

