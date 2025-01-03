// Initialize the side panel
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Listen for navigation to search pages
chrome.webNavigation.onCompleted.addListener(async (details) => {
  try {
    const url = new URL(details.url);
    
    const searchParams = {
      'www.google.com': 'q',
      'www.bing.com': 'q',
      'duckduckgo.com': 'q',
      'search.brave.com': 'q',
      'search.yahoo.com': 'p',
      'www.baidu.com': 'wd',
      'yandex.com': 'text',
      'www.ecosia.org': 'q',
      'www.qwant.com': 'q',
      'www.startpage.com': 'query'
    };

    const hostname = url.hostname;
    const paramName = searchParams[hostname];
    
    if (paramName && url.searchParams.has(paramName)) {
      const query = url.searchParams.get(paramName);
      if (query) {
        await chrome.storage.local.set({ currentQuery: query });
      }
    }
  } catch (error) {
    console.error('Error processing URL:', error);
  }
});