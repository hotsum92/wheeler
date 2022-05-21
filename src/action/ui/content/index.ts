export const ON_LOAD_CONTENT_UI = 'CONTENT_UI.ON_LOAD_CONTENT_UI'

export interface OnLoadContentUi {
  type: typeof ON_LOAD_CONTENT_UI
  payload: {
  }
}

export const onLoadContentUi =
  (): OnLoadContentUi =>
    ({
      type: ON_LOAD_CONTENT_UI,
      payload: {
      }
    })

export const ON_CHANGE_PAGE_INPUT = 'CONTENT_UI.ON_CHANGE_PAGE_INPUT'

export interface OnChangePageInput {
  type: typeof ON_CHANGE_PAGE_INPUT
  payload: {
    input: string
  }
}

export const onChangePageInput =
  (input: string): OnChangePageInput =>
    ({
      type: ON_CHANGE_PAGE_INPUT,
      payload: {
        input,
      }
    })

export const ON_CLICK_BACKWARD_BUTTON = 'CONTENT_UI.ON_CLICK_BACKWARD_BUTTON'

export interface OnClickBackwardButton {
  type: typeof ON_CLICK_BACKWARD_BUTTON
  payload: {
  }
}

export const onClickBackwardButton =
  (): OnClickBackwardButton =>
    ({
      type: ON_CLICK_BACKWARD_BUTTON,
      payload: {
      }
    })

export const ON_CLICK_FORWARD_BUTTON = 'CONTENT_UI.ON_CLICK_FORWARD_BUTTON'

export interface OnClickForwardButton {
  type: typeof ON_CLICK_FORWARD_BUTTON
  payload: {
  }
}

export const onClickForwardButton =
  (): OnClickForwardButton =>
    ({
      type: ON_CLICK_FORWARD_BUTTON,
      payload: {
      }
    })

export const ON_WHEEL_UP = 'CONTENT_UI.ON_WHEEL_UP'

export interface OnWheelUp {
  type: typeof ON_WHEEL_UP
  payload: {
  }
}

export const onWheelUp =
  (): OnWheelUp =>
    ({
      type: ON_WHEEL_UP,
      payload: {
      }
    })

export const ON_WHEEL_DOWN = 'CONTENT_UI.ON_WHEEL_DOWN'

export interface OnWheelDown {
  type: typeof ON_WHEEL_DOWN
  payload: {
  }
}

export const onWheelDown =
  (): OnWheelDown =>
    ({
      type: ON_WHEEL_DOWN,
      payload: {
      }
    })

export const ON_CHANGE_URL_INPUT = 'CONTENT_UI.ON_CHANGE_URL_INPUT'

export interface OnChangeUrlInput {
  type: typeof ON_CHANGE_URL_INPUT
  payload: {
    input: string
  }
}

export const onChangeUrlInput =
  (input: string): OnChangeUrlInput =>
    ({
      type: ON_CHANGE_URL_INPUT,
      payload: {
        input,
      }
    })

export const ON_SELECT_URL_INPUT = 'CONTENT_UI.ON_SELECT_URL_INPUT'

export interface OnSelectUrlInput {
  type: typeof ON_SELECT_URL_INPUT
  payload: {
    selectStart: number,
    select: string,
  }
}

export const onSelectUrlInput =
  (selectStart: number, select: string): OnSelectUrlInput =>
    ({
      type: ON_SELECT_URL_INPUT,
      payload: {
        selectStart,
        select,
      }
    })
