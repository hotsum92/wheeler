import React, { useState } from 'react'
import CssBaseLine from '~/ui/css-base-line'
import PageInput from '~/ui/component/page-input'

export default {
  component: PageInput,
};

export const Default = () => {

  const [pageInput, setPageInput] = useState('1')

  return (
    <>
      <CssBaseLine />
      <PageInput
        sx={{ position: 'absolute', left: 50 }}
        pageInput={pageInput}
        onChangePageInput={setPageInput}
        onClickForwardButton={() => setPageInput((Number(pageInput) + 1).toString())}
        onClickBackwardButton={() => setPageInput((Number(pageInput) - 1).toString())}
        onWheelUp={() => setPageInput((Number(pageInput) + 1).toString())}
        onWheelDown={() => setPageInput((Number(pageInput) - 1).toString())}
      />
    </>
  )
}
