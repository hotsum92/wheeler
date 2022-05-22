import React, { useState } from 'react'
import CssBaseLine from '~/ui/css-base-line'
import UrlInput from '~/ui/component/url-input'

export default {
  component: UrlInput,
};

export const Default = () => {

  const [urlInput, setUrlInput] = useState('http://example.com/23/')

  return (
    <>
      <CssBaseLine />
      <UrlInput
        sx={{ position: 'absolute', left: 50 }}
        urlInput={urlInput}
        onChangeUrlInput={setUrlInput}
        onSelectUrlInput={(selectStart, select) => console.log({ selectStart, select })}
      />
    </>
  )
}
