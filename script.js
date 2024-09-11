// Affirmation data
const affirmations = {
    energetic: "You're full of energy today! Let's make the most of it!",
    tired: "You’ve got this, even on tired days! Let's get moving!",
    sore: "A little soreness means progress. Let’s stretch and strengthen!"
};

/// Exercises Data
 exercises = {
    'bicep': { name: 'Bicep Curls', video: 'https://www.youtube.com/embed/VIDEO_ID_FOR_BICEP_CURLS', requiresWeights: true },
    'tricep': { name: 'Tricep Throwback', video: 'https://www.youtube.com/embed/VIDEO_ID_FOR_TRICEP_THROWBACK', requiresWeights: true },
    'rowing': { name: 'Rowing', video: 'https://www.youtube.com/embed/VIDEO_ID_FOR_ROWING', requiresWeights: true },
    'chest': { name: 'Chest Press', video: 'https://www.youtube.com/embed/VIDEO_ID_FOR_CHEST_PRESS', requiresWeights: true },
    'lateral-raises': { name: 'Lateral Raises', video: 'https://www.youtube.com/embed/VIDEO_ID_FOR_LATERAL_RAISES', requiresWeights: true }
};


// Declare currentExercise only once outside
let currentExercise;
let selectedWeight;
let countdownInterval;
const exerciseLog = [];

// Handle form submission
document.getElementById('personalize-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const focus = document.getElementById('focus').value;
    currentExercise = exercises[focus];  // No need to redeclare here, just assign it

    // Update the exercise name and video
    document.getElementById('exercise-name').textContent = currentExercise.name;
    document.getElementById('weights').style.display = currentExercise.requiresWeights ? 'block' : 'none';

    document.getElementById('personalization').style.display = 'none';
    document.getElementById('exercise').style.display = 'block';
});


// Update weight display
document.getElementById('weights').addEventListener('input', function () {
    selectedWeight = this.value;
    document.getElementById('selected-weight').textContent = selectedWeight;
});

// Handle Watch Video or Skip
document.getElementById('watch-video').addEventListener('click', function () {
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('video-frame').src = currentExercise.video;
    document.getElementById('video-page').style.display = 'block';
});

document.getElementById('skip-video').addEventListener('click', function () {
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('posture-correction').style.display = 'block';
});

// Handle video continue
document.getElementById('continue-video').addEventListener('click', function () {
    document.getElementById('video-page').style.display = 'none';
    document.getElementById('posture-correction').style.display = 'block';
});

// Handle posture correction skip
document.getElementById('skip-camera').addEventListener('click', function () {
    document.getElementById('posture-correction').style.display = 'none';
    document.getElementById('personalization').style.display = 'block'; // Go back to start
});

// Handle camera enable
document.getElementById('enable-camera').addEventListener('click', function () {
    document.getElementById('posture-correction').style.display = 'none';
    document.getElementById('camera-page').style.display = 'block';
    startCamera();
});

// Handle camera continue
document.getElementById('continue-camera').addEventListener('click', function () {
    document.getElementById('camera-page').style.display = 'none';
    stopCamera();
    startCountdown();
});

// Handle posture correction skip
document.getElementById('skip-camera').addEventListener('click', function () {
    document.getElementById('posture-correction').style.display = 'none';
    startCountdown();
});

// Start camera
function startCamera() {
    const video = document.getElementById('camera-feed');
    const countdownElement = document.getElementById('camera-countdown');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            let countdown = 10;
            countdownElement.textContent = `Posture correction in: ${countdown} seconds`;
            countdownInterval = setInterval(() => {
                countdownElement.textContent = `Posture correction in: ${countdown--} seconds`;
                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    countdownElement.textContent = 'Posture correction complete.';
                }
            }, 1000);
        })
        .catch(error => console.error('Error accessing camera:', error));
}

// Stop camera
function stopCamera() {
    const video = document.getElementById('camera-feed');
    const stream = video.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    video.srcObject = null;
}

// Start countdown
function startCountdown() {
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('countdown-log').style.display = 'block';
    let countdown = 10;
    const countdownElement = document.getElementById('countdown-timer');
    countdownElement.textContent = `Exercise starts in: ${countdown} seconds`;
    const countdownInterval = setInterval(() => {
        countdownElement.textContent = `Exercise starts in: ${countdown--} seconds`;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'Start Exercise!';
            document.getElementById('done-exercise').style.display = 'block';
        }
    }, 1000);
}

// Handle "Done" button
document.getElementById('done-exercise').addEventListener('click', function () {
    exerciseLog.push({ exercise: currentExercise.name, weight: selectedWeight });
    document.getElementById('countdown-log').style.display = 'none';
    document.getElementById('exercise').style.display = 'block';
});

// Update exercise log page
function updateLogPage() {
    const logList = document.getElementById('exercise-log');
    logList.innerHTML = '';
    exerciseLog.forEach(log => {
        const listItem = document.createElement('li');
        listItem.textContent = `${log.exercise}: ${log.weight} kg`;
        logList.appendChild(listItem);
    });
}

// Handle "Do Another Exercise" button
document.getElementById('do-another-exercise').addEventListener('click', function () {
    document.getElementById('log-page').style.display = 'none';
    document.getElementById('personalization').style.display = 'block'; // Go back to start
});

// Handle "Finish Workout" button on the log page
document.getElementById('finish-workout-log').addEventListener('click', function () {
    document.getElementById('log-page').style.display = 'none';
    document.getElementById('workout-summary').style.display = 'block';
    updateSummaryPage();
});

// Handle "Finish Workout" button on the exercise page
document.getElementById('finish-workout-exercise').addEventListener('click', function () {
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('log-page').style.display = 'block';
    updateLogPage();
});

// Update workout summary page
function updateSummaryPage() {
    const summaryList = document.getElementById('summary-log');
    summaryList.innerHTML = '';
    exerciseLog.forEach(log => {
        const listItem = document.createElement('li');
        listItem.textContent = `${log.exercise}: ${log.weight} kg`;
        summaryList.appendChild(listItem);
    });
}
