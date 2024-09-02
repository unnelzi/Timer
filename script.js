const hours = document.getElementById("timer-hours");
const minutes = document.getElementById("timer-minutes");
const seconds = document.getElementById("timer-seconds");
const startPauseButton = document.getElementById("start-pause-timer");
const resetButton = document.getElementById("reset-timer");
const incrementHours = document.getElementById("increment-hours");
const incrementMinutes = document.getElementById("increment-minutes");
const incrementSeconds = document.getElementById("increment-seconds");
const decrementHours = document.getElementById("decrement-hours");
const decrementMinutes = document.getElementById("decrement-minutes");
const decrementSeconds = document.getElementById("decrement-seconds");
const progressBar = document.getElementById("progress-bar");
const currentTimeElement = document.getElementById("current-time");

let intervalId;
let remainingTime = 60; // Default to 60 seconds
let isRunning = false;
let initialRemainingTime = remainingTime; // Store the initial time

function startPauseTimer() {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  clearInterval(intervalId);

  if (remainingTime > 0) {
    intervalId = setInterval(updateTimer, 1000);
    startPauseButton.textContent = "Pause";
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  startPauseButton.textContent = "Start";
  isRunning = false;
}

function resetTimer() {
  clearInterval(intervalId);
  remainingTime = initialRemainingTime; // Reset to the initial time
  updateTimer(); // Update the display immediately
  startPauseButton.textContent = "Start";
  isRunning = false;
}

function updateTimer() {
  // Always update the display, even if remainingTime is negative
  const hoursLeft = Math.floor(remainingTime / 3600);
  const minutesLeft = Math.floor((remainingTime % 3600) / 60);
  const secondsLeft = Math.floor(remainingTime % 60);

  hours.textContent = hoursLeft.toString().padStart(2, "0");
  minutes.textContent = minutesLeft.toString().padStart(2, "0");
  seconds.textContent = secondsLeft.toString().padStart(2, "0");

  // Update progress bar width
  const progress = (remainingTime / initialRemainingTime) * 100;
  progressBar.style.width = `${progress}%`;

  if (isRunning) {
    remainingTime--;
  }

  // Reset progress bar when timer reaches 0
  if (remainingTime < 0) {
    clearInterval(intervalId);
    startPauseButton.textContent = "Start";
    isRunning = false;
    progressBar.style.width = "100%"; // Reset progress bar to full width
  }
}

function incrementTime(unit, amount) {
  if (!isRunning) {
    switch (unit) {
      case "hours":
        if (remainingTime * 3600 + amount <= 356400) {
          remainingTime += amount * 3600;
        }
        break;
      case "minutes":
        remainingTime += amount * 60;
        break;
      case "seconds":
        remainingTime += amount;
        break;
    }
    initialRemainingTime = remainingTime; // Update initial time
    updateTimer();
  }
}

function decrementTime(unit, amount) {
  if (!isRunning) {
    switch (unit) {
      case "hours":
        if (remainingTime > 3599) {
          remainingTime -= amount * 3600;
        }
        break;
      case "minutes":
        if (remainingTime > 59) {
          remainingTime -= amount * 60;
        }
        break;
      case "seconds":
        if (remainingTime > 0) {
          remainingTime -= amount;
        }
        break;
    }
    initialRemainingTime = remainingTime; // Update initial time
    updateTimer();
  }
}

function updateCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

incrementHours.addEventListener("click", () => incrementTime("hours", 1));
incrementMinutes.addEventListener("click", () => incrementTime("minutes", 1));
incrementSeconds.addEventListener("click", () => incrementTime("seconds", 1));

decrementHours.addEventListener("click", () => decrementTime("hours", 1));
decrementMinutes.addEventListener("click", () => decrementTime("minutes", 1));
decrementSeconds.addEventListener("click", () => decrementTime("seconds", 1));

startPauseButton.addEventListener("click", startPauseTimer);
resetButton.addEventListener("click", resetTimer);

// Update current time every second
setInterval(updateCurrentTime, 1000);

updateTimer();
