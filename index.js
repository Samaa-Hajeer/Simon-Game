
var level = 0;
var seqColor = [];
var seqPlayer = [];
var started = false;
var indexOfSeqColor = 0;

$(document).keydown(function (event) {
    if (!started) {
        started = true;
        startGame();

    }
});


function startGame() {
    seqPlayer = [];
level++;
$("#level-title").text("Level " + level);
    var selectedColor = randomColor();
    seqColor.push(selectedColor);
    update(selectedColor);

}

function randomColor() {
    var selectedNumber = Math.floor((Math.random() * 4)) + 1;
    var selectedColor = "";
    switch (selectedNumber) {

        case 1:
            selectedColor = "green"
            break;
        case 2:
            selectedColor = "red"
            break;
        case 3:
            selectedColor = "yellow"
            break;
        case 4:
            selectedColor = "blue"
            break;
    }

    return selectedColor;

}

$(".btn").click(function () {
    pressedColor = $(this).attr("id");
    seqPlayer.push(pressedColor);
    update(pressedColor);
    checkColors(seqPlayer.length - 1);
});


function update(selectedColor) {
    var audioName = "sounds/" + selectedColor + ".mp3";
    var sound = new Audio(audioName);
    sound.play();
    $("#" + selectedColor).addClass("pressed");
    setTimeout(function () {
        $("#" + selectedColor).removeClass("pressed");
    }, 100)
}

function gameOver() {
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100)
    started = false;
    seqColor = [];
    level = 0;
}

function checkColors(pressedColor) {

    if (seqPlayer[pressedColor] === seqColor[pressedColor]) {
        if (seqPlayer.length == seqColor.length) {
            setTimeout(function () {
                startGame();
            }, 1000);
        }

    }
    else {
        gameOver();
    }
}
