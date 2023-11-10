// Find a <table> element with id="myTable":
var table = document.getElementById("gameLogs");

function printNewLog(message) {
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(-1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);

    // Add some text to the new cells:
    cell1.innerHTML = message;
    document.getElementById('gameLogsBottom').scrollIntoView();
}

printNewLog("Loading window...");
window.onload = function () {
    printNewLog("Loaded window!");
    printNewLog("1/1 assets loaded! Initiating game...");
    printNewLog("Game initiated!");
    printNewLog("Game started!");
    tutorial(1);
};
let tutorialOn = false;
function tutorial(section) {
    switch (section) {
        case 1:
            let dialogues = ["Tutorial started!", "Welcome! This game is inspired by the game 'Cookie Clicker' by Orteil. Thanks!", "Let's explore the interface. Do you see the top box? That's where the fun happens! Click the button on top of the large button."];
            setTimeout(nextDialogue, 1000);
            function nextDialogue() {
                printNewLog(dialogues[0]);
                dialogues.shift();
                if (dialogues.length >= 1) {
                    setTimeout(nextDialogue, 2500);
                }
                else{}
            }
            tutorialOn = true;
            break;
        case 2:
            printNewLog("Nice! Now spam click the large button! You only have 5 seconds! That will ship an order out per click. Make sure that there are enough orders in stock before starting a shift!");
            break;
        case 3:
            let dialogues2 = ["The amount of orders left out of the max is shown below the large button.", "Let's step out of the realm of working. Do you see this box, where the instructions are? That's the log box. It logs everything that happens in the game.", "In the event of an error or bug, you will see the error here. Don't worry if you don't get it, just send it to the developers!", "Make sure to periodically hire staff. There are 4 staff slots per floor. Buy more floors if you have used all your staff slots.", "Each staff helps you get more shipments shipped! They ship 1 shipment per second. Use upgrades to increase this!", "Oh, and buy better gear for your staff so they work harder and ship more shipments per second!", "Bored? Almost done! See the upgrades panel? You can buy upgrades there! There is 9% tax on upgrades, so be careful!", "That concludes the tutorial! Have fun!", "Tutorial ended."];
            setTimeout(nextDialogue2, 1000);
            function nextDialogue2() {
                printNewLog(dialogues2[0]);
                dialogues2.shift();
                if (dialogues2.length >= 1) {
                    setTimeout(nextDialogue2, 2500);
                }
                else {tutorialOn = false;}
            }
            break;
        default:
            break;
    }
}
//actual game code
let shiftTimeLeft = 5000;

const smallButtonWorkspace = document.getElementById("smallButtonWorkspace");

function startShift() {
    smallButtonWorkspace.disabled = true;
    smallButtonWorkspace.innerHTML = `${shiftTimeLeft / 1000}s left in shift!`;
    setTimeout(countdown, 1000);
    if (tutorialOn === true) {
        tutorial(2);
    }
}

function countdown(){
    shiftTimeLeft -= 1000;
    smallButtonWorkspace.innerHTML = `${shiftTimeLeft / 1000}s left in shift!`;
    if (shiftTimeLeft <= 0) {
        smallButtonWorkspace.disabled = false;
        smallButtonWorkspace.innerHTML = `Click to start shift.`;
        shiftTimeLeft = 5000;
        if (tutorialOn === true) {
            tutorial(3);
        }
    }
    else {
        setTimeout(countdown, 1000);
    }
}
