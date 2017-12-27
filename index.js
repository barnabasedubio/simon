document.addEventListener("DOMContentLoaded", function () {
    // game colors
    let green  = "#2E9800",
        red    = "#D33232",
        yellow = "#E9C828",
        blue   = "#4843E3";

    let strictRed    = "#FF0000",
        powerOnGreen = "#00FF00";

    // fields
    let greenField  = document.getElementById("green_field"),
        redField    = document.getElementById("red_field"),
        yellowField = document.getElementById("yellow_field"),
        blueField   = document.getElementById("blue_field");

    // setting buttons
    let powerButton  = document.getElementById("power"),
        strictButton = document.getElementById("strict_mode");

    let gameOn = false,
        strictMode = false;

    powerButton.addEventListener("click", function() {
        if (gameOn) turnOff();
        else turnOn();
    });

    strictButton.addEventListener("click", function() {
        strictMode = !strictMode;
        toggleStrictMode();
    });

    function turnOn() {
        console.log("the game is on!");
        powerButton.style.background = powerOnGreen;
        gameOn = true;
    }

    function turnOff() {
        console.log("the game is off!");
        powerButton.style.background = "#292929";
        if (strictMode) strictButton.style.background = "#292929";
        gameOn = false;
    }

    function toggleStrictMode() {
        if (gameOn && strictMode) strictButton.style.background = strictRed;
        else strictButton.style.background = "#292929";
    }

});
