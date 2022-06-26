export const RUN = 'RUN'
export const STOP = 'STOP'
export const DISPLAY = 'DISPLAY'
export const HIDDEN = 'HIDDEN'

export interface AppStatus {
  status: typeof RUN | typeof STOP
  displayStatus: null | typeof DISPLAY | typeof HIDDEN
}

export const newAppStatus = (): AppStatus => {
  return {
    status: STOP,
    displayStatus: null,
  }
}

export const runApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    status: RUN,
    displayStatus: DISPLAY,
  }
}

export const stopApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    status: STOP,
  }
}

export const hideApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    displayStatus: HIDDEN,
  }
}

export const displayApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    displayStatus: DISPLAY,
  }
}

export const isRunning = (appStatus: AppStatus): boolean => {
  return appStatus.status === RUN
}

export const isStop = (appStatus: AppStatus): boolean => {
  return appStatus.status === STOP
}

export const isHidden = (appStatus: AppStatus): boolean => {
  return appStatus.displayStatus === HIDDEN
}

export const isDisplay = (appStatus: AppStatus): boolean => {
  return appStatus.displayStatus === DISPLAY
}
