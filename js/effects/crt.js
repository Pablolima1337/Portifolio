let crtEnabled = true;

/* CRT */

export function initCRT() {
    const scanlines = document.querySelector(
        ".crt-scanlines"
    );
    const noise = document.querySelector(
        ".crt-noise"
    );
    if (!scanlines || !noise) {
        return;
    }
    updateCRT();
}

/* Update */

function updateCRT() {
    document.body.classList.toggle(
        "crt-disabled",
        !crtEnabled
    );
}

/* Enable */

export function enableCRT() {
    crtEnabled = true;
    updateCRT();
}

/* Disable */

export function disableCRT() {
    crtEnabled = false;
    updateCRT();
}

/* Toggle */

export function toggleCRT() {
    crtEnabled = !crtEnabled;
    updateCRT();
}