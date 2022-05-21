import React, { useState } from 'react'
import CssBaseLine from '~/ui/css-base-line'
import UrlFloatInput from './url-float-input'

export default {
  component: UrlFloatInput,
};

export const Default = () => {

  const [urlInput, setUrlInput] = useState('http://example.com/23/')

  return (
    <>
      <CssBaseLine />
      <UrlFloatInput
        sx={{ position: 'absolute', left: 50 }}
        urlInput={urlInput}
        onChangeUrlInput={setUrlInput}
        onSelectUrlInput={(selectStart, select) => console.log({ selectStart, select })}
      />
    </>
  )
}
