let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesElement = document.getElementById('lapTimes');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLapTime);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - elapsedTime;
        updateButtons();
        updateUI();
        setInterval(updateStopwatch, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(updateStopwatch);
        updateButtons();
    }
}

function resetStopwatch() {
    isRunning = false;
    elapsedTime = 0;
    lapTimes = [];
    clearInterval(updateStopwatch);
    updateButtons();
    updateUI();
    updateLapTimes();
}

function recordLapTime() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        lapTimes.push(formatTime(lapTime));
        updateLapTimes();
    }
}

function moveBorder() {
    movingDot.style.transform = `rotate(${elapsedTime / 100}deg)`;
}

function updateStopwatch() {
    if (isRunning) {
        elapsedTime = new Date().getTime() - startTime;
        updateUI();
    }
}

function updateUI() {
    display.innerText = formatTime(elapsedTime);
}

function updateLapTimes() {
    lapTimesElement.innerHTML = "<h2>Lap Times</h2>";
    lapTimes.forEach((lap, index) => {
        const lapTimeElement = document.createElement('p');
        lapTimeElement.innerText = `Lap ${index + 1}: ${lap}`;
        lapTimesElement.appendChild(lapTimeElement);
    });
}

function updateButtons() {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
    lapBtn.disabled = !isRunning;
}

function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0')
    );
}
