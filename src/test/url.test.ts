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

describe('keyを生成する', () => {
  test('pathの最後がpage', () => {
    expect(
      pipe('http://example.com/path/23')
        (fromUrlDomain.fromString)
        (fromUrlKeyDomain.fromUrl)
        ()
    ).toStrictEqual(
      'http://example.com/path/'
    )
  })
})

describe('urlがkeyにマッチする', () => {
})

describe('pageを入力する', () => {
})
