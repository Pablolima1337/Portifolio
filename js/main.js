import { projects } from "./data/projects.js";
import { initNavigation } from "./components/navigation.js";
import { initWindows } from "./components/windows.js";
import { initModal } from "./components/modal.js";
import { initGlitch } from "./effects/glitch.js";
import { initCRT } from "./effects/crt.js";
import { initTransitions } from "./effects/transitions.js";
import { initAudio, playSound } from "./audio/audio.js";

/* PROJETOS */

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


//Funçõo de carregamento da barra de loading baseada em tempo e porcentagem de acordo com o audio
// Analisado por IA
function runLoading(progress, loadingPercent, loadingStatus) {
    const steps = [
        { time: 0, percent: 0, status: "INICIALIZANDO...", duration: 0 },
        { time: 300, percent: 8, status: "INICIALIZANDO...", duration: 300 },
        { time: 550, percent: 15, status: "INICIALIZANDO...", duration: 250 },
        { time: 750, percent: 20, status: "PROCESSANDO...", duration: 200 },
        { time: 1000, percent: 32, status: "PROCESSANDO...", duration: 250 },
        { time: 1300, percent: 38, status: "PROCESSANDO...", duration: 300 },
        { time: 1800, percent: 38, status: "PROCESSANDO...", duration: 0 },
        { time: 2200, percent: 38, status: "PROCESSANDO...", duration: 0 },
        { time: 2300, percent: 55, status: "POLINDO...", duration: 250 },
        { time: 2600, percent: 68, status: "POLINDO...", duration: 300 },
        { time: 2900, percent: 76, status: "POLINDO...", duration: 250 },
        { time: 3200, percent: 82, status: "POLINDO...", duration: 250 },
        { time: 3500, percent: 82, status: "FINALIZANDO...", duration: 0 },
        { time: 3800, percent: 94, status: "FINALIZANDO...", duration: 300 },
        { time: 4000, percent: 100, status: "PREPARANDO", duration: 300 }
    ];
    steps.forEach(step => {
        setTimeout(() => {
            progress.style.transition =
                `width ${step.duration}ms ease-out`;

            progress.style.width = `${step.percent}%`;
            loadingPercent.textContent =
                `${step.percent}%`;
            loadingStatus.textContent =
                step.status;
        }, step.time);
    });
}

/* Entry */

function initEntry() {
    const audioNotice = document.querySelector("#audio-notice");
    const loadingScreen = document.querySelector("#loading-screen");
    const button = document.querySelector("#audio-continue");
    const progress = document.querySelector(".loading-bar__progress");
    const loadingStatus = document.querySelector("#loading-status");
    const loadingPercent = document.querySelector("#loading-percent");
    const app = document.querySelector("#app");

    if (!audioNotice || !loadingScreen || !button || !progress ||!loadingStatus ||!loadingPercent || !app) {
        return;
    }

    button.addEventListener("click", () => {
        /* Esconde o aviso */
        audioNotice.classList.add("is-hidden");

        /* Mostra o loading */
        loadingScreen.classList.add("is-active");

        /* Toca o loading */
        playSound("loading");

        /* Inicia a barra */
        runLoading(
            progress,
            loadingPercent,
            loadingStatus
        );

        /* Termina o loading */
        setTimeout(() => {
            loadingScreen.classList.add("is-complete");
            /* Toca o som de entrada */
            playSound("entrance");
            /* Mostra a Home */
            app.classList.remove("app-hidden");
        }, 5100);
    }, { once: true });
}

function updateLoading(progress, percentText, percent) {
    progress.style.width = `${percent}%`;
    percentText.textContent = `${percent}%`;
}
/* Start */

document.addEventListener("DOMContentLoaded", init);