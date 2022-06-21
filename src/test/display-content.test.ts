import { all } from 'redux-saga/effects'
import { pipe } from '~/helper'
import { takeOnce } from '~/test/helper'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import * as fromAction from '~/action'
import * as fromContentStatusDomain from '~/domain/content-status'
import * as fromLoadContentScriptBackgroundProcess from '~/process/background/load-content-script'
import * as fromContentReducer from '~/reducer/content'
import * as fromHideExtentionBackgroundProcess from '~/process/content/hide-extention'
import * as fromDisplayExtentionContentProcess from '~/process/content/display-extention'
import * as fromHandleChromeActionOnClickedChannelProcessProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromTransferBackgroundToContentBacgroundProcess from '~/process/background/transfer-background-to-content'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromReducerStorageDomain from '~/domain/reducer-storage'
import * as fromBackgroundReducer from '~/reducer/background'

describe('拡張を表示、非表示する', () => {

  test('表示から非表示にする', async () => {

    const tabId = -1

    const storeBackground = configureStoreBackground()
    const storeContent = configureStoreContent()

    const openContentScriptFromChromeModuleMock = jest.fn()
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId, action) => storeContent.dispatch(action))
    const hideDivElement = jest.fn()
    const chromeStorageLocalGet: any =
      jest.fn(() =>
        pipe(fromBackgroundReducer.reducer(undefined, fromAction.initial()))
          (state => fromBackgroundReducer.reducer(state, fromLoadContentScriptBackgroundProcessAction.runApp(tabId)))
          (fromReducerStorageDomain.toState)
          ()
       )

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock, chromeStorageLocalGet)),
        takeOnce(fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground, chromeStorageLocalGet)),
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

  test('非表示から表示にする', async () => {

    const tabId = -1

    const storeBackground = configureStoreBackground()

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
    const chromeStorageLocalGet: any =
      jest.fn(() =>
        pipe(fromBackgroundReducer.reducer(undefined, fromAction.initial()))
          (state => fromBackgroundReducer.reducer(state, fromLoadContentScriptBackgroundProcessAction.runApp(tabId)))
          (fromReducerStorageDomain.toState)
          ()
       )

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock, chromeStorageLocalGet)),
        takeOnce(fromTransferBackgroundToContentBacgroundProcess.actions, fromTransferBackgroundToContentBacgroundProcess.createTransferBackgroundToContent(chromeTabsSendMessageFromBackground, chromeStorageLocalGet)),
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

    expect(displayDivElement).toHaveBeenCalled()

    expect(
      pipe(storeContent.getState())
        (fromContentReducer.getContentUiContentStatus)
        (fromContentStatusDomain.isDisplay)
        ()
    ).toBe(true)
  })

  test.skip('非表示のときの起動したときに、非表示', async () => {
  })

})
