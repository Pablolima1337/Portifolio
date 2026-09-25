/* Navigation */

export function initNavigation() {
    const links = document.querySelectorAll(
        ".navigation a"
    );
    if (!links.length) {
        return;
    }
    links.forEach(link => {
        link.addEventListener("click", handleNavigation);
    });
}


/* Navigation click */

function handleNavigation(event) {
    const link = event.currentTarget;
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) {
        return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
        return;
    }

    event.preventDefault();
    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
    setActiveLink(link);
}


/* Active link */

function setActiveLink(activeLink) {
    const links = document.querySelectorAll(
        ".navigation a"
    );
    links.forEach(link => {
        link.classList.remove("is-active");
    });
    activeLink.classList.add("is-active");
}