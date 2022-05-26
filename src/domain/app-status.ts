export const RUN = 'RUN'
export const HIDDEN = 'HIDDEN'
export const STOP = 'STOP'

export interface AppStatus {
  status: typeof RUN | typeof HIDDEN | typeof STOP
}

export const newAppStatus = (): AppStatus => {
  return {
    status: STOP,
  }
}

export const hideApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    status: HIDDEN,
  }
}

export const runApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    status: RUN,
  }
}

export const stopApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    status: STOP,
  }
}

export const isHidden = (appStatus: AppStatus): boolean => {
  return appStatus.status === HIDDEN
}

export const isRunning = (appStatus: AppStatus): boolean => {
  return appStatus.status === RUN
}

export const isStop = (appStatus: AppStatus): boolean => {
  return appStatus.status === STOP
}
