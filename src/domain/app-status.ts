export const RUN = 'RUN'
export const STOP = 'STOP'

export interface AppStatus {
  status: typeof RUN | typeof STOP
}

export const newAppStatus = (): AppStatus => {
  return {
    status: STOP,
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

export const isRunning = (appStatus: AppStatus): boolean => {
  return appStatus.status === RUN
}

export const isStop = (appStatus: AppStatus): boolean => {
  return appStatus.status === STOP
}
