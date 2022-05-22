import { all } from 'redux-saga/effects'
import { pipe, takeOnce } from '~/test/helper'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromLoadContentScriptBackgroundProcess from '~/process/background/load-content-script'
import * as fromHideExtentionBackgroundProcess from '~/process/content/hide-extention'
import * as fromHideExtentionBackgroundProcessAction from '~/action/process/content/hide-extention'
import * as fromChromeAction from '~/action/chrome'
import * as fromBackgroundReducer from '~/reducer/background'

describe('拡張を非表示にする', () => {

  test('表示状態から非表示にする', async () => {

    const tabId = -1

    const storeBackground = configureStoreBackground({
      tab: {
        tabIds: [ tabId ],
        byTabId: {
          [tabId]: {
            appStatus: pipe(fromAppStatusDomain.newAppStatus())
                          (fromAppStatusDomain.runApp)
                          ()
          },
        },
      }
    })

    const storeContent = configureStoreContent()

    const openContentScriptFromChromeModuleMock = jest.fn()
    const chromeTabsSendMessageFromBackground = jest.fn((_tabId, action) => storeContent.dispatch(action))
    const hideDivElement = jest.fn()
    const sendMessage = jest.fn()

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromLoadContentScriptBackgroundProcess.actions, fromLoadContentScriptBackgroundProcess.createLoadContentScript(openContentScriptFromChromeModuleMock, chromeTabsSendMessageFromBackground)),
      ])
    })

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromHideExtentionBackgroundProcessAction.REQUEST_HIDE_EXTENTION, fromHideExtentionBackgroundProcess.createHideExtention(hideDivElement), sendMessage)
      ])
    })

    storeBackground.dispatch(fromChromeAction.onClickExtention(tabId))

    await Promise.all([
      taskBackground.toPromise(),
      taskContent.toPromise(),
    ])

    expect(fromBackgroundReducer.getAppStatusByTabId(storeBackground.getState(), tabId))
      .toStrictEqual({
        status: fromAppStatusDomain.SUSPEND
      })

    expect(hideDivElement).toHaveBeenCalled()

  })

})
