const DISPLAY   = document.getElementById('timer');
const START_BTN = document.getElementById('startBtn');
const STOP_BTN  = document.getElementById('stopBtn');
const RESET_BTN = document.getElementById('resetBtn');

let timer;
let seconds = 0;
let isRunning = false;

function formatTime(secs) {
    const HH = String(Math.floor(secs / 3600)).padStart(2, '0');
    const MM = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const SS = String(secs % 60).padStart(2, '0');
    console.log(`${HH}:${MM}:${SS}`);
    return `${HH}:${MM}:${SS}`;
}

function startTimer() {
    if (isRunning){
        return;
    }
    isRunning = true;
    timer = setInterval(() => {
        seconds++;
        DISPLAY.textContent = formatTime(seconds);
        console.log('Time Seconds:', seconds);
    }, 1000);

    START_BTN.disabled = true;
    STOP_BTN.disabled = false;
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    START_BTN.disabled = false;
    STOP_BTN.disabled = true;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    DISPLAY.textContent = formatTime(seconds);
    console.log('Timer reset', DISPLAY.textContent);
    START_BTN.disabled = false;
    STOP_BTN.disabled = true;
}

START_BTN.addEventListener('click', startTimer);
STOP_BTN.addEventListener('click', stopTimer);
RESET_BTN.addEventListener('click', resetTimer);