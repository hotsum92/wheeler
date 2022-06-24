import { pipe } from '~/helper'
import * as fromUrlDomain from '~/domain/url'
import * as fromUrlKeyDomain from '~/domain/url-key'

/*

[ ] http://example.com
[ ] http://example.com/
[ ] http://example.com/path
[ ] http://example.com/path/
[O] http://example.com/path/23
[O] http://example.com/path/23/
[X] http://example.com/path/23/path
[X] http://example.com/path/23/path/
[O] http://example.com/path/?page=45
[X] http://example.com/path/?page=45&param=67
[O] http://example.com/path/#89

 */

describe('url keyを生成する', () => {

  test('pathがpage', () => {
    expectUrlKey('http://example.com/23', 'http://example.com')

    expectUrlKey('http://example.com/path/23',       'http://example.com/path')
    expectUrlKey('http://example.com/path/23/',      'http://example.com/path')
    expectUrlKey('http://example.com/path/23/path',  'http://example.com/path')
    expectUrlKey('http://example.com/path/23/path/', 'http://example.com/path')

    expectUrlKey('http://example.com/path/23/path/45',       'http://example.com/path/23/path')
    expectUrlKey('http://example.com/path/23/path/45/',      'http://example.com/path/23/path')
    expectUrlKey('http://example.com/path/23/path/45/path',  'http://example.com/path/23/path')
    expectUrlKey('http://example.com/path/23/path/45/path/', 'http://example.com/path/23/path')
  })

  test('hashがpage', () => {
    expectUrlKey('http://example.com/path/#23', 'http://example.com/path')
    expectUrlKey('http://example.com/path#23',  'http://example.com/path')

    expectUrlKey('http://example.com/path/45/#23', 'http://example.com/path/45')
    expectUrlKey('http://example.com/path/45#23',  'http://example.com/path/45')
  })

  test('paramがpage', () => {
    expectUrlKey('http://example.com/path/?page=23',          'http://example.com/path')
    expectUrlKey('http://example.com/path?page=23',           'http://example.com/path')
    expectUrlKey('http://example.com/path/?param=45&page=23', 'http://example.com/path')
    expectUrlKey('http://example.com/path?param=45&page=23',  'http://example.com/path')

    expectUrlKey('http://example.com/path/45?page=23',           'http://example.com/path/45')
    expectUrlKey('http://example.com/path/45/?page=23',          'http://example.com/path/45')
    expectUrlKey('http://example.com/path/45/?param=67&page=23', 'http://example.com/path/45')
    expectUrlKey('http://example.com/path/45?param=67&page=23',  'http://example.com/path/45')
  })

  test('https', () => {
    expectUrlKey('https://example.com/path/23', 'http://example.com/path')
  })

  test('port', () => {
    expectUrlKey('http://example.com:8080/path/23', 'http://example.com/path')
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


describe('selectStartからurl keyを生成する', () => {

  test('pathがpage', () => {
    expectUrlKeyWithSelectStart('http://example.com/path/23',      24, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/23',      25, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/23/',     24, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/23/path', 24, 'http://example.com/path')

    expectUrlKeyWithSelectStart('http://example.com/path/23/path/45',       24, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/23/path/45',       25, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/23/path/45/',      24, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/23/path/45/path',  24, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/23/path/45/path/', 24, 'http://example.com/path')
  })

  test('hashがpage', () => {
    expectUrlKeyWithSelectStart('http://example.com/path/#23', 25, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/#23', 26, 'http://example.com/path')
  })

  test('paramがpage', () => {
    expectUrlKeyWithSelectStart('http://example.com/path/?page=23', 31, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/?page=23', 32, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path?page=23',  30, 'http://example.com/path')

    expectUrlKeyWithSelectStart('http://example.com/path/?page=23&param=45', 31, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path/?page=23&param=45', 32, 'http://example.com/path')
    expectUrlKeyWithSelectStart('http://example.com/path?page=23&param=45',  30, 'http://example.com/path')
  })

})

const expectUrlKeyWithSelectStart = (url: string, selectStart: number, be: string) => {
    expect(
      pipe(url)
        (fromUrlDomain.fromString)
        (urlObj => fromUrlKeyDomain.fromSelectStart(urlObj, selectStart))
        ()
    ).toStrictEqual(be)
}

describe('urlがkeyにマッチする', () => {

  const urls = [
    'http://example.com/B',
    'http://example.com/A',
    'http://example-a.com/A',
  ]

  test('pathがpage', () => {
    const url = fromUrlDomain.fromString('http://example.com/A/43')
    expect(urls.find(key => fromUrlKeyDomain.matchUrl(key, url))).toBe('http://example.com/A')
  })
})

describe('pageを入力する', () => {
  test('pathがpage', () => {
    const url = fromUrlDomain.fromString('http://example.com/A/43')

    expect(fromUrlDomain.assignPage(url, 21, 54)).toBe('http://example.com/A/54')
    expect(fromUrlDomain.assignPage(url, 22, 54)).toBe('http://example.com/A/54')
  })
})

