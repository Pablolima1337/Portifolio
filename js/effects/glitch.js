let glitchElements = [];

/* Glitch */

export function initGlitch() {
    glitchElements = document.querySelectorAll(
        "[data-glitch]"
    );
    if (!glitchElements.length) {
        return;
    }
    glitchElements.forEach(element => {
        element.addEventListener(
            "mouseenter",
            () => triggerGlitch(element)
        );
    });
}

/* Trigger */

function triggerGlitch(element) {
    if (element.classList.contains("is-glitching")) {
        return;
    }
    element.classList.add(
        "is-glitching"
    );
    setTimeout(() => {
        element.classList.remove(
            "is-glitching"
        );
    }, 200);
}

/* Manual */

export function triggerElementGlitch(
    element
) {
    if (!element) {
        return;
    }
    triggerGlitch(element);
}