import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FloatBox from '~/ui/component/float-box'
import UrlFloatInput from '~/ui/component/url-float-input'
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
      <UrlFloatInput
        sx={{ position: 'fixed', right: 10, top: 10 }}
        urlInput={urlInput.input}
        onChangeUrlInput={(input) => dispatch(fromContentUiAction.onChangeUrlInput(input))}
        onSelectUrlInput={(selectStart, select) => dispatch(fromContentUiAction.onSelectUrlInput(selectStart, select))}
      />
      <FloatBox
        sx={{ position: 'fixed', right: 10, top: 50 }}
        pageInput={pageInput.input}
        onChangePageInput={(input) => dispatch(fromContentUiAction.onChangePageInput(input))}
        onClickBackwardButton={() => dispatch(fromContentUiAction.onClickBackwardButton())}
        onClickForwardButton={() => dispatch(fromContentUiAction.onClickForwardButton())}
        onWheelUp={() => dispatch(fromContentUiAction.onWheelUp())}
        onWheelDown={() => dispatch(fromContentUiAction.onWheelDown())}
      />
    </>
  );
}
