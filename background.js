// Background service worker — no persistent logic needed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Open Multiple URLs v2 installed.');
});
