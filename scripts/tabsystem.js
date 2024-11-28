const ipc = require('electron').ipcRenderer;

var tabs = [
    {
        url: "",
        title: "",
        tabCreationDate: new Date(),
        tabID: 0,
        isTabSelected: true,
        isTabFocused: true,
        isGoogleSearch: false,
        googleSearchQuery: ""
    }
];
let tabLent = tabs.length;
var totalTabs = 0;

function createNewTab() {
    totalTabs++;
    const newTab = {
        url: "",
        title: "",
        tabCreationDate: new Date(),
        tabID: totalTabs,
        isTabSelected: true,
        isTabFocused: true,
        isUrlEntered: false,
        isGoogleSearch: false,
        googleSearchQuery: ""
    };
    tabs.forEach(tab => {
        tab.isTabSelected = false;
    });
    tabs.push(newTab);
    tabLent = tabs.length;
    
    setTimeout(() => {
        const maxTabId = Math.max(...tabs.map(tab => tab.tabID));
        const maxTab = tabs.find(tab => tab.tabID === maxTabId);
        if (maxTab) {
            const maxTabElement = document.querySelector(`#tab${maxTab.tabID}`);
            const maxTabInput = maxTabElement.querySelector('input');
            maxTabInput.focus();
        }
    }, 10);
}

setTimeout(() => {
    const maxTabId = Math.max(...tabs.map(tab => tab.tabID));
    const maxTab = tabs.find(tab => tab.tabID === maxTabId);
    if (maxTab) {
        const maxTabElement = document.querySelector(`#tab${maxTab.tabID}`);
        const maxTabInput = maxTabElement.querySelector('input');
        maxTabInput.focus();
    }
}, 11);

document.addEventListener("mouseup", function(e) {
    selectTab(e);
});

function selectTab(e) {
    const tabElement = e.target.closest(".tab");
    const selectedTabInput = tabElement.querySelector("input");
    const allTabsInput = document.querySelectorAll(".tab input");
    if (tabElement) {
        const tabId = parseInt(tabElement.id.replace('tab', ''));
        tabs.forEach(tab => {
            if (tab.tabID !== tabId) {
                tab.isTabSelected = false;
                tab.isTabFocused = false;
            }
        });
        const selectedTab = tabs.find(tab => tab.tabID === tabId);
        console.log(selectedTab.isTabFocused);
        if(e.target.tagName == "INPUT"){
            if (selectedTab && !selectedTab.isTabSelected && !selectedTab.isTabFocused) {
                if(selectedTab.url != ""){
                    selectedTab.isTabSelected = true;
                    selectedTab.isTabFocused = false;
                    selectedTabInput.readOnly = true;
                }else{
                    selectedTab.isTabSelected = true;
                    selectedTab.isTabFocused = true;
                    selectedTabInput.readOnly = false;
                    selectedTabInput.value = selectedTab.url;
                }
            } else if (selectedTab && selectedTab.isTabSelected && !selectedTab.isTabFocused) {
                selectedTab.isTabFocused = true;
                selectedTabInput.readOnly = false;
                selectedTabInput.value = selectedTab.url;

                setTimeout(() => {
                    selectedTabInput.select();
                }, 10);
            }
        }
    }
}

document.addEventListener('focusout', function(event) {
    if (event.target.tagName === 'INPUT' && event.target.closest('.tab')) {
        const tabElement = event.target.closest('.tab');
        const tabId = parseInt(tabElement.id.replace('tab', ''));
        const tabObj = tabs.find(tab => tab.tabID === tabId);
        if (tabObj) {
            tabObj.isTabFocused = false;
            event.target.value = tabObj.title;
        }
    }
});


