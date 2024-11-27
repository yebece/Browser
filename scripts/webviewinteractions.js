ipc.on("close-tab", () => {
    closeSelectedTab();
});

ipc.on("swipe-coordinates", (event, arg) => {
    console.log(`Swipe coordinates: (${arg[0]}, ${arg[1]})`);
    coordinates = arg;
    checkSwipeCoordinates();
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

ipc.on("select-tab-1", () => {
    selectFirstTab();
});

ipc.on("select-tab-2", () => {
    selectSecondTab();
}); 

ipc.on("select-tab-3", () => {
    selectThirdTab();
});

ipc.on("select-tab-4", () => {
    selectFourthTab();
});

ipc.on("select-tab-5", () => {
    selectFifthTab();
});

ipc.on("select-tab-6", () => {
    selectSixthTab();
});

ipc.on("select-tab-7", () => {
    selectSeventhTab();
});

ipc.on("select-tab-8", () => {
    selectEighthTab();
});

ipc.on("select-tab-9", () => {
    selectNinthTab();
});

ipc.on("select-tab-10", () => {
    selectTenthTab();
});

ipc.on("unselect-all-tabs", () => {
    unselectAllTabs();
});

var coordinates = [0, 0];
var gonnaGoFurther = true;

function checkSwipeCoordinates() {
 if(coordinates[0] > 50 && gonnaGoFurther){
    goBack();
    gonnaGoFurther = false;
 } else if (coordinates[0] < -50 && gonnaGoFurther) {
    goForward();
    gonnaGoFurther = false;ß
 }


 if(coordinates[0] < 10 && coordinates[0] > -10){
    gonnaGoFurther = true;
 }
}

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
                        tabObj.title = activeInput.value;
                    } else if (!activeInput.value.includes(" ") && activeInput.value.includes(".")) {
                        webviewElement.src = `http://${activeInput.value}`;
                        tabObj.url = `http://${activeInput.value}`;
                        tabObj.title = activeInput.value;
                    } else {
                        tabObj.isGoogleSearch = true;
                        tabObj.googleSearchQuery = activeInput.value;
                        const googleValue = activeInput.value.replace(" ", '+');
                        webviewElement.src = `https://www.google.com/search?q=${googleValue}`;
                        tabObj.url = `https://www.google.com/search?q=${googleValue}`;
                        tabObj.title = `Search: ${googleValue}`;
                    }
                    activeInput.blur(); // Unfocus from the input when page starts to load
                    tabObj.isTabFocused = false;
                }
            }
        }
    }
});

function selectTabByIndex(index) {
    if (index < 0 || index > 9) {
        console.error("Index out of bounds. Please select an index between 0 and 9.");
        return;
    }

    const tabElement = document.querySelector(`.tabs .tab:nth-child(${index + 1})`);
    if (tabElement) {
        const tabId = parseInt(tabElement.id.replace('tab', ''));
        const tabObj = tabs.find(tab => tab.tabID === tabId);
        tabs.forEach(tab => {
            tab.isTabSelected = false;
            const tabElementInput = document.getElementById(`tab${tab.tabID}`).querySelector('input');
            tabElementInput.blur();
        });
        if (tabObj) {
            tabObj.isTabSelected = true;
            const webviewElement = document.getElementById(`webview${tabId}`);
            if (webviewElement) {
                const inputElement = tabElement.querySelector('input');
                if (tabObj.url == "") {
                    inputElement.focus();
                }
            }
        }
    }
}

function selectFirstTab() {
    selectTabByIndex(0);
}

function selectSecondTab() {
    selectTabByIndex(1);
}

function selectThirdTab() {
    selectTabByIndex(2);
}

function selectFourthTab() {
    selectTabByIndex(3);
}

function selectFifthTab() {
    selectTabByIndex(4);
}

function selectSixthTab() {
    selectTabByIndex(5);
}

function selectSeventhTab() {
    selectTabByIndex(6);
}

function selectEighthTab() {
    selectTabByIndex(7);
}

function selectNinthTab() {
    selectTabByIndex(8);
}

function selectTenthTab() {
    selectTabByIndex(9);
}

function detectTwoFingerTouch(event) {
    if (event.touches && event.touches.length === 2) {
        console.log('Two finger touch detected');
        // Add your custom logic here
    }
}

function unselectAllTabs() {
    tabs.forEach(tab => {
        tab.isTabSelected = false;
        const tabElementInput = document.getElementById(`tab${tab.tabID}`).querySelector('input');
        tabElementInput.blur();
    });
}   