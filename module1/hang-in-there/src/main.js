// query selector variables go here 👇
const main = document.querySelector(".main-poster");
const posterForm = document.querySelector(".poster-form");
const saved = document.querySelector(".saved-posters");
const savedGrid = document.querySelector(".saved-posters-grid");

let posterImg = document.querySelector(".poster-img");
let posterTitle = document.querySelector(".poster-title");
let posterQuote = document.querySelector(".poster-quote");

// we've provided you with some data to work with 👇
var images = [
    "./assets/bees.jpg",
    "./assets/bridge.jpg",
    "./assets/butterfly.jpg",
    "./assets/cliff.jpg",
    "./assets/elephant.jpg",
    "./assets/flock.jpg",
    "./assets/fox.jpg",
    "./assets/frog.jpg",
    "./assets/horse.jpg",
    "./assets/lion.jpg",
    "./assets/mountain.jpg",
    "./assets/pier.jpg",
    "./assets/puffins.jpg",
    "./assets/pug.jpg",
    "./assets/runner.jpg",
    "./assets/squirrel.jpg",
    "./assets/tiger.jpg",
    "./assets/turtle.jpg"
];
var titles = [
    "determination",
    "success",
    "inspiration",
    "perspiration",
    "grit",
    "empathy",
    "feelings",
    "hope",
    "believe",
    "try",
    "conviction",
    "accomplishment",
    "achievement",
    "ambition",
    "clarity",
    "challenge",
    "commitment",
    "confidence",
    "action",
    "courage",
    "focus",
    "breathe",
    "gratitude",
    "imagination",
    "kindness",
    "mindfulness",
    "knowledge",
    "opportunity",
    "passion",
    "patience",
    "practice",
    "smile",
    "trust",
    "understanding",
    "wisdom"
];
var quotes = [
    "Don’t downgrade your dream just to fit your reality, upgrade your conviction to match your destiny.",
    "You are braver than you believe, stronger than you seem and smarter than you think.",
    "You are confined only by the walls you build yourself.",
    "The one who has confidence gains the confidence of others.",
    "Act as if what you do makes a difference. It does.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Never bend your head. Always hold it high. Look the world straight in the eye.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "Believe you can and you're halfway there.",
    "When you have a dream, you've got to grab it and never let go.",
    "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    "No matter what you're going through, there's a light at the end of the tunnel.",
    "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
    'Limit your "always" and your "nevers."',
    "You are never too old to set another goal or to dream a new dream.",
    "Try to be a rainbow in someone else's cloud.",
    "You do not find the happy life. You make it.",
    "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
    "Sometimes you will never know the value of a moment, until it becomes a memory.",
    "The most wasted of days is one without laughter.",
    "You must do the things you think you cannot do.",
    "It isn't where you came from. It's where you're going that counts.",
    "It is never too late to be what you might have been.",
    "Happiness often sneaks in through a door you didn't know you left open.",
    "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
    "Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.",
    "Be the change that you wish to see in the world.",
    "Let us make our future now, and let us make our dreams tomorrow's reality.",
    "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
    "If I cannot do great things, I can do small things in a great way.",
    "Don't wait. The time will never be just right.",
    "With the right kind of coaching and determination you can accomplish anything.",
    "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
    "No matter what people tell you, words and ideas can change the world.",
    "Each person must live their life as a model for others.",
    "A champion is defined not by their wins but by how they can recover when they fall."
];

var savedPosters = localStorage.getItem("savedPosters") ? JSON.parse(localStorage.getItem("savedPosters")) : [];
var currentPoster = localStorage.getItem("currentPoster") ? currentPoster = JSON.parse(localStorage.getItem("currentPoster")) : new Poster(images[getRandomIndex(images)], titles[getRandomIndex(titles)], quotes[getRandomIndex(quotes)]);
images.push(currentPoster.imageURL);
titles.push(currentPoster.title);
quotes.push(currentPoster.quote);
// event listeners go here 👇

