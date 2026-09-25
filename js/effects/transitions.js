let isTransitioning = false;

/* Transitions */

export function initTransitions() {
    document.body.classList.add(
        "page-ready"
    );
}

/* Start */

export function startTransition() {
    if (isTransitioning) {
        return;
    }
    isTransitioning = true;
    document.body.classList.add(
        "page-transition"
    );
}

/* End */

export function endTransition() {
    if (!isTransitioning) {
        return;
    }
    document.body.classList.remove(
        "page-transition"
    );
    isTransitioning = false;
}