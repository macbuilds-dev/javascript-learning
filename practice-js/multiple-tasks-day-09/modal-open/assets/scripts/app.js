const OPEN_BTN  = document.getElementById('openModal');
const CLOSE_BTN = document.getElementById('closeModal');
const OVERLAY   = document.getElementById('overlay');

OPEN_BTN.addEventListener('click', () => {
    OVERLAY.style.display = 'flex';
});

CLOSE_BTN.addEventListener('click', () => {
    OVERLAY.style.display = 'none';
});

OVERLAY.addEventListener('click', (e) => {
    if (e.target === OVERLAY) {
        OVERLAY.style.display = 'none';
    }
});