function updateTabs() {
    const tabContainer = document.querySelector('.tabs');
    const tabElements = tabContainer.querySelectorAll('.tab');
    const webviewContainer = document.querySelector('.contentarea');
    const loadingIndicator = document.querySelector('.loadingIndicator');

    // Remove tabs and webviews that are no longer in the tabs array
    tabElements.forEach(tabElement => {
        const tabId = parseInt(tabElement.id.replace('tab', ''));
        if (!tabs.some(tab => tab.tabID === tabId)) {
            tabContainer.removeChild(tabElement);
            const webviewElement = document.getElementById(`webview${tabId}`);
            if (webviewElement) {
                webviewContainer.removeChild(webviewElement);
            }
        }
    });

    // Add new tabs and webviews that are in the tabs array but not in the DOM
    tabs.forEach(tab => {
        let tabElement = document.getElementById(`tab${tab.tabID}`);
        if (!tabElement) {
            tabElement = document.createElement('div');
            tabElement.className = 'tab';
            tabElement.id = `tab${tab.tabID}`;
            tabElement.innerHTML = `
                <input type="text" placeholder="Search or Enter URL" />
                <div class="tab-reload">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.26758 12.1973C7.26758 9.30273 9.60547 6.96484 12.5 6.96484C12.7988 6.96484 13.0859 7 13.3438 7.04688L11.9258 5.64648C11.8262 5.54102 11.7676 5.40625 11.7676 5.25391C11.7676 4.9375 12.0137 4.67969 12.3242 4.67969C12.4883 4.67969 12.6289 4.73828 12.7285 4.84961L15.1309 7.29297C15.248 7.41016 15.3125 7.5625 15.3125 7.71484C15.3125 7.87305 15.2539 8.01367 15.1309 8.13672L12.7285 10.5625C12.623 10.6621 12.4941 10.7207 12.3242 10.7207C12.0137 10.7207 11.7676 10.4746 11.7676 10.1523C11.7676 10 11.8203 9.87109 11.9316 9.76562L13.5137 8.19531C13.2207 8.13086 12.875 8.10742 12.5 8.10742C10.2441 8.10742 8.41602 9.93555 8.41602 12.1914C8.41602 14.4473 10.2441 16.2754 12.5 16.2754C14.7559 16.2754 16.584 14.4473 16.584 12.1914C16.584 11.8457 16.8066 11.5996 17.1406 11.5996C17.4863 11.5996 17.7324 11.8457 17.7324 12.1973C17.7324 15.0859 15.3887 17.4297 12.5 17.4297C9.60547 17.4297 7.26758 15.0859 7.26758 12.1973Z"/>
                    </svg>
                </div>
                <div class="tab-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.96484 16.3047C7.71289 16.0586 7.71875 15.625 7.96484 15.3848L11.5684 11.7754L7.96484 8.17188C7.71875 7.93164 7.71289 7.50391 7.96484 7.24609C8.2168 6.99414 8.64453 7 8.89062 7.24609L12.4941 10.8496L16.0977 7.24609C16.3496 7 16.7656 7 17.0234 7.25195C17.2812 7.49805 17.2754 7.92578 17.0293 8.17188L13.4258 11.7754L17.0293 15.3848C17.2754 15.6309 17.2754 16.0527 17.0234 16.3047C16.7715 16.5625 16.3496 16.5566 16.0977 16.3105L12.4941 12.707L8.89062 16.3105C8.64453 16.5566 8.22266 16.5566 7.96484 16.3047Z"/>
                    </svg>
                </div>
            `;
            tabContainer.appendChild(tabElement);

            // Create and append webview
            const webviewElement = document.createElement('webview');
            webviewElement.id = `webview${tab.tabID}`;
            webviewElement.setAttribute('nodeintegration', '');
            webviewElement.setAttribute('allowpopups', 'true');
            webviewElement.setAttribute('preload', 'scripts/gesture.js');
            webviewElement.setAttribute('enableblinkfeatures', 'PreciseMemoryInfo, CSSVariables');
            webviewElement.src = tab.url;
            webviewElement.style.display = 'none';
            webviewElement.addEventListener('did-finish-load', () => {
                tab.title = webviewElement.getTitle();
                tab.url = webviewElement.src; // Update the tab's URL with the webview's src
                const inputElement = tabElement.querySelector('input');
                if (inputElement) {
                    inputElement.value = tab.title;
                }
            });
            webviewContainer.appendChild(webviewElement);
        }

        // Add or remove 'tab-focused' class based on isTabSelected
        if (tab.isTabSelected) {
            tabElement.classList.add('tab-focused');
            const webview = document.getElementById(`webview${tab.tabID}`);
            if (webview && webview.isLoading()) {
                loadingIndicator.style.opacity = "0.5";
                loadingIndicator.style.animation = "loading 0.4s ease-in-out infinite";
            } else {
                loadingIndicator.style.animation = "unset";
                loadingIndicator.style.opacity = "0";
            }
        } else {
            tabElement.classList.remove('tab-focused');
        }
    });

    // Check if no tab is selected
    const hasSelectedTab = tabs.some(tab => tab.isTabSelected);
    if (!hasSelectedTab) {
        loadingIndicator.style.animation = "unset";
        loadingIndicator.style.opacity = "0";
    }

    // Update webview display based on selected tab
    tabs.forEach(tab => {
        const webviewElement = document.getElementById(`webview${tab.tabID}`);
        if (webviewElement) {
            webviewElement.style.display = tab.isTabSelected ? 'unset' : 'none';
        }
    });
}

setInterval(updateTabs, 10);
