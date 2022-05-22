export const RUN = 'RUN'
export const SUSPEND = 'SUSPEND'
export const STOP = 'STOP'

export interface AppStatus {
  status: typeof RUN | typeof SUSPEND | typeof STOP
}

export const newAppStatus = (): AppStatus => {
  return {
    status: STOP,
  }
}

export const suspendApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    status: SUSPEND,
  }
}

export const runApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    status: RUN,
  }
}

export const isSuspended = (appStatus: AppStatus): boolean => {
  return appStatus.status === SUSPEND
}

export const isRunning = (appStatus: AppStatus): boolean => {
  return appStatus.status === RUN
}

export const isStop = (appStatus: AppStatus): boolean => {
  return appStatus.status === STOP
}
