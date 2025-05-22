const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const stopButton = document.getElementById('stop');
const secondsSphere = document.getElementById('seconds-sphere');

let stopwatchInterval;
let runningTime = 0;

function playPause() {
  const isRunning = playPauseButton.classList.contains('running');

  if (isRunning) {
    pause();
  } else {
    start();
  }

  playPauseButton.classList.toggle('running');
  playPauseButton.classList.toggle('paused');
}

function start() {
  const startTime = Date.now() - runningTime;
  secondsSphere.style.animationPlayState = 'running';

  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    stopwatch.textContent = formatTime(runningTime);
  }, 1000);
}

function pause() {
  clearInterval(stopwatchInterval);
  secondsSphere.style.animationPlayState = 'paused';
}

function reset() {
  clearInterval(stopwatchInterval);
  runningTime = 0;
  stopwatch.textContent = '00:00';
  secondsSphere.style.animation = 'none'; // Reset animation
  void secondsSphere.offsetWidth; // Trigger reflow
  secondsSphere.style.animation = 'rotacion 60s linear infinite';
  secondsSphere.style.animationPlayState = 'paused';

  playPauseButton.classList.remove('running');
  playPauseButton.classList.add('paused');
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Event listeners
playPauseButton.addEventListener('click', playPause);
stopButton.addEventListener('click', reset);
