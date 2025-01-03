// content.js
// Run immediately when script loads
console.log("Content script loaded on:", window.location.href);

function getSearchQuery() {
    const url = new URL(window.location.href);
    
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
    
    console.log("Checking search query for hostname:", hostname);
    
    if (paramName) {
        const query = url.searchParams.get(paramName);
        console.log("Found search query:", query);
        
        if (query) {
            // Try both methods to open side panel
            chrome.runtime.sendMessage({ 
                action: 'openSidePanel', 
                query: query 
            }).catch(err => console.error("Send message error:", err));

            // Also try direct method
            if (chrome.sidePanel) {
                chrome.sidePanel.open().catch(err => 
                    console.error("Direct open error:", err)
                );
            }
        }
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', getSearchQuery);
// Also run immediately in case DOMContentLoaded already fired
getSearchQuery();

// Listen for URL changes (for single-page search engines)
let lastUrl = location.href; 
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        console.log('URL changed, checking search query');
        getSearchQuery();
    }
}).observe(document, {subtree: true, childList: true});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getQuery") {
    sendResponse({ query: getSearchQuery() });
  }
});