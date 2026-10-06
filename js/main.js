import { projects } from "./data/projects.js";
import { initNavigation } from "./components/navigation.js";
import { initWindows } from "./components/windows.js";
import { initModal } from "./components/modal.js";
import { initGlitch } from "./effects/glitch.js";
import { initCRT } from "./effects/crt.js";
import { initTransitions } from "./effects/transitions.js";
import { initAudio, playSound } from "./audio/audio.js";
import { technologies } from "./data/technologies.js";

/* PROJETOS */

let currentProjectPage = 0;
const projectsPerPage = 3;

function renderProjects() {
    const container = document.querySelector(".projects");

    if (!container) {
        return;
    }

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    if (currentProjectPage >= totalPages) {
        currentProjectPage = totalPages - 1;
    }

    const start = currentProjectPage * projectsPerPage;
    const visibleProjects = projects.slice(
        start,
        start + projectsPerPage
    );

    container.innerHTML = `
        <div class="projects__grid">
            ${visibleProjects.map(project => `
                <article class="project-card">
                    <span class="project-card__number">
                        ${project.number}
                    </span>

                    <div class="project-card__content">
                        <span class="project-card__category">
                            ${project.category}
                        </span>

                        <h3 class="project-card__title">
                            ${project.title}
                        </h3>

                        <p class="project-card__description">
                            ${project.description}
                        </p>

                        <div class="project-card__technologies">
                            ${project.technologies.map(technology => `
                                <span>${technology}</span>
                            `).join("")}
                        </div>
                    </div>

                    <div class="project-card__preview">
                        <div class="project-card__files">
                            ${project.images.length
                                ? project.images.slice(0, 3).map((image, index) => `
                                    <div class="project-card__file project-card__file--${index + 1}">
                                        <img src="${image}" alt="${project.title} — imagem ${index + 1}">
                                        <span>IMG_${String(index + 1).padStart(2, "0")}</span>
                                    </div>
                                `).join("")
                                : `
                                    <div class="project-card__empty">
                                        NO PREVIEW
                                    </div>
                                `
                            }
                        </div>
                    </div>
                        <div class="project-card__actions">
                            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-card__button">
                                [ GITHUB ↗ ]
                            </a>
                            <a href="${project.preview}" target="_blank" rel="noopener noreferrer" class="project-card__button project-card__button--primary">
                                [ ABRIR PROJETO → ]
                            </a>
                        </div>
                </article>
            `).join("")}
        </div>

        ${
            projects.length > projectsPerPage
                ? `
                    <div class="projects__pagination">

                        <button
                            type="button"
                            class="projects__prev tech-text"
                            ${currentProjectPage === 0 ? "disabled" : ""}
                        >
                            ← PREV
                        </button>

                        <span class="projects__counter tech-text">
                            ${String(currentProjectPage + 1).padStart(2, "0")}
                            /
                            ${String(totalPages).padStart(2, "0")}
                        </span>

                        <button
                            type="button"
                            class="projects__next tech-text"
                            ${currentProjectPage === totalPages - 1 ? "disabled" : ""}
                        >
                            NEXT →
                        </button>

                    </div>
                `
                : ""
        }
    `;

    const previous = container.querySelector(".projects__prev");
    const next = container.querySelector(".projects__next");

    previous?.addEventListener("click", () => {
        if (currentProjectPage > 0) {
            currentProjectPage--;
            renderProjects();
        }
    });

    next?.addEventListener("click", () => {
        if (currentProjectPage < totalPages - 1) {
            currentProjectPage++;
            renderProjects();
        }
    });
}

function initProjectPreviews() {
    document.querySelectorAll(".project-card__files").forEach(files => {
        const project = files.closest(".project-card");
        const number = project.querySelector(".project-card__number")?.textContent.trim();
        const data = projects.find(item => item.number === number);

        if (!data || data.images.length < 2) {
            return;
        }

        let current = 0;

        function render() {
            const images = data.images;
            const total = images.length;

            const positions = [
                (current - 1 + total) % total,
                current,
                (current + 1) % total
            ];

            files.innerHTML = positions.map((imageIndex, position) => `
                <div class="project-card__file project-card__file--${position + 1}">
                    <img src="${images[imageIndex]}" alt="${data.title} — imagem ${imageIndex + 1}">
                    <span>IMG_${String(imageIndex + 1).padStart(2, "0")}</span>
                </div>
            `).join("");
        }

        render();

        setInterval(() => {
            files.classList.add("is-changing");

            setTimeout(() => {
                current = (current + 1) % data.images.length;
                render();

                requestAnimationFrame(() => {
                    files.classList.remove("is-changing");
                });
            }, 700);
        }, 4500);
    });
}


// Tecnologias
function renderTechnologies() {
    const container = document.querySelector(".about__technology-grid");

    if (!container) {
        return;
    }

    container.innerHTML = technologies.map((technology, index) => `
        <div class="about__technology">

            <div class="about__technology-icon">
                <img
                    src="./assets/icons/${technology.icon}"
                    alt="${technology.name}"
                >
            </div>

            <div class="about__technology-info">
                <span>${technology.name}</span>
                <small>${technology.category}</small>
            </div>
        </div>
    `).join("");
}

function initTerminalCursor() {
    document.querySelectorAll(".contact__field input, .contact__field textarea").forEach(input => {
        const cursor = document.createElement("span");
        cursor.className = "terminal-cursor";
        input.parentElement.appendChild(cursor);

            const update = () => {
                if (document.activeElement !== input) {
                    cursor.style.display = "none";
                    return;
                }
                
                const style = getComputedStyle(input);
                const text = input.value.substring(0, input.selectionStart);
                
                const mirror = document.createElement("span");
                
                mirror.style.cssText = `
                    position:absolute;
                    visibility:hidden;
                    white-space:pre;
                    font:${style.font};
                    letter-spacing:${style.letterSpacing};
                `;
                
                mirror.textContent = text || "";
                input.parentElement.appendChild(mirror);
                
                const paddingLeft = parseFloat(style.paddingLeft);
                const paddingTop = parseFloat(style.paddingTop);
                const lineHeight = parseFloat(style.lineHeight);
                
                cursor.style.left = `${input.offsetLeft + paddingLeft + mirror.offsetWidth}px`;
                cursor.style.top = `${input.offsetTop + paddingTop + (lineHeight - cursor.offsetHeight) / 2}px`;
                cursor.style.display = "block";
                
                mirror.remove();
            };

        input.addEventListener("focus", update);
        input.addEventListener("blur", update);
        input.addEventListener("input", update);
        input.addEventListener("keyup", update);
        input.addEventListener("click", update);
    });
}

/* Initialization */

function init() {
    renderProjects();
    initProjectPreviews();
    renderTechnologies();
    initTerminalCursor();
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