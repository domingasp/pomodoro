// Two <span> elements which display the timer state to the user
var countdownLabel = document.getElementById("pomodoroCountdownLabelID");
var countdownDisplay = document.getElementById("pomodoroCountdownID");

// Variabes to keep track of the state of the timer
var pomodoroPeriod = true;
var pomodoroNumber = 1;
var timer = {
    minute : 25,
    second : 0
};

// Interval set on startPomodoro function call. Set to a variable to enable clearing of the interval
var interval;

// Starts the timer
function startPomodoro(startButton) {
    // Prevents multiple intervals being created by disabling the start button
    startButton.disabled = true;
    startButton.nextElementSibling.disabled = false;
    startButton.nextElementSibling.nextElementSibling.disabled = false;

    // Creates an interval which runs every 1 second.
    interval = setInterval(function() {
        // Decrements the minute and second depending on the current values
        if (timer.second == 0 && timer.minute > 0) {
            timer.second = 59;
            timer.minute -= 1;
        } else {
            timer.second -= 1;
        }

        // Adds leading zeroes to minutes and seconds if their value is less than 10
        if (timer.minute < 10) {
            countdownDisplay.innerHTML = "0" + timer.minute + ":";
        } else {
            countdownDisplay.innerHTML = timer.minute + ":";
        }

        if (timer.second < 10) {
            countdownDisplay.innerHTML += "0" + timer.second;
        } else {
            countdownDisplay.innerHTML += timer.second;
        }

        // Checks whether the pomodoro period is running, if not then that means it is a rest period
        if (pomodoroPeriod) {
            countdownLabel.innerHTML = "Pomodoro " + pomodoroNumber + ":";

            // If pomodoro is divisible by 4 and the latest pomodoro period has passed give a rest time of 20 minutes
            if (timer.minute == 0 && timer.second == 0 && pomodoroNumber %4 == 0) {
                timer.minute = 20;
                timer.second = 0;

                pomodoroPeriod = false;
            // If 4 pomodoros have not passed then rest time is only 5 minutes
            } else if (timer.minute == 0 && timer.second == 0) {
                timer.minute = 5;
                timer.second = 0;

                pomodoroPeriod = false;
            }
        } else {
            // Once rest period is over the timer should run for 25 minutes
            countdownLabel.innerHTML = "Rest " + pomodoroNumber + ":";
            if (timer.minute == 0 && timer.second == 0) {
                timer.minute = 25;
                timer.second = 0;

                pomodoroPeriod = true;
                pomodoroNumber += 1;
            }
        }

        
    }, 1000);
}

// Stops the timer and reset the current pomodoro minutes and seconds to default (25 minutes : 0 seconds)
function stopPomodoro(stopButton) {
    stopButton.disabled = true;
    stopButton.nextElementSibling.disabled = true;
    stopButton.previousElementSibling.disabled = false;

    // Clear the 1 second interval
    clearInterval(interval);

    // Reset the variables to the originals
    timer.minute = 25;
    timer.second = 0;
    pomodoroPeriod = true;

    countdownLabel.innerHTML = "Pomodoro " + pomodoroNumber + ":";
    countdownDisplay.innerHTML = timer.minute + ":" + "0" + timer.second;
}

// Pauses the timer but DOES NOT reset the current pomodoro minutes and seconds
function pausePomodoro(pauseButton) {
    pauseButton.disabled = true;
    pauseButton.previousElementSibling.disabled = false;
    pauseButton.previousElementSibling.previousElementSibling.disabled = false;

    // Clear the 1 second interval
    clearInterval(interval);
}