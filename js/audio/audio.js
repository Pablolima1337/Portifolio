const sounds = {
    entrance: "./assets/audio/retro-computer.mp3",
    loading: "./assets/audio/loading.mp3",
    click: "./assets/audio/ui-click.mp3",
    hover: "./assets/audio/ui-hover.mp3",
    open: "./assets/audio/ui-open.mp3"
};

let audioEnabled = true;


/* Audio */

export function initAudio() {
    if (!audioEnabled) {
        return;
    }
    setupAudioElements();
    setupAudioEvents();
    playSound("entrance");
}


/* Setup */

function setupAudioElements() {
    Object.entries(sounds).forEach(
        ([name, source]) => {
            const audio = new Audio(source);
            audio.preload = "auto";
            sounds[name] = audio;
        }
    );
}


/* Events */

function setupAudioEvents() {

    document.addEventListener(
        "click",
        event => {
            const target = event.target.closest(
                "button, a"
            );
            if (!target) {
                return;
            }
            playSound("click");
        }
    );

    document.addEventListener(
        "mouseover",
        event => {
            const target = event.target.closest(
                "button, a"
            );
            if (!target) {
                return;
            }
            playSound("hover");
        }
    );
}

/* Play */

export function playSound(name) {
    if (!audioEnabled) {
        return;
    }
    const audio = sounds[name];
    if (!(audio instanceof Audio)) {
        return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

/* Enable */

export function enableAudio() {
    audioEnabled = true;
}
/* Disable */

export function disableAudio() {
    audioEnabled = false;
}

/* Toggle */

export function toggleAudio() {
    audioEnabled = !audioEnabled;
}