ipc.on("close-tab", () => {
    closeSelectedTab();
});

ipc.on("new-tab", () => {
    createNewTab();
});

ipc.on("go-back", () => {
    goBack();
});

ipc.on("go-forward", () => {
    goForward();
});

ipc.on("inspect", () => {
    inspect();
});

ipc.on("reload-selected-page", () => {
    reloadSelectedPage();
});

ipc.on("toggle-is-vert-or-horiz", () => {
    toggleIsVertOrHoriz();
});

document.addEventListener("mouseup", function(e) {
    closeTab(e);
});

function closeTab(e) {
    const tabElement = e.target.closest(".tab-close");
    if (tabElement) {
        const tabId = parseInt(tabElement.closest(".tab").id.replace('tab', ''));
        const nextTab = tabs.filter(tab => tab.tabID > tabId).sort((a, b) => a.tabID - b.tabID)[0];
        if (nextTab) {
            nextTab.isTabSelected = true;
        } else {
            const prevTab = tabs.filter(tab => tab.tabID < tabId).sort((a, b) => b.tabID - a.tabID)[0];
            if (prevTab) {
                prevTab.isTabSelected = true;
            }
        }
        tabs = tabs.filter(tab => tab.tabID !== tabId);
    }
}

function closeSelectedTab() {
    const selectedTab = tabs.find(tab => tab.isTabSelected);
    if (selectedTab) {
        const tabId = selectedTab.tabID;
        const nextTab = tabs.filter(tab => tab.tabID > tabId).sort((a, b) => a.tabID - b.tabID)[0];
        if (nextTab) {
            nextTab.isTabSelected = true;
        } else {
            const prevTab = tabs.filter(tab => tab.tabID < tabId).sort((a, b) => b.tabID - a.tabID)[0];
            if (prevTab) {
                prevTab.isTabSelected = true;
            }
        }
        tabs = tabs.filter(tab => tab.tabID !== tabId);
    }
}

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

function reloadSelectedPage() {
    const selectedTab = tabs.find(tab => tab.isTabSelected);
    if (selectedTab) {
        const webviewElement = document.getElementById(`webview${selectedTab.tabID}`);
        if (webviewElement) {
            webviewElement.reload();
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeInput = document.activeElement;
        if (activeInput && activeInput.tagName === 'INPUT') {
            const tabElement = activeInput.closest('.tab');
            if (tabElement) {
                const tabId = parseInt(tabElement.id.replace('tab', ''));
                const webviewElement = document.getElementById(`webview${tabId}`);
                const tabObj = tabs.find(tab => tab.tabID === tabId);
                if (webviewElement && tabObj) {
                    webviewElement.shadowRoot.children[1].style = "flex: 1 1 auto; background-color: #fff; width: 100%; height: 100%; border: 0px;";
                    if (activeInput.value.includes("http://") || activeInput.value.includes("https://") || activeInput.value.includes("chrome://")) {
                        webviewElement.src = activeInput.value;
                        tabObj.url = activeInput.value;
                    } else if (!activeInput.value.includes(" ") && activeInput.value.includes(".")) {
                        webviewElement.src = `http://${activeInput.value}`;
                        tabObj.url = `http://${activeInput.value}`;
                    } else {
                        tabObj.isGoogleSearch = true;
                        tabObj.googleSearchQuery = activeInput.value;
                        const googleValue = activeInput.value.replace(" ", '+');
                        webviewElement.src = `https://www.google.com/search?q=${googleValue}`;
                        tabObj.url = `https://www.google.com/search?q=${googleValue}`;
                    }
                    activeInput.blur(); // Unfocus from the input when page starts to load
                    tabObj.isTabFocused = false;
                }
            }
        }
    }
});
