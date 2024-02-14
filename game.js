var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gameStarted = false;

function playSound(name) {
    new Audio('./sounds/' + name + '.mp3').play()
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    randomButton = document.querySelector('#' + randomChosenColour);
    randomButton.classList.add('chosen');

    setTimeout(function() {
        randomButton.classList.remove('chosen');
    }, 500);

    document.querySelector('h1').textContent = 'Level ' + level;
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    console.log(gamePattern)
    console.log(userClickedPattern)
    console.log(gamePattern[currentLevel])
    console.log(userClickedPattern[currentLevel])

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound('wrong');
        document.querySelector('body').classList.add('game-over');
        document.querySelector('h1').textContent = 'Game Over, Press Any Key to Restart';
        startOver();
    }
    

}

for (var i = 0; i < buttonColours.length; i++) {
    document.querySelector('#' + buttonColours[i]).addEventListener('click', function() {
        var button = this
        userClickedPattern.push(button.id);
        playSound(button.id);
        button.classList.add('clicked');

        setTimeout(function() {
            button.classList.remove('clicked');
        }, 500);

        checkAnswer(userClickedPattern.length-1);
    })
}


function start() {
    if (gameStarted === false) {
        document.querySelector('h1').textContent = 'Level ' + level;
        document.querySelector('body').classList.remove('game-over');
        nextSequence();
        gameStarted = true
    }
}

document.addEventListener('keydown', start);
document.addEventListener('touchstart', start);