let isTransitioning = false;

const hero = document.querySelector("#home");
const about = document.querySelector("#about");

/* Transitions */

export function initTransitions() {
    document.body.classList.add("page-ready");
    if (!hero || !about) {
        return;
    }
    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );
    handleScroll();
}

/* Scroll */

function handleScroll() {
    if (!hero || !about) {
        return;
    }
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const progress = Math.min(
        Math.max(
            scrollY / viewportHeight,
            0
        ),
        1
    );
    hero.style.setProperty(
        "--scroll-progress",
        progress
    );
    about.style.setProperty(
        "--scroll-progress",
        progress
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