import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageInput from '~/ui/component/page-input'
import UrlInput from '~/ui/component/url-input'
import * as fromContentReducer from '~/reducer/content'
import * as fromContentUiAction from '~/action/ui/content'

export default function Content() {
  const dispatch = useDispatch()
  const pageInput = useSelector(fromContentReducer.getContentUiPageInput)
  const urlInput = useSelector(fromContentReducer.getContentUiUrlInput)

  useEffect(() => {
    dispatch(fromContentUiAction.onLoadContentUi())
  }, [])

  return (
    <>
      <UrlInput
        sx={{ position: 'fixed', right: 10, top: 10 }}
        urlInput={urlInput.input}
        onChangeUrlInput={(input) => dispatch(fromContentUiAction.onChangeUrlInput(input))}
        onSelectUrlInput={(selectStart, select) => dispatch(fromContentUiAction.onSelectUrlInput(selectStart, select))}
      />
      <PageInput
        sx={{ position: 'fixed', right: 10, top: 50 }}
        pageInput={pageInput.input}
        onBlur={() => dispatch(fromContentUiAction.onFocusOutPageInput())}
        onEnterKeyDown={() => dispatch(fromContentUiAction.onInputEnterKeyPageInput())}
        onChangePageInput={(input) => dispatch(fromContentUiAction.onChangePageInput(input))}
        onClickBackwardButton={() => dispatch(fromContentUiAction.onClickBackwardButton())}
        onClickForwardButton={() => dispatch(fromContentUiAction.onClickForwardButton())}
        onWheelUp={() => dispatch(fromContentUiAction.onWheelUp())}
        onWheelDown={() => dispatch(fromContentUiAction.onWheelDown())}
      />
    </>
  );
}
