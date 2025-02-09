var userClickedPattern = [];
var randomPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

// Handle button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (randomPattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === randomPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add('game-over');
        setTimeout(() => {
            document.body.classList.remove('game-over');
        }, 200);
        document.getElementById('level-title').textContent = "Game Over, Press Any Key to Restart";
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById('level-title').textContent = "Level " + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    randomPattern.push(randomChosenColor);

    var button = document.getElementById(randomChosenColor);
    // Create flash animation
    button.animate([
        { opacity: 1, offset: 0 },
        { opacity: 1, offset: 0.33 },
        { opacity: 0, offset: 0.66 },
        { opacity: 1, offset: 1 }
    ], { duration: 300, easing: 'linear' });
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    var button = document.getElementById(currentColour);
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}

// Start game
document.addEventListener('keypress', function() {
    if (!started) {
        document.getElementById('level-title').textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

function startOver() {
    level = 0;
    randomPattern = [];
    started = false;
}