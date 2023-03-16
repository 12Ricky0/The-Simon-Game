var buttomColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];

var start = false

var level = 0;

$(document).keydown(function (event) {
    if (!start) {
        $("h1").html("Level " + level)

        nextSequence();
        start = true

    }
})


$(".btn").click(function (event) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success!");
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000)

        }

    }

    else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").html("Game Over, Press Any Key to Restart")
        console.log("wrong")

        startOver();
    }
}



function nextSequence() {

    userClickedPattern = [];


    level++;

    $("h1").html("Level " + level)


    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttomColors[randomNumber]

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor)

}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];

}