document.addEventListener('DOMContentLoaded', loadPoster);

main.addEventListener('click', showAnotherPoster);
posterForm.addEventListener('click', listenPosterForm);
saved.addEventListener('click', listenSavedPosters);
savedGrid.addEventListener('dblclick', listenDblClick);

// functions and event handlers go here 👇
// (we've provided one for you to get you started)!
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function loadPoster() {
    posterImg.src = currentPoster.imageURL;
    posterTitle.innerHTML = "";
    posterTitle.appendChild(document.createTextNode(currentPoster.title));
    posterQuote.innerHTML = "";
    posterQuote.appendChild(document.createTextNode(currentPoster.quote));
}

function generateNewPoster() {
    // console.log("Generate!");
    currentPoster = new Poster(images[getRandomIndex(images)], titles[getRandomIndex(titles)], quotes[getRandomIndex(quotes)]);
    localStorage.setItem('currentPoster', JSON.stringify(currentPoster));
    loadPoster();
}

function toggleShowForm() {
    main.classList.toggle("hidden");
    posterForm.classList.toggle("hidden");
}

function ToggleViewSaved() {
    main.classList.toggle("hidden");
    saved.classList.toggle("hidden");
}


function showAnotherPoster(event) {
    let className = event.target.className;
    if (className === "show-random") {
        generateNewPoster();
    } else if (className === "show-form") {
        toggleShowForm();
    } else if (className === "show-saved") {
        refreshSavedPostersIntoDOM();
        ToggleViewSaved();
    } else if (className === "save-poster") {
        addCurrentToSaved();
    }
}

function addPosterNode(article, imageURL, title, quote, id) {

    let poster = document.createElement("div");
    poster.classList.add("mini-poster");
    poster.id = id;
    let img = document.createElement("img");
    img.classList.add("mini-poster");
    img.src = imageURL;
    img.alt = "nothin' to see here";
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(title));
    let h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode(quote));

    poster.appendChild(img);
    poster.appendChild(h2);
    poster.appendChild(h4);
    article.appendChild(poster);
}

function refreshSavedPostersIntoDOM() {
    let saved_article = document.querySelector(".saved-posters-grid");
    saved_article.innerHTML = "";
    savedPosters.forEach(poster => addPosterNode(saved_article, poster.imageURL, poster.title, poster.quote, poster.id));
}

function addCurrentToSaved() {
    if (savedPosters.find(poster => poster.imageURL === currentPoster.imageURL && poster.title === currentPoster.title && poster.quote === currentPoster.quote)) {
        return;
    }
    savedPosters.push(currentPoster);
    localStorage.setItem("savedPosters", JSON.stringify(savedPosters));
    refreshSavedPostersIntoDOM();
}

function listenPosterForm(event) {
    let className = event.target.className;
    if (className === "make-poster") {
        let image = document.querySelector('#poster-image-url').value;
        let title = document.querySelector('#poster-title').value;
        let quote = document.querySelector('#poster-quote').value;
        if (image && title && quote) {
            currentPoster = new Poster(image, title, quote);
            localStorage.setItem('currentPoster', JSON.stringify(currentPoster));
        }
        toggleShowForm();
    } else if (className === "show-main") {
        toggleShowForm();
    }
}

function listenSavedPosters(event) {
    // refreshSavedPostersIntoDOM();
    let className = event.target.className;
    if (className === "back-to-main") {
        ToggleViewSaved();
    }
}

function listenDblClick(event) {
    let id;
    if (event.target.id) {
        id = event.target.id;
    } else if (event.target.parentElement.id) {
        id = event.target.parentElement.id;
        // console.log(event);
    } else {
        return;
    }

    savedPosters = savedPosters.filter(poster => poster.id !== Number(id));
    localStorage.setItem("savedPosters", JSON.stringify(savedPosters));
    refreshSavedPostersIntoDOM();
}