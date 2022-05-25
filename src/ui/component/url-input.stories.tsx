import React from 'react'
import CssBaseLine from '~/ui/css-base-line'
import { useReducer } from '~/ui'
import UrlInput from '~/ui/component/url-input'
import * as fromContentReducer from '~/reducer/content'
import * as fromContentUiAction from '~/action/ui/content'

export default {
  component: UrlInput,
};

export const Default = () => {

  const {state, dispatch} = useReducer()
  const urlInput = fromContentReducer.getContentUiUrlInput(state)

  return (
    <>
      <CssBaseLine />
      <UrlInput
        sx={{ position: 'absolute', left: 50 }}
        urlInput={urlInput.input}
        onChangeUrlInput={(input) => dispatch(fromContentUiAction.onChangeUrlInput(input))}
        onSelectUrlInput={(selectStart, select) => console.log({ selectStart, select })}
        onBlur={() => dispatch(fromContentUiAction.onFocusOutUrlInput())}
        onEnterKeyDown={() => dispatch(fromContentUiAction.onInputEnterKeyUrlInput())}
      />
    </>
  )
}
