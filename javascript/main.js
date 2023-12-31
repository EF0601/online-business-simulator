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
printNewLog("Don't worry. Shouldn't take long.");
window.onload = function () {
    printNewLog("Loaded window!");
    printNewLog("1/1 assets loaded! Initiating game...");
    printNewLog("Game initiated!");
    printNewLog("Game started!");
};
document.getElementById("enableTutorial").addEventListener("click", function () {
    tutorial(1);
});
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
                else { document.getElementById("smallButtonWorkspace").style.border = "5px solid yellow"; }
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
                else { tutorialOn = false; }
            }
            break;
        default:
            break;
    }
}

function round(number) {
    return Math.round(number * 1000) / 1000;
}

//commands
let inputProcess = [false, ""];
const gameLogCommand = document.getElementById("gameLogCommand");

//keybind
document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        enterCommand();
    }
    if (event.key === "/") {
        gameLogCommand.focus();
        setTimeout(function () { gameLogCommand.value = "" }, 2);
    }
    if (event.key === "Escape") {
        gameLogCommand.blur();
    }
    if (event.key === "Backspace") {
        gameLogCommand.value = "";
    }
    console.log(event.key);
});

function enterCommand() {
    if (inputProcess[0] === false) {
        //hacks
        if ((gameLogCommand.value).split(" ")[0] == "hack" && hackedClientActivate == true && getParameter(gameLogCommand.value).length == 2) {
            switch (getParameter(gameLogCommand.value)[0]) {
                case "money":
                    money = Number(getParameter(gameLogCommand.value)[1]);
                    document.getElementById("money").innerHTML = money;
                    break;
                case "orders":
                    orders = Number(getParameter(gameLogCommand.value)[1]);
                    document.getElementById("ordersLeft").innerHTML = orders;
                    break;
                default:
                    printNewLog(getParameter(gameLogCommand.value)[1] + "<-- found error here! Exit: Invalid parameter.");
                    break;
            }
        }
        //help menu
        else if ((gameLogCommand.value).split(" ")[0] == "help" && getParameter(gameLogCommand.value).length == 1) {
            switch (getParameter(gameLogCommand.value)[0]) {
                case "hack":
                    printNewLog("Hacks are only available on the hacked client. To access the hacked client, type 'hack' in the console and enter the password.");
                    if (hackedClientActivate === true) {
                        printNewLog("Command usage: hack [thing] [set to value]");
                        printNewLog("Things: money, orders");
                        printNewLog("Example: hack money 1000");
                        printNewLog("This will set your money to 1000.");
                    }
                    break;
                case "help":
                    printNewLog("This will bring up the help menu. Enter parameters to learn more about each command.");
                    printNewLog("Command usage: help [thing]");
                    printNewLog("Example: help help");
                    printNewLog("This will bring up the help menu for the help command.");
                    break;
                case "reload":
                    printNewLog("This will reload the page in 3 seconds.");
                    printNewLog("Command usage: reload");
                    printNewLog("Example: reload");
                    printNewLog("This will reload the page in 3 seconds.");
                    break;
                default:
                    printNewLog(getParameter(gameLogCommand.value)[1] + "<-- found error here! Exit: Invalid parameter.");
                    break;
            }
        }
        //other commands
        else {
            switch (gameLogCommand.value) {
                case "reload":
                    printNewLog("Reloading page in 3 seconds...");
                    setTimeout(function () { location.reload(); }, 3000);
                    break;
                case "hack":
                    if (hackedClientActivate == false) {
                        printNewLog("Loading hacked client...");
                        printNewLog("Please enter verification (password.)");
                        inputProcess = [true, "hack"];
                    }
                    break;
                case "help":
                    printNewLog("Don't know what's going on? Using the debug console will render your run invalid for a competition!");
                    printNewLog("Commands: help, reload");
                    printNewLog("Command usage: help [thing] to learn more about each command.");
                    printNewLog("There's some easter eggs too ;)");
                    break;
                case "3.14":
                    printNewLog(Math.PI);
                    break;
                case "u suck":
                    printNewLog("if ur talking about urself, thats tru");
                    money = -1000;
                    document.getElementById("money").innerHTML = money;
                    break;
                default:
                    printNewLog(gameLogCommand.value + "<-- Executed here and found an error! Exit: Command not found!");
                    break;
            }
        }
    }
    else if (inputProcess[1] === "hack") {
        if (gameLogCommand.value === "open-sesame") {
            hackedClient();
            inputProcess = [false, ""];
        }
        else {
            printNewLog("Incorrect password.");
            inputProcess = [false, ""];
        }
    }
    gameLogCommand.value = "";
}

function getParameter(parameter) {
    const inputParameter = parameter.split(" ");
    let outputParameters = [];
    for (let i = 1; i < inputParameter.length; i++) {
        if (inputParameter[i] !== "") {
            outputParameters.push(inputParameter[i]);
        }
    }
    console.log(outputParameters);
    return outputParameters;
}

