let windows = [];


/* Windows */

export function initWindows() {
    windows = document.querySelectorAll(
        "[data-window]"
    );
    if (!windows.length) {
        return;
    }
    windows.forEach(windowElement => {
        setupWindow(windowElement);
    });
}
/* Setup */

function setupWindow(windowElement) {
    windowElement.addEventListener(
        "mousedown",
        () => {
            focusWindow(windowElement);
        }
    );
}

/* Focus */

function focusWindow(windowElement) {
    windows.forEach(element => {
        element.classList.remove("is-focused");
    });
    windowElement.classList.add("is-focused");
}