if (!localStorage.getItem("isVertOrHoriz")) {
localStorage.setItem("isVertOrHoriz", "horizontal");
}

const verticalTabButton = document.getElementById("vertical-tab-button");
const horizontalTabButton = document.getElementById("horizontal-tab-button");
const navbarStyleLink = document.getElementById("navbar-style");
const contentAreaStyleLink = document.getElementById("contentarea-style");

if (localStorage.getItem("isVertOrHoriz") == "horizontal") {
    verticalTabButton.style.display = "none";
    horizontalTabButton.style.display = "flex";
    navbarStyleLink.href = "navbar-style-h.css";
    contentAreaStyleLink.href = "contentarea-style-h.css";
}else if (localStorage.getItem("isVertOrHoriz") == "vertical") {
    verticalTabButton.style.display = "flex";
    horizontalTabButton.style.display = "none";
    navbarStyleLink.href = "navbar-style-v.css";
    contentAreaStyleLink.href = "contentarea-style-v.css";
}

function toggleIsVertOrHoriz() {
    const currentOrientation = localStorage.getItem("isVertOrHoriz");
    const newOrientation = currentOrientation === "horizontal" ? "vertical" : "horizontal";
    localStorage.setItem("isVertOrHoriz", newOrientation);

    if (newOrientation === "horizontal") {
        verticalTabButton.style.display = "none";
        horizontalTabButton.style.display = "flex";
        navbarStyleLink.href = "navbar-style-h.css";
        contentAreaStyleLink.href = "contentarea-style-h.css";
    } else {
        verticalTabButton.style.display = "flex";
        horizontalTabButton.style.display = "none";
        navbarStyleLink.href = "navbar-style-v.css";
        contentAreaStyleLink.href = "contentarea-style-v.css";
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleIsVertOrHoriz();
    }
});


console.log(localStorage.getItem("isVertOrHoriz"));