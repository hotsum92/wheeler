
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

export const STATUS_COMPLETE = 'complete'
export const STATUS_LOADING = 'loading'

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

export const openContentScript = (tabId: number) => {
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['content.js'],
  })
}
