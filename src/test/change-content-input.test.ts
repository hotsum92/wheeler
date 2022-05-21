import { all } from 'redux-saga/effects'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import { takeOnce } from '~/test/helper'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromContentReducer from '~/reducer/content'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromUrlInputDomain from '~/domain/url-input'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromApplyPageContentProcess from '~/process/content/apply-page'
import * as fromUpdateUrlContentProcess from '~/process/content/update-url'
import * as fromSaveSelectRangeContentProcess from '~/process/content/save-select-range'
import * as fromSaveUrlSelectRangeBackgroundProcess from '~/process/background/save-url-select-range'

describe('ページに数値を入力すると、指定したページのウェブページに移動することができる', () => {

  test('数値を入力する', async () => {

    const url = 'http://example.com/23/'
    const input = '10'

    const store = configureStoreContent({
      ui: {
        content: {
          urlInput: fromUrlInputDomain.fromUrl(url),
          pageInput: fromPageInputDomain.fromUrl(url),
        }
      }
    })

    const assignUrlFromDomModule = jest.fn()

    const task = store.runSaga(function* () {
      yield all([
        takeOnce(fromApplyPageContentProcess.actions, fromApplyPageContentProcess.createApplyPage()),
        takeOnce(fromUpdateUrlContentProcess.actions, fromUpdateUrlContentProcess.createUpdateUrl(assignUrlFromDomModule)),
      ])
    })

    store.dispatch(fromContentUiAction.onChangePageInput(input))

    await task.toPromise()

    expect(fromContentReducer.getContentUiPageInput(store.getState()))
      .toStrictEqual({
        input,
      })

    expect(fromContentReducer.getContentUiUrlInput(store.getState()))
      .toStrictEqual({
        input: 'http://example.com/10/',
        select: '10',
        selectStart: 19,
      })

    expect(assignUrlFromDomModule)
      .toHaveBeenCalledWith(
        'http://example.com/10/',
      )

  })


})

describe('URLの選択範囲を変更することができる', () => {

  test('URLの数値部分を選択する', async () => {

    const url = 'http://example.com/23/356/'
    const selectStart = 19
    const select = '23'

    const storeContent = configureStoreContent({
      ui: {
        content: {
          urlInput: fromUrlInputDomain.fromUrl(url),
          pageInput: fromPageInputDomain.fromUrl(url),
        }
      }
    })

    const storeBackground = configureStoreBackground()

    const getUrlMock = jest.fn(() => url)
    const chromeTabsSendMessage = jest.fn((action) => storeBackground.dispatch(action))
    const sendResponse = jest.fn()

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromSaveSelectRangeContentProcess.actions, fromSaveSelectRangeContentProcess.createSaveSelectRange(getUrlMock, chromeTabsSendMessage)),
      ])
    })

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromSaveUrlSelectRangeBackgroundProcess.actions, fromSaveUrlSelectRangeBackgroundProcess.createSaveUrlSelectRange(), sendResponse)
      ])
    })

    storeContent.dispatch(fromContentUiAction.onSelectUrlInput(selectStart, select))

    await Promise.all([
      taskContent.toPromise(),
      taskBackground.toPromise(),
    ])

    expect(fromContentReducer.getContentUiUrlInput(storeContent.getState()))
      .toStrictEqual({
        input: url,
        select,
        selectStart,
      })

    expect(fromBackgroundReducer.getUrlSelectRangeByUrl(storeBackground.getState(), url))
      .toStrictEqual({
        selectStart,
        selectLength: select.length,
      })

    expect(sendResponse).toHaveBeenCalled()

  })

})

