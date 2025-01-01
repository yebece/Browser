if (!localStorage.getItem("isVertOrHoriz")) {
localStorage.setItem("isVertOrHoriz", "horizontal");
}

if (!localStorage.getItem("sidebarWidth")) {
    localStorage.setItem("sidebarWidth", "200");
    root.style.setProperty('--tab-width', `${localStorage.getItem("sidebarWidth")}px`);
}

const verticalTabButton = document.getElementById("vertical-tab-button");
const horizontalTabButton = document.getElementById("horizontal-tab-button");
const navbarStyleLink = document.getElementById("navbar-style");
const contentAreaStyleLink = document.getElementById("contentarea-style");

if (localStorage.getItem("isVertOrHoriz") == "horizontal") {
    verticalTabButton.style.display = "none";
    horizontalTabButton.style.display = "flex";
    navbarStyleLink.href = "../assets/styles/navbar-style-h.css";
    contentAreaStyleLink.href = "../assets/styles/contentarea-style-h.css";
}else if (localStorage.getItem("isVertOrHoriz") == "vertical") {
    verticalTabButton.style.display = "flex";
    horizontalTabButton.style.display = "none";
    navbarStyleLink.href = "../assets/styles/navbar-style-v.css";
    contentAreaStyleLink.href = "../assets/styles/contentarea-style-v.css";
}

function toggleIsVertOrHoriz() {
    const currentOrientation = localStorage.getItem("isVertOrHoriz");
    const newOrientation = currentOrientation === "horizontal" ? "vertical" : "horizontal";
    localStorage.setItem("isVertOrHoriz", newOrientation);

    if (newOrientation === "horizontal") {
        verticalTabButton.style.display = "none";
        horizontalTabButton.style.display = "flex";
        navbarStyleLink.href = "../assets/styles/navbar-style-h.css";
        contentAreaStyleLink.href = "../assets/styles/contentarea-style-h.css";
    } else {
        verticalTabButton.style.display = "flex";
        horizontalTabButton.style.display = "none";
        navbarStyleLink.href = "../assets/styles/navbar-style-v.css";
        contentAreaStyleLink.href = "../assets/styles/contentarea-style-v.css";
    }
}

let isResizing = false;
let initialX;
let initialWidth;

const sidebarResizeHandle = document.querySelector('.sidebar-resize-handle');
const root = document.documentElement;

sidebarResizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    initialX = e.clientX;
    initialWidth = parseInt(getComputedStyle(root).getPropertyValue('--tab-width'));
    sidebarResizeHandle.style.paddingRight = "200px";

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
        sidebarResizeHandle.style.paddingRight = "0px";
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
    });
});

sidebarResizeHandle.addEventListener('dblclick', () => {
    root.style.setProperty('--tab-width', '200px');
    localStorage.setItem("sidebarWidth", "200");
});

function handleMouseMove(e) {
    if (!isResizing) return;

    const deltaX = e.clientX - initialX;
    let newWidth = initialWidth + deltaX;

    // Clamp width between min and max values
    newWidth = Math.max(120, Math.min(400, newWidth));
    
    root.style.setProperty('--tab-width', `${newWidth}px`);
    localStorage.setItem("sidebarWidth", newWidth.toString());
}
