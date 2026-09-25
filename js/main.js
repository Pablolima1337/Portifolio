import { projects } from "./data/projects.js";
import { initNavigation } from "./components/navigation.js";
import { initWindows } from "./components/windows.js";
import { initModal } from "./components/modal.js";
import { initGlitch } from "./effects/glitch.js";
import { initCRT } from "./effects/crt.js";
import { initTransitions } from "./effects/transitions.js";
import { initAudio, playSound } from "./audio/audio.js";

/* Projects */

function renderProjects() {
    const container = document.querySelector(".projects");
    if (!container) {
        return;
    }

    container.innerHTML = projects.map(project => {
        return `
            <article class="project-card">
                <span class="project-card__number">
                    ${project.number}
                </span>
                <h3 class="project-card__title">
                    ${project.title}
                </h3>
                <p class="project-card__description">
                    ${project.description}
                </p>
            </article>
        `;
    }).join("");
}


/* Initialization */

function init() {
    renderProjects();
    initNavigation();
    initWindows();
    initModal();
    initGlitch();
    initCRT();
    initTransitions();
    initAudio();
    initEntry();
}

/* Entry */

function initEntry() {
    const entryScreen = document.querySelector(
        "#entry-screen"
    );
    const loadingScreen = document.querySelector(
        "#loading-screen"
    );
    const button = document.querySelector(
        "#entry-button"
    );
    const progress = document.querySelector(
        ".loading-bar__progress"
    );
    const app = document.querySelector(
        "#app"
    );
    if (
        !entryScreen ||
        !loadingScreen ||
        !button ||
        !progress ||
        !app
    ) {
        return;
    }

    button.addEventListener(
        "click",
        async () => {
            entryScreen.classList.add(
                "is-hidden"
            );
            loadingScreen.classList.add(
                "is-active"
            );
            playSound("loading");
            requestAnimationFrame(() => {
                progress.style.width = "100%";
            });
            setTimeout(async () => {
                playSound("entrance");
                loadingScreen.classList.add(
                    "is-complete"
                );
                app.classList.remove(
                    "app-hidden"
                );
            }, 4000);
        },
        { once: true }
    );
}
/* Start */

document.addEventListener(
    "DOMContentLoaded", init
);