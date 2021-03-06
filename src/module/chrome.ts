
export const chromeRuntimeSendMessage = (message: any) => {
  return chrome.runtime.sendMessage(message)
}

export const chromeTabsSendMessage = (tabId: number, message: any) => {
  return chrome.tabs.sendMessage(tabId, message)
}

export const chromeRuntimeOnMessageAddListener = (listener: (...args: any) => void) => {
  chrome.runtime.onMessage.addListener(listener)
}

export const chromeRuntimeOnMessageRemoveListener = (listener: (...args: any) => void) => {
  chrome.runtime.onMessage.removeListener(listener)
}

export const TAB_STATUS_COMPLETE = 'complete'
export const TAB_STATUS_LOADING = 'loading'
export const TRANSITION_TYPE_LINK = 'link'
export const TRANSITION_TYPE_RELOAD = 'reload'
export const TRANSITION_AUTO_BOOKMARK = 'auto_bookmark'


export const chromeTabsOnUpdatedAddListener = (listener: (...args: any) => void) => {
  chrome.tabs.onUpdated.addListener(listener)
}

export const chromeTabsOnUpdatedRemoveListener = (listener: (...args: any) => void) => {
  chrome.tabs.onUpdated.removeListener(listener)
}

export const chromeActionOnClickedAddListener = (listener: (tab: chrome.tabs.Tab) => void) => {
  chrome.action.onClicked.addListener(listener)
}

export const chromeActionOnClickedRemoveListener = (listener: (...args: any) => void) => {
  chrome.action.onClicked.removeListener(listener)
}

export const chromeWebNavigationOnCommittedAddListener = (listener: (details: any) => void) => {
  chrome.webNavigation.onCommitted.addListener(listener)
}

export const chromeWebNavigationOnCommittedRemoveListener = (listener: (details: any) => void) => {
  chrome.webNavigation.onCommitted.removeListener(listener)
}

export const openContentScript = (tabId: number) => {
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['content.js'],
  })
}
