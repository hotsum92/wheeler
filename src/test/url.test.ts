import { pipe } from '~/helper'
import * as fromUrlDomain from '~/domain/url'
import * as fromUrlKeyDomain from '~/domain/url-key'

describe('url keyを生成する', () => {

  test('path', () => {
    expectUrlKey('http://example.com/23', 'http://example.com/23')

    expectUrlKey('http://example.com/path/23',       'http://example.com/path/23')
    expectUrlKey('http://example.com/path/23/',      'http://example.com/path/23')

    expectUrlKey('http://example.com/path/23/path',  'http://example.com/path/23/path')
    expectUrlKey('http://example.com/path/23/path/', 'http://example.com/path/23/path')
  })

  test('hash', () => {
    expectUrlKey('http://example.com/path/#23', 'http://example.com/path#23')
    expectUrlKey('http://example.com/path#23',  'http://example.com/path#23')

    expectUrlKey('http://example.com/path/45/#23', 'http://example.com/path/45#23')
    expectUrlKey('http://example.com/path/45#23',  'http://example.com/path/45#23')
  })

  test('param', () => {
    expectUrlKey('http://example.com/path/?page=23',          'http://example.com/path?page=23')
    expectUrlKey('http://example.com/path?page=23',           'http://example.com/path?page=23')
    expectUrlKey('http://example.com/path/?param=45&page=23', 'http://example.com/path?param=45&page=23')
    expectUrlKey('http://example.com/path?param=45&page=23',  'http://example.com/path?param=45&page=23')

    expectUrlKey('http://example.com/path/45?page=23',           'http://example.com/path/45?page=23')
    expectUrlKey('http://example.com/path/45/?page=23',          'http://example.com/path/45?page=23')
    expectUrlKey('http://example.com/path/45/?param=67&page=23', 'http://example.com/path/45?param=67&page=23')
    expectUrlKey('http://example.com/path/45?param=67&page=23',  'http://example.com/path/45?param=67&page=23')
  })

  test('https', () => {
    expectUrlKey('https://example.com/path/23', 'http://example.com/path/23')
  })

  test('port', () => {
    expectUrlKey('http://example.com:8080/path/23', 'http://example.com/path/23')
  })
})

const expectUrlKey = (url: string, be: string) => {
  expect(
    pipe(url)
      (fromUrlDomain.fromString)
      (fromUrlKeyDomain.fromUrl)
      ()
  ).toStrictEqual(be)
}

describe('urlがkeyにマッチする', () => {
  test('path', () => {
    expectMatchUrlWithUrlKey('http://example.com/A/43', 'http://example.com/A/23')
    expectMatchUrlWithUrlKey('http://example.com/A/43/', 'http://example.com/A/23')

    expectMatchUrlWithUrlKey('http://example.com/A/43/path', 'http://example.com/A/23/path')
    expectMatchUrlWithUrlKey('http://example.com/A/43/path/', 'http://example.com/A/23/path')

    expectMatchUrlWithUrlKey('http://example.com/A/43/path/54', 'http://example.com/A/23/path/54')
  })

  test('hash', () => {
    expectMatchUrlWithUrlKey('http://example.com/A#43', 'http://example.com/A#23')
    expectMatchUrlWithUrlKey('http://example.com/A/#43', 'http://example.com/A#23')
  })

  test('param', () => {
    expectMatchUrlWithUrlKey('http://example.com/A?page=43', 'http://example.com/A?page=23')
    expectMatchUrlWithUrlKey('http://example.com/A/?page=43', 'http://example.com/A?page=23')

    expectMatchUrlWithUrlKey('http://example.com/A/?page=43&param=56', 'http://example.com/A?page=23&param=73')
  })

  test('https', () => {
    expectMatchUrlWithUrlKey('https://example.com/A/12', 'http://example.com/A/34')
  })

  test('port', () => {
    expectMatchUrlWithUrlKey('http://example.com:8080/A/12', 'http://example.com/A/34')
  })
})

const expectMatchUrlWithUrlKey = (url: string, be: string) => {
  expect(
    [ be ].find(fromUrlKeyDomain.filterByUrl(fromUrlDomain.fromString(url)))
  ).toBe(be)
}

describe('pageを入力する', () => {
  test('pathがpage', () => {
    const url = fromUrlDomain.fromString('http://example.com/A/43')

    expect(fromUrlDomain.assignPage(url, 21, 54)).toBe('http://example.com/A/54')
    expect(fromUrlDomain.assignPage(url, 22, 54)).toBe('http://example.com/A/54')
  })
})

