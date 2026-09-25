let activeModal = null;

/* Modal */

export function initModal() {
    const triggers = document.querySelectorAll(
        "[data-modal-open]"
    );
    triggers.forEach(trigger => {
        trigger.addEventListener(
            "click",
            handleOpen
        );
    });
    document.addEventListener(
        "click",
        handleOutsideClick
    );
    document.addEventListener(
        "keydown",
        handleKeyboard
    );
}


/* Open */

function handleOpen(event) {
    const trigger = event.currentTarget;
    const modalId = trigger.dataset.modalOpen;
    if (!modalId) {
        return;
    }
    openModal(modalId);
}


/* Open modal */

function openModal(modalId) {
    const modal = document.querySelector(
        `[data-modal="${modalId}"]`
    );
    if (!modal) {
        return;
    }
    activeModal = modal;
    modal.classList.add("is-open");
    document.body.classList.add(
        "modal-open"
    );
}


/* Close */

function closeModal() {
    if (!activeModal) {
        return;
    }
    activeModal.classList.remove(
        "is-open"
    );
    document.body.classList.remove(
        "modal-open"
    );
    activeModal = null;
}


/* Outside click */

function handleOutsideClick(event) {
    if (!activeModal) {
        return;
    }
    if (
        event.target === activeModal ||
        event.target.closest("[data-modal-close]")
    ) {
        closeModal();
    }
}

/* Keyboard */

function handleKeyboard(event) {
    if (event.key !== "Escape") {
        return;
    }
    closeModal();
}