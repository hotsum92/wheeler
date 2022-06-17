import { all } from 'redux-saga/effects'
import configureStoreContent from '~/store/content'
import configureStoreBackground from '~/store/background'
import { takeOnce } from '~/test/helper'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromContentReducer from '~/reducer/content'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromUrlInputDomain from '~/domain/url-input'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromApplyPageInputContentProcess from '~/process/content/apply-page-input'
import * as fromSaveSelectRangeContentProcess from '~/process/content/save-select-range'
import * as fromSaveUrlSelectRangeBackgroundProcess from '~/process/background/save-url-select-range'
import * as fromApplyUrlInputContentProcess from '~/process/content/apply-url-input'

describe('page inputを変更する', () => {

  test('ページを増やす', async () => {

    const url = 'http://example.com/23/'

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
        takeOnce(fromApplyPageInputContentProcess.actions, fromApplyPageInputContentProcess.createApplyPageInput(assignUrlFromDomModule)),
      ])
    })

    store.dispatch(fromContentUiAction.onClickForwardButton())

    await task.toPromise()

    expect(fromContentReducer.getContentUiPageInput(store.getState()))
      .toStrictEqual({
        input: '24',
      })

    expect(fromContentReducer.getContentUiUrlInput(store.getState()))
      .toStrictEqual({
        input: 'http://example.com/24/',
        selectStart: 19,
      })

    expect(assignUrlFromDomModule)
      .toHaveBeenCalledWith(
        'http://example.com/24/',
      )

  })

  test('数値を入力する', async () => {

    const url = 'http://example.com/23/'
    const input = '24'

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
        takeOnce(fromApplyPageInputContentProcess.actions, fromApplyPageInputContentProcess.createApplyPageInput(assignUrlFromDomModule)),
      ])
    })

    store.dispatch(fromContentUiAction.onChangePageInput(input))
    store.dispatch(fromContentUiAction.onFocusOutPageInput())

    await task.toPromise()

    expect(fromContentReducer.getContentUiPageInput(store.getState()))
      .toStrictEqual({
        input: '24',
      })

    expect(fromContentReducer.getContentUiUrlInput(store.getState()))
      .toStrictEqual({
        input: 'http://example.com/24/',
        selectStart: 19,
      })

    expect(assignUrlFromDomModule)
      .toHaveBeenCalledWith(
        'http://example.com/24/',
      )

  })

  test('数値以外を入力', async () => {

    const url = 'http://example.com/23/'
    const input = 'input'

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
        takeOnce(fromApplyPageInputContentProcess.actions, fromApplyPageInputContentProcess.createApplyPageInput(assignUrlFromDomModule)),
      ])
    })

    store.dispatch(fromContentUiAction.onChangePageInput(input))
    store.dispatch(fromContentUiAction.onFocusOutPageInput())

    await task.toPromise()

    expect(fromContentReducer.getContentUiPageInput(store.getState()))
      .toStrictEqual({
        input: input,
      })

    expect(fromContentReducer.getContentUiUrlInput(store.getState()))
      .toStrictEqual({
        input: 'http://example.com/23/',
        selectStart: 19,
      })

  })

  test.skip('選択範囲がpageクエリを含めた保存があれば、それを利用してページを更新', () => {
    throw new Error('未実装')
  })

})

describe('url inputを変更する', () => {

  test('urlを入力する', async () => {

    const url = 'http://example.com/23/'
    const input = 'http://new-example.com/23/456/'

    const storeContent = configureStoreContent({
      ui: {
        content: {
          urlInput: fromUrlInputDomain.fromUrl(url),
          pageInput: fromPageInputDomain.fromUrl(url),
        }
      }
    })

    const assignUrlFromDomModule = jest.fn()

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromApplyUrlInputContentProcess.actions, fromApplyUrlInputContentProcess.createApplyUrlInput(assignUrlFromDomModule)),
      ])
    })

    storeContent.dispatch(fromContentUiAction.onChangeUrlInput(input))
    storeContent.dispatch(fromContentUiAction.onFocusOutUrlInput())

    await Promise.all([
      taskContent.toPromise(),
    ])

    expect(assignUrlFromDomModule)
      .toHaveBeenCalledWith(
        'http://new-example.com/23/456/',
      )

  })

})

describe('URLの選択範囲を変更することができる', () => {

  test.skip('URLの数値部分を選択する', async () => {

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
    const getTabUrl: any = (_tabId: number) => url
    const chromeTabsSendMessage = jest.fn((action) => storeBackground.dispatch(action))
    const sendResponse = jest.fn()

    const taskContent = storeContent.runSaga(function* () {
      yield all([
        takeOnce(fromSaveSelectRangeContentProcess.actions, fromSaveSelectRangeContentProcess.createSaveSelectRange(getUrlMock, chromeTabsSendMessage)),
      ])
    })

    const taskBackground = storeBackground.runSaga(function* () {
      yield all([
        takeOnce(fromSaveUrlSelectRangeBackgroundProcess.actions, fromSaveUrlSelectRangeBackgroundProcess.createSaveUrlSelectRange(getTabUrl), sendResponse)
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
        selectStart,
      })

    expect(fromBackgroundReducer.getUrlSelectRangeByUrl(storeBackground.getState(), url))
      .toStrictEqual({
        selectStart,
      })

    expect(sendResponse).toHaveBeenCalled()

  })

  test.skip('選択後の数値繰り上げ', async () => {
    throw new Error('未実装')
  })

  test.skip('文字列選択後したときは、保存しない', async () => {
    throw new Error('未実装')
  })

})

