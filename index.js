document.addEventListener("DOMContentLoaded", function () {
    // game colors
    let green  = "#2E9800",
        red    = "#D33232",
        yellow = "#E9C828",
        blue   = "#4843E3",

        greenSelected = "#00FF00",
        redSelected = "#FF6B6B",
        yellowSelected = "#FFFF8e",
        blueSelected = "#9B9BFF";

    let strictRed    = "#FF0000",
        powerOnGreen = "#00FF00";

    // sounds
    let greenSound  = new Audio("audio/greenSound.mp3"),
        redSound    = new Audio("audio/redSound.mp3"),
        yellowSound = new Audio("audio/yellowSound.mp3"),
        blueSound   = new Audio("audio/blueSound.mp3"),
        // and the best of all:
        errorSound  = new Audio("audio/errorSound.mp3");

    // setting buttons
    let powerButton  = document.getElementById("power"),
        strictButton = document.getElementById("strict_mode");

    let gameOn = false,
        strictMode = false,
        playerTurn = false;

    let streak = 0;
    let streakCount = document.getElementById("streak_count");

    powerButton.addEventListener("click", function() {
        if (gameOn) turnOff();
        else turnOn();
    });
    strictButton.addEventListener("click", function() {
        if (gameOn) {
            strictMode = !strictMode;
            strictButton.style.background = (strictMode) ? strictRed : "#292929";
        }
    });

    let simonSequence = [],
        playerSequence = [];

    let fields = document.getElementsByClassName("field");
    Array.prototype.forEach.call(fields, function(field, i) {
        field.addEventListener("click", function () {
            if (playerTurn) {
                let fieldId = field.getAttribute("id");
                if (fieldId === "green_field") {
                    greenSound.play();
                    field.style.background = greenSelected;
                    setTimeout(function () {
                        field.style.background = green;
                    }, 250)
                }
                if (fieldId === "red_field") {
                    redSound.play();
                    field.style.background = redSelected;
                    setTimeout(function () {
                        field.style.background = red;
                    }, 250)
                }
                if (fieldId === "yellow_field") {
                    yellowSound.play();
                    field.style.background = yellowSelected;
                    setTimeout(function () {
                        field.style.background = yellow;
                    }, 250)
                }
                if (fieldId === "blue_field") {
                    blueSound.play();
                    field.style.background = blueSelected;
                    setTimeout(function () {
                        field.style.background = blue;
                    }, 250)
                }
            }
        });
    });

    function turnOn() {
        gameOn = true;
        console.log("the game is on!");
        powerButton.style.background = powerOnGreen;
        streakCount.textContent = "00";
        startUpEffect();
        setTimeout(startUpEffect, 400);
        setTimeout(simonGame, 1200);
    }

    function simonGame() {
        updateStreakCount(++streak);
        console.log(streak);
        while (false) {

        }
    }

    function updateStreakCount(val) {
        streakCount.textContent = (val < 10) ? "0" + val : val;
    }

    function turnOff() {
        console.log("the game is off!");
        resetSequences();
        streak = 0;
        powerButton.style.background = "#292929";
        if (strictMode) {
            strictButton.style.background = "#292929";
            strictMode = false;
        }
        streakCount.textContent = "";
        gameOn = false;
    }

    function resetSequences() {
        simonSequence = [];
        playerSequence = [];
    }

    // fancy boot-effect
    function startUpEffect() {
        document.getElementById("green_field").style.background = greenSelected;
        setTimeout(function () {
            document.getElementById("green_field").style.background = green;
            document.getElementById("red_field").style.background = redSelected;
            setTimeout(function () {
                document.getElementById("red_field").style.background = red;
                document.getElementById("blue_field").style.background = blueSelected;
                setTimeout(function () {
                    document.getElementById("blue_field").style.background = blue;
                    document.getElementById("yellow_field").style.background = yellowSelected;
                    setTimeout(function () {
                        document.getElementById("yellow_field").style.background = yellow;
                    }, 100)
                }, 100)
            }, 100)
        }, 100);
    }

});
