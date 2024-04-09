export const getCurrentTabUId = (
  callback: (url: number | undefined) => void
): void => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id)
    });
};

export const getCurrentTabUrl = (
  callback: (url: string | undefined) => void
): void => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url)
    });
};

export const matchTabs = (url: string | string[], callback: (url: number | undefined) => void): void => {
  const queryInfo = { url: url };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      for (let tab of tabs) {
        callback(tab.id);
      }
    });
}

