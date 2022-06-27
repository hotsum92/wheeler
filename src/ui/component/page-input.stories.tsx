import React from 'react'
import CssBaseLine from '~/ui/css-base-line'
import { useReducer } from '~/ui'
import * as fromContentReducer from '~/reducer/content'
import PageInput from '~/ui/component/page-input'
import * as fromContentUiAction from '~/action/ui/content'

export default {
  component: PageInput,
};

export const Default = () => {

  const {state, dispatch} = useReducer()
  const pageInput = fromContentReducer.getContentUiPageInput(state)

  return (
    <>
      <CssBaseLine />
      <PageInput
        sx={{ position: 'absolute', left: 50 }}
        pageInput={pageInput.input}
        onBlur={() => dispatch(fromContentUiAction.onFocusOutPageInput())}
        onEnterKeyDown={() => dispatch(fromContentUiAction.onInputEnterKeyPageInput())}
        onChangePageInput={(input) => dispatch(fromContentUiAction.onChangePageInput(input))}
        onClickBackwardButton={() => dispatch(fromContentUiAction.onClickBackwardButton())}
        onClickForwardButton={() => dispatch(fromContentUiAction.onClickForwardButton())}
        onWheelUp={(hasFocus) => dispatch(fromContentUiAction.onWheelUp(hasFocus))}
        onWheelDown={(hasFocus) => dispatch(fromContentUiAction.onWheelDown(hasFocus))}
      />
    </>
  )
}
