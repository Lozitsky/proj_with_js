// Create variables targetting the relevant DOM elements here 👇
const questSec = document.querySelector(".box1");
const messageSec = document.querySelector(".message");
const receiveBtn = questSec.querySelector("button");

// Add your event listeners here 👇
receiveBtn.addEventListener('click', showMessage)

// Create your event handlers and other functions here 👇

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function getSelectedId() {
    let list = questSec.querySelectorAll("[name='message']");
    for (let message of list) {
        if (message.checked) {
            return message.id;
        }
    }
    return undefined;
}

function getRandomMessage(messageId) {
    switch (messageId) {
        case "affirmation" :
            return affirmations[getRandomIndex(affirmations)];
        case "mantra":
            return mantras[getRandomIndex(mantras)];
        default:
            return undefined;
    }
}

function setMessage(randomMessage) {
    if (!randomMessage) {
        alert("Select a message type!");
        return;
    }
    let img = messageSec.querySelector("img");
    img.hidden = true;
    let p = messageSec.querySelector("p");
    p.hidden = false;
    p.textContent = randomMessage;
    console.log(randomMessage);
}

function showMessage() {
    setMessage(getRandomMessage(getSelectedId()));
}