//hacked client
let hackedClientActivate = false;
function hackedClient() {
    hackedClientActivate = true;
    printNewLog("Hacked client loaded!");
    document.title = "CRACKED: Online Business Simulator";
}

//actual game code
let shiftTimeLeft = 5000;
let working = false;
let orders = 15;
let ordersSent = 0;
let maxOrders = 30;

//monetary
let money = 10;
let tax = 0.15;
let earningsPerOrder = 2;

//experience
let experience = 0;
let maxExperience = 50;
let level = 1;

//staff
let floors = {
    numberFloors: 0,
};

let totalStaff = 0;
let staffEarning = 1;

let staffPrices = {
    staff: 10,
    floor: 500,
};

let orderRespawnRate = 1000;

function respawnOrder() {
    if (orders < maxOrders) {
        orders++;
    }
    setTimeout(respawnOrder, orderRespawnRate);
    document.getElementById("ordersLeft").innerHTML = orders;
}
respawnOrder();

const smallButtonWorkspace = document.getElementById("smallButtonWorkspace");

function gainedExperience() {
    document.getElementById("experience").innerHTML = round(experience);
    document.getElementById("experienceNeeded").innerHTML = round(maxExperience);
    document.getElementById("officeLevel").innerHTML = level;
    if (experience >= maxExperience) {
        experience = 0;
        level++;
        maxExperience = Math.round(maxExperience * 1.5);
        document.getElementById("experience").innerHTML = round(experience);
        document.getElementById("experienceNeeded").innerHTML = Math.round(maxExperience);
        earningsPerOrder = Number(round(earningsPerOrder * 1.02).toFixed(2));
        printNewLog(`You leveled up! You are now level ${level}! You now earn $${earningsPerOrder} per order!`);
    }
}

function startShift() {
    working = true;
    smallButtonWorkspace.disabled = true;
    smallButtonWorkspace.innerHTML = `${shiftTimeLeft / 1000}s left in shift!`;
    setTimeout(countdown, 1000);
    if (tutorialOn === true) {
        tutorial(2);
        document.getElementById("smallButtonWorkspace").style.border = "none";
        document.getElementById("largeButtonWorkspace").style.border = "5px solid yellow";
    }
}

function countdown() {
    shiftTimeLeft -= 1000;
    smallButtonWorkspace.innerHTML = `${shiftTimeLeft / 1000}s left in shift!`;
    if (orders >= 0 && orders - staffEarning * totalStaff >= 0) {
        ordersSent += staffEarning * totalStaff;
        orders -= staffEarning * totalStaff;
    }
    document.getElementById("ordersLeft").innerHTML = orders;
    if (shiftTimeLeft <= 0) {
        //earnings
        const earnings = Number(round((1 - tax) * (ordersSent * earningsPerOrder)).toFixed(2));
        money += earnings;
        printNewLog(`You earned $${earnings}! This is calculated as: tax: ${tax * 100}%; orders sent: ${ordersSent}; earnings per order: ${earningsPerOrder}; Gross earnings: ${Number(round(earningsPerOrder * ordersSent).toFixed(2))}; Tax cost: ${Number(round((earningsPerOrder * ordersSent) * tax).toFixed(2))}; Total earnings: ${earnings}; You now have $${money}.`);
        document.getElementById("money").innerHTML = money;
        //reset
        smallButtonWorkspace.disabled = false;
        smallButtonWorkspace.innerHTML = `Click to start shift.`;
        shiftTimeLeft = 5000;
        ordersSent = 0;
        working = false;
        //tutorial check
        if (tutorialOn === true) {
            tutorial(3);
            document.getElementById("largeButtonWorkspace").style.border = "none";
        }
    }
    else {
        setTimeout(countdown, 1000);
    }
}

function work() {
    if (working == true && orders > 0) {
        ordersSent++;
        orders--;
        document.getElementById("ordersLeft").innerHTML = orders;
        experience += round(Math.abs(Math.random()));
        document.getElementById("experience").innerHTML = round(experience);
        gainedExperience();
    }
}



//hire staff/floor
function buildFloor() {
    if (money >= staffPrices.floor) {
        money -= staffPrices.floor;
        floors.numberFloors++;
        staffPrices.floor = Math.round(staffPrices.floor * 1.5);
        document.getElementById("floorPrice").innerHTML = staffPrices.floor;
        document.getElementById("money").innerHTML = money;
        floors[floors.numberFloors] = { staffNumber: 0, staffMax: 4, upgrade: 0, upgradeMax: 5 };
        console.log(floors);
        printNewLog(`You bought a floor! You now have ${floors.numberFloors} floors!`);
    }
    else {
        printNewLog("You don't have enough money to buy another floor!");
    }
}

