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

    // for setInterval
    let iterator, playerIterator;

    // sounds
    let greenSound  = new Audio("audio/greenSound.mp3"),
        redSound    = new Audio("audio/redSound.mp3"),
        yellowSound = new Audio("audio/yellowSound.mp3"),
        blueSound   = new Audio("audio/blueSound.mp3"),
        // and the best of all:
        errorSound  = new Audio("audio/errorSound.mp3");

    // field buttons
    let greenField = document.getElementById("green_field");
    let redField = document.getElementById("red_field");
    let yellowField = document.getElementById("yellow_field");
    let blueField = document.getElementById("blue_field");

    // setting buttons
    let powerButton  = document.getElementById("power"),
        strictButton = document.getElementById("strict_mode");

    let gameOn = false,
        strictMode = false,
        playerAllowed = false; // is the player allowed to press buttons?

    let streak = 1;
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

    let fieldColors = ["green", "red", "yellow", "blue"];

    let simonSequence = [],
        playerSequence = [];

    let fields = document.getElementsByClassName("field");
    Array.prototype.forEach.call(fields, function(field, i) {
        field.addEventListener("click", function () {
            if (playerAllowed) {
                let fieldId = field.getAttribute("id");
                let selectedColor = "";
                if (fieldId === "green_field") selectedColor = "green";
                if (fieldId === "red_field") selectedColor = "red";
                if (fieldId === "yellow_field") selectedColor = "yellow";
                if (fieldId === "blue_field") selectedColor = "blue";
                playerSequence.push(selectedColor);
                compareWithSimon(selectedColor, playerIterator);
                playerIterator++;
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
        setTimeout(simonGame(false), 1200);
    }


    function simonGame(flag) {
        updateStreakCount();
        if (flag || streak === 1) { //player advanced to the next level
            let randomFieldColor = fieldColors[Math.floor(Math.random() * 4)]; // choose next color at random
            simonSequence.push(randomFieldColor);
        }
        console.log(simonSequence);
        iterator = 0;
        let intervalSequence = setInterval(function () {
            // play entire sequence, with added color
            playButtonFromColor(simonSequence[iterator]);
            if (++iterator === streak) {
                clearInterval(intervalSequence);
                playerIterator = 0;
                playerAllowed = true;
                console.log("now its your turn, player");
            }
        }, 1000);
    }

    function compareWithSimon(color, index) {
        if (playerSequence[index] === simonSequence[index]) {
            playButtonFromColor(color);
            if (playerSequence.length === simonSequence.length) { // advanced to next level
                if (streak === 20) { // completed level 20
                    streakCount.textContent = ":)";
                    playerAllowed = false;
                    winAnimation();

                } else {
                    console.log("advancing to next level...");
                    streak++;
                    playerAllowed = false;
                    playerSequence = [];
                    setTimeout(function () {
                        simonGame(true);
                    }, 300);
                }
            }
        }
        else {
            errorSound.play();
            if (strictMode) {
                // you done fucked up
                streakCount.textContent = ":X";
                resetSequences();
                streak = 1;
                iterator = 0;
                playerIterator = 0;
                playerAllowed = false;
            } else {
                streakCount.textContent = ":(";
                playerAllowed = false;
                playerSequence = [];
            }
            setTimeout(function () {
                simonGame(false)
            }, 2000)
        }
    }

    function playButtonFromColor(color) {
        switch (color) {
            case "green":
                greenSound.play();
                greenField.style.background = greenSelected;
                setTimeout(function () {
                    greenField.style.background = green;
                }, 500);
                break;
            case "red":
                redSound.play();
                redField.style.background = redSelected;
                setTimeout(function () {
                    redField.style.background = red;
                }, 500);
                break;
            case "yellow":
                yellowSound.play();
                yellowField.style.background = yellowSelected;
                setTimeout(function () {
                    yellowField.style.background = yellow;
                }, 500);
                break;
            case "blue":
                blueSound.play();
                blueField.style.background = blueSelected;
                setTimeout(function () {
                    blueField.style.background = blue;
                }, 500);
                break;
        }
    }

    function updateStreakCount() {
        streakCount.textContent = (streak < 10) ? "0" + streak : streak;
    }

    function winAnimation() {
        //epic winning animation
    }

    function turnOff() {
        console.log("the game is off!");
        resetSequences();
        streak = 0;
        iterator = 0;
        playerIterator = 0;
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
