document.addEventListener('click', function(event) {
    if (event.target.closest('.tab-reload')) {
        const tabElement = event.target.closest('.tab');
        if (tabElement) {
            const tabId = parseInt(tabElement.id.replace('tab', ''));
            const tabObj = tabs.find(tab => tab.tabID === tabId);
            if (tabObj && tabObj.isTabSelected) {
                const webviewElement = document.getElementById(`webview${tabObj.tabID}`);
                if (webviewElement) {
                    webviewElement.reload();
                }
            }
        }
    }
});

document.addEventListener('keydown', function(event) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'ArrowLeft') {
        event.preventDefault();
        goBack();
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'ArrowRight') {
        event.preventDefault();
        goForward();
    } else if (event.key === 'F11') {
        event.preventDefault();
        inspect();
    }
});

function goBack() {
    const selectedTab = tabs.find(tab => tab.isTabSelected);
    if (selectedTab) {
        const webviewElement = document.getElementById(`webview${selectedTab.tabID}`);
        if (webviewElement && webviewElement.canGoBack()) {
            webviewElement.goBack();
        }
    }
}

function goForward() {
    const selectedTab = tabs.find(tab => tab.isTabSelected);
    if (selectedTab) {
        const webviewElement = document.getElementById(`webview${selectedTab.tabID}`);
        if (webviewElement && webviewElement.canGoForward()) {
            webviewElement.goForward();
        }
    }
}

function inspect() {
    const selectedTab = tabs.find(tab => tab.isTabSelected);
    if (selectedTab) {
        const webviewElement = document.getElementById(`webview${selectedTab.tabID}`);
        if (webviewElement) {
            webviewElement.openDevTools();
        }
    }
}