function hireStaff() {
    let success = false;
    if (floors == { numberFloors: 0 }) {
        printNewLog("You don't have any floors! Buy a floor first!");
        success = true;
    }
    else {
        for (let i = 1; i <= floors.numberFloors; i++) {
            console.log(i);
            console.log(floors[i]);
            if (floors[i].staffNumber < floors[i].staffMax) {
                if (money >= staffPrices.staff) {
                    money -= staffPrices.staff;
                    staffPrices.staff = Math.round(staffPrices.staff * 1.15);
                    document.getElementById("staffPrice").innerHTML = staffPrices.staff;
                    document.getElementById("money").innerHTML = money;
                    floors[i].staffNumber++;
                    totalStaff++;
                    printNewLog(`You hired a staff member! You now have ${floors[i].staffNumber} staff members on floor ${i}!`);
                    success = true;
                    break;
                }
                else {
                    printNewLog("You don't have enough money to hire a staff member!");
                    success = true;
                }
            }
            else { }
        }
    }

}

//upgrades
const upgradeLocations = {
    earningsPerOrder: {
        earningsPreviousLevel: document.getElementById("earningsPreviousLevel"),
        earningPreviousEffect: document.getElementById("earningsPreviousEffect"),
        earningsPreviousCost: document.getElementById("earningsPreviousCost"),
        earningsNextLevel: document.getElementById("earningsNextLevel"),
        earningsNextEffect: document.getElementById("earningsNextEffect"),
        earningsNextCost: document.getElementById("earningsNextCost"),
        earningsTotalCost: document.getElementById("earningsTotalPrice"),
    },
    staffBoost: {
        staffBoostPreviousLevel: document.getElementById("staffBoostPreviousLevel"),
        staffBoostPreviousEffect: document.getElementById("staffBoostPreviousEffect"),
        staffBoostPreviousCost: document.getElementById("staffBoostPreviousCost"),
        staffBoostNextLevel: document.getElementById("staffBoostNextLevel"),
        staffBoostNextEffect: document.getElementById("staffBoostNextEffect"),
        staffBoostNextCost: document.getElementById("staffBoostNextCost"),
        staffBoostTotalCost: document.getElementById("staffBoostTotalPrice"),
    },
    taxRelief: {
        taxReliefPreviousLevel: document.getElementById("taxReliefPreviousLevel"),
        taxReliefPreviousEffect: document.getElementById("taxReliefPreviousEffect"),
        taxReliefPreviousCost: document.getElementById("taxReliefPreviousCost"),
        taxReliefNextLevel: document.getElementById("taxReliefNextLevel"),
        taxReliefNextEffect: document.getElementById("taxReliefNextEffect"),
        taxReliefNextCost: document.getElementById("taxReliefNextCost"),
        taxReliefTotalCost: document.getElementById("taxReliefTotalPrice"),
    },
};
let upgrades = {
    earningsPerOrder: {
        level: 0,
        effect: 2,
        cost: 100,
    },
    staffBoost: {
        level: 0,
        effect: 0.01,
        cost: 100,
    },
    taxRelief: {
        level: 0,
        effect: 0.01,
        cost: 1000,
    },
};

function upgrade(upgradedThing) {
    switch (upgradedThing) {
        case 'earnings':
            if (money >= upgrades.earningsPerOrder.cost) {
                upgrades.earningsPerOrder.level++;
                money -= upgrades.earningsPerOrder.cost;
                upgradeLocations.earningsPerOrder.earningsPreviousLevel.innerHTML = upgrades.earningsPerOrder.level;
                upgradeLocations.earningsPerOrder.earningsPreviousCost.innerHTML = upgrades.earningsPerOrder.cost;
                upgrades.earningsPerOrder.cost = Number(Math.round(upgrades.earningsPerOrder.cost * 1.09).toFixed(2));
                earningsPerOrder = Number(round(earningsPerOrder * (1.1)).toFixed(2));
                upgradeLocations.earningsPerOrder.earningPreviousEffect.innerHTML = earningsPerOrder;
                document.getElementById("money").innerHTML = money;
                upgradeLocations.earningsPerOrder.earningsNextLevel.innerHTML = upgrades.earningsPerOrder.level + 1;
                upgradeLocations.earningsPerOrder.earningsNextEffect.innerHTML = Number(round(earningsPerOrder * (1.1)).toFixed(2));
                upgradeLocations.earningsPerOrder.earningsNextCost.innerHTML = upgrades.earningsPerOrder.cost;
                upgradeLocations.earningsPerOrder.earningsTotalCost.innerHTML = Number((upgrades.earningsPerOrder.cost * 1.09).toFixed(2));
                printNewLog(`You upgraded your earnings per order! You now earn $${earningsPerOrder} per order!`);

            }
            else {
                printNewLog("You don't have enough money to buy this upgrade!");
            }
            break;

        default:
            break;
    }
}
