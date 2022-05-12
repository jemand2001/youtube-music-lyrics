
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (!/music.youtube.com\/watch/.test(details.url))
    return
  chrome.tabs.sendMessage(details.tabId, 'update')
})
