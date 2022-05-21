export interface AppStatus {
  isRunning: boolean
}

export const newAppStatus = (): AppStatus => {
  return {
    isRunning: false
  }
}

export const suspendApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    isRunning: false,
  }
}

export const runApp = (appStatus: AppStatus): AppStatus => {
  return {
    ...appStatus,
    isRunning: true,
  }
}

export const isSuspended = (appStatus: AppStatus): boolean => {
  return !appStatus.isRunning
}

export const isRunning = (appStatus: AppStatus): boolean => {
  return appStatus.isRunning
}

