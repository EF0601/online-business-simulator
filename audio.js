let sound = false;
const clickSound = new Audio("./Audio_elements/click.mp3");
const upgradeSound = new Audio("./Audio_elements/upgrade.mp3");

const music1 = new Audio("./Audio_elements/music1.mp3");
const music2 = new Audio("./Audio_elements/music2.mp3");

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (sound) {
      clickSound.play();
    }
  });
});

function toggleSound() {
    if (sound === true) {
        sound = false;
        music1.pause();
        music2.pause();
    }
    else {
        sound = true;
        if (currentPlaying === 1) {
            music1Play();
        }
        if (currentPlaying === 2) {
            music2Play();
        }
    }
}

function enableSound() {
    sound = true;
    music1Play();
}

let currentPlaying = 2;

function music1Play() {
    if (sound === true) {
        currentPlaying = 1;
        music1.play();
        music2.pause();
        setTimeout(() => {
            if (sound === true) {
                music2Play();
            }
        }, 180000);
    }
}

function music2Play() {
    if (sound === true) {
        currentPlaying = 2;
        music2.play();
        music1.pause();
        setTimeout(() => {
            if (sound === true) {
                music1Play();
            }
        }, 240000);
    }
}
