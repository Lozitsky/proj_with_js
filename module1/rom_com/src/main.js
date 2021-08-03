// Create variables targetting the relevant DOM elements here 👇
let main = document.querySelector(".main-cover");
let homeView = document.querySelector(".home-view");
let formView = document.querySelector(".form-view");
let savedView = document.querySelector(".saved-view");
let savedCoversSection = document.querySelector(".saved-covers-section");
let rndCoverBtn = document.querySelector(".random-cover-button");
let mkNewBtn = document.querySelector(".make-new-button");
let homeBtn = document.querySelector(".home-button");
let viewSavedBtn = document.querySelector(".view-saved-button");
let acceptNewBtn = document.querySelector(".create-new-book-button");
let saveCoverBtn = document.querySelector(".save-cover-button");
// We've provided a few variables below
var savedCovers = [
    new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

// var currentCover = localStorage.getItem("currentCover") ? JSON.parse(localStorage.getItem("currentCover")) : getRndCover();
var currentCover = getRndCover();


// Add your event listeners here 👇
document.addEventListener("DOMContentLoaded", loadCover);

rndCoverBtn.addEventListener('click', () => changeCover(getRndCover()));
mkNewBtn.addEventListener('click', toggleFormView);
viewSavedBtn.addEventListener('click', toggleSaveView);
homeBtn.addEventListener('click', toggleHomeView);
acceptNewBtn.addEventListener('click', createBook);
saveCoverBtn.addEventListener('click', saveCover);
savedCoversSection.addEventListener('dblclick', deleteCover);
// Create your event handlers and other functions here 👇


// We've provided one function to get you started
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function getRndCover() {
    return createCover(covers[getRandomIndex(covers)], titles[getRandomIndex(titles)], descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)]);
}

function createCover(cover, title, desc1, desc2) {
    return cover && title && desc1 && desc2 ? new Cover(cover, title, desc1, desc2) : null;
}

function checkSaved(current) {
    return savedCovers.find(book => book.cover === current.cover && book.title === current.title && book.tagline1 === current.tagline1 && book.tagline2 === current.tagline2);
}

function checkEl(arr, el) {
    return arr.find(value => value === el);
}

function loadCover() {
    let img = main.children[0];
    img.src = currentCover.cover;
    let h2 = main.children[1];
    h2.innerHTML = "";
    h2.appendChild(document.createTextNode(currentCover.title));
    let h3 = main.children[2];
    let tagline1 = h3.children[0];
    tagline1.innerHTML = "";
    tagline1.appendChild(document.createTextNode(currentCover.tagline1))
    let tagline2 = h3.children[1];
    tagline2.innerHTML = "";
    tagline2.appendChild(document.createTextNode(currentCover.tagline2))
    main.firstElementChild.src = currentCover.cover;
}

function appendSavedCovers() {
    let savedSec = savedView.querySelector(".saved-covers-section");
    savedSec.innerHTML = "";
    for (let cover of savedCovers) {
        let section = document.createElement("section");
        section.classList.add("mini-cover");
        section.id = cover.id;
        let img = document.createElement("img");
        img.classList.add("cover-image");
        img.src = cover.cover;
        let h2 = document.createElement("h2");
        h2.classList.add("cover-title");
        h2.innerHTML = "";
        h2.appendChild(document.createTextNode(cover.title));
        let h3 = document.createElement("h3");
        h3.classList.add("tagline");
        h3.innerHTML = `A tale of <span class="tagline-1">${cover.tagline1}</span> and <span class="tagline-2">${cover.tagline2}</span>`;
        section.appendChild(img);
        section.appendChild(h2);
        section.appendChild(h3);
        section.appendChild(img);
        savedSec.appendChild(section);
    }
}

function changeCover(cover) {
    currentCover = cover;
    if (!checkEl(covers, currentCover.cover)) {
        covers.push(currentCover.cover);
    }
    if (!checkEl(titles, currentCover.title)) {
        titles.push(currentCover.title);
    }
    if (!checkEl(descriptors, currentCover.tagline1)) {
        descriptors.push(currentCover.tagline1);
    }
    if (!checkEl(descriptors, currentCover.tagline2)) {
        descriptors.push(currentCover.tagline2);
    }
    loadCover();
}

function toggleView() {
    homeView.classList.toggle("hidden");
    saveCoverBtn.classList.toggle("hidden");
    rndCoverBtn.classList.toggle("hidden");
    homeBtn.classList.toggle("hidden");
}

function toggleFormView() {
    if (!homeView.classList.contains("hidden")) {
        toggleView();
        formView.classList.toggle("hidden");
    } else if (!savedView.classList.contains("hidden")) {
        formView.classList.toggle("hidden");
        savedView.classList.toggle("hidden");
    }
}

function toggleSaveView() {
    if (!homeView.classList.contains("hidden")) {
        appendSavedCovers();
        toggleView();
        savedView.classList.toggle("hidden");
    } else if (!formView.classList.contains("hidden")) {
        appendSavedCovers();
        savedView.classList.toggle("hidden");
        formView.classList.toggle("hidden");
    }
}

function toggleHomeView() {
    if (!savedView.classList.contains("hidden")) {
        toggleView();
        savedView.classList.toggle("hidden");
    } else if (!formView.classList.contains("hidden")) {
        toggleView();
        formView.classList.toggle("hidden");
    }
}

function createBook(event) {
    event.preventDefault();
    let cover = formView.querySelector('.user-cover').value;
    let title = formView.querySelector('.user-title').value;
    let desc1 = formView.querySelector('.user-desc1').value;
    let desc2 = formView.querySelector('.user-desc2').value;

    changeCover(createCover(cover, title, desc1, desc2));
    toggleHomeView();
}

function saveCover() {
    if (!checkSaved(currentCover)) {
        savedCovers.push(currentCover);
    }
}

function deleteCover(event) {
    let id = event.target.parentElement.id;

    savedCovers = savedCovers.filter(book => book.id !== Number(id));

//    in this case the data on the page does not refresh
/*    for (let i = 0; i < savedCovers.length; i++) {
        if (savedCovers[i].id === Number(id)) {
            savedCovers.splice(i, 1);
            return;
        }
    }*/
    appendSavedCovers();
}