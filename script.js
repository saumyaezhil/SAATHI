const exercises = {
    ex1: { name: 'Rowing', video: 'https://www.youtube.com/embed/DHA7QGDa2qg', requiresWeights: true },
    ex2: { name: 'Chest Press', video: 'https://www.youtube.com/embed/dTe9CB9Zous', requiresWeights: true },
    ex3: { name: 'Bicep Curls', video: 'https://www.youtube.com/embed/JOib_oyosu0', requiresWeights: true },
    ex4: { name: 'Triceps', video: 'https://www.youtube.com/embed/f59wGKbXZ0w', requiresWeights: true },
    ex5: { name: 'Shoulder Press', video: 'https://www.youtube.com/embed/WvLMauqrnK8', requiresWeights: true },
    ex6: { name: 'Lateral Raises', video: 'https://www.youtube.com/embed/1AmmsXlf8#0056b3MUI', requiresWeights: true },
    ex7: { name: 'Chest Flies', video: 'https://www.youtube.com/embed/tGXIQR89-JE', requiresWeights: true },
    ex8: { name: 'Reverse Flies', video: 'https://www.youtube.com/embed/vJYkqD7a0gM', requiresWeights: true },
    ex9: { name: 'Lat pull down', video: 'https://www.youtube.com/embed/dhJ7QJPvqqU', requiresWeights: true },
    ex10: { name: 'Leg side raises', video: 'https://www.youtube.com/embed/8Dh6KIJQMeI', requiresWeights: true },
    ex11: { name: 'Leg Press', video: 'https://www.youtube.com/embed/-4Tm7aP-uI0', requiresWeights: true }
};

let selectedWeight = 5;
let currentExercise;
let exerciseLog = [];
let countdownInterval;

document.getElementById('personalize-form').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('personalization').style.display = 'none';
    document.getElementById('select-exercise').style.display = 'block';
});

document.getElementById('next-to-weight').addEventListener('click', function () {
    const focus = document.getElementById('focus').value;
    currentExercise = exercises[focus];

    document.getElementById('exercise-name').textContent = currentExercise.name;
    document.getElementById('weights').style.display = currentExercise.requiresWeights ? 'block' : 'none';

    document.getElementById('select-exercise').style.display = 'none';
    document.getElementById('exercise').style.display = 'block';
});

document.getElementById('weights').addEventListener('input', function () {
    selectedWeight = this.value;
    document.getElementById('selected-weight').textContent = selectedWeight;
});

document.getElementById('watch-video').addEventListener('click', function () {
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('video-frame').src = currentExercise.video;
    document.getElementById('video-page').style.display = 'block';
});

document.getElementById('skip-video').addEventListener('click', function () {
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('posture-correction').style.display = 'block';
});

document.getElementById('continue-video').addEventListener('click', function () {
    document.getElementById('video-page').style.display = 'none';
    document.getElementById('posture-correction').style.display = 'block';
});

document.getElementById('skip-camera').addEventListener('click', function () {
    document.getElementById('posture-correction').style.display = 'none';
    startCountdown();
});

document.getElementById('enable-camera').addEventListener('click', function () {
    const video = document.getElementById('camera-feed');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            document.getElementById('camera-page').style.display = 'block';
            document.getElementById('posture-correction').style.display = 'none';
        })
        .catch(function (err) {
            console.error("Error accessing the camera: ", err);
        });
});

document.getElementById('continue-camera').addEventListener('click', function () {
    document.getElementById('camera-page').style.display = 'none';
    startCountdown();  // Proceed to the countdown page after camera use
});

// Countdown timer logic
function startCountdown() {
    let countdown = 10;
    const countdownElement = document.getElementById('countdown-timer');
    countdownElement.textContent = `Starting in ${countdown} seconds...`;
    document.getElementById('countdown-log').style.display = 'block';

    countdownInterval = setInterval(function () {
        countdown--;
        countdownElement.textContent = `Starting in ${countdown} seconds...`;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-log').style.display = 'none';
            document.getElementById('log-page').style.display = 'block';
            logExercise();
        }
    }, 1000);
}

document.getElementById('finish-workout-exercise').addEventListener('click', function () {
    document.getElementById('exercise').style.display = 'none';
    logExercise(); // Log the completed exercise
    document.getElementById('log-page').style.display = 'block';
});

function logExercise() {
    const logEntry = `${currentExercise.name}, Weight: ${selectedWeight} kg`;
    exerciseLog.push(logEntry);

    const logElement = document.getElementById('exercise-log');
    const logItem = document.createElement('li');
    logItem.textContent = logEntry;
    logElement.appendChild(logItem);
}

document.getElementById('do-another-exercise').addEventListener('click', function () {
    document.getElementById('log-page').style.display = 'none';
    document.getElementById('select-exercise').style.display = 'block';
});

document.getElementById('finish-workout-log').addEventListener('click', function () {
    document.getElementById('log-page').style.display = 'none';
    document.getElementById('finish-workout-page').style.display = 'block';
});

document.getElementById('finish').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to the first page
});

document.getElementById('rate').addEventListener('click', function () {
    document.getElementById('finish-workout-page').style.display = 'none';
    document.getElementById('feedback-section').style.display = 'block';
});

document.getElementById('rate-workout').addEventListener('click', function () {
    document.getElementById('workout-summary').style.display = 'none';
    document.getElementById('feedback-section').style.display = 'block';
});

document.getElementById('finish-workout-summary').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to the first page
});
