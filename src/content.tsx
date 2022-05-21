import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '~/store/content'
import Content from '~/ui/content'
import saga from '~/process/content'

const newDiv = document.createElement("div")
document.body.appendChild(newDiv)

const store = configureStore()
store.runSaga(saga)

render(
  <Provider store={store}>
    <Content />
  </Provider>,
  newDiv
)
