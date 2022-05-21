import * as fromDomainUrlInput from '~/domain/url-input'

test('should assign number in middle', () => {
  const url = 'http://example.com/10/test'
  const urlInput = fromDomainUrlInput.newUrlInput(url, 19, '10')
  expect(fromDomainUrlInput.assignPage(urlInput, 20).input).toBe('http://example.com/20/test')
})
