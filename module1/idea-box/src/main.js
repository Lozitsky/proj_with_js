const ideas = [];
JSON.parse(localStorage.getItem("ideas") || "[]").forEach(obj => ideas.push(new Idea(obj)));

// Create variables targetting the relevant DOM elements here 👇
let isOff = true;
let idea_form = document.querySelector(".idea-form");
let saveBtn = document.querySelector(".idea-form__save");
let showStarredBtn = document.querySelector(".filter__show-starred");
let searchField = document.querySelector(".idea-form__search-field");
let inputFormTitle = document.querySelector(".idea-form__title-field");
let areaFormBody = document.querySelector(".idea-form__area");
let cardsContainer = document.querySelector(".grid-container");

// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', loadCards);
saveBtn.addEventListener('click', createIdea);
idea_form.addEventListener('input', checkForm);
cardsContainer.addEventListener('click', listenCard);
showStarredBtn.addEventListener('click', toggleShowStarred);
searchField.addEventListener("input", findByText);

// Create your event handlers and other functions here 👇

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function checkForm(ev) {
    // let target = ev.target;
    if (ev.target.id === "idea_title" || ev.target.id === "idea_body") {
        if (inputFormTitle.value && areaFormBody.value) {
            switchOnSaveBtn();
        } else {
            switchOffSaveBtn();
        }
    }
}

function resetSaveForm() {
    inputFormTitle.value = "";
    areaFormBody.value = "";
    switchOffSaveBtn();
}

function createIdea(ev) {
    ev.preventDefault();
    let title = inputFormTitle.value;
    let body = areaFormBody.value;
    if (!isOff && title && body) {
        let idea = new Idea(title, body);
        idea.saveToStorage();
        loadCards();
        resetSaveForm();
    }
}

function switchOffSaveBtn() {
    if (isOff) {
        return;
    }
    saveBtn.classList.remove("idea-form__save_on");
    saveBtn.classList.add("idea-form__save_off");
    isOff = true;
}

function switchOnSaveBtn() {
    if (!isOff) {
        return;
    }
    saveBtn.classList.remove("idea-form__save_off");
    saveBtn.classList.add("idea-form__save_on");
    isOff = false;
}

function loadCards() {
    if (!ideas.length) {
        return;
    }
    cardsContainer.innerHTML = "";
    showStarredBtn.innerText = "Show Starred Ideas";
    ideas.forEach(idea => {
        injectCard(idea, cardsContainer);
    });
}

function injectCard(card, target) {
    let article = document.createElement("article");
    article.classList.add("card");
    article.setAttribute("id", card.id);
    // region<------------------------heder---------------------->
    let header = document.createElement("header");
    header.classList.add("card__header");
    let star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // star.classList.add("card__img", "card__star");
    star.classList.add("card__star");
    card.star ? star.classList.add("card__star_full") : star.classList.remove("card__star_full");

    let useStar = document.createElementNS("http://www.w3.org/2000/svg", "use");
    useStar.setAttributeNS(null, "href", "assets/star.svg#star");
    star.appendChild(useStar);
    let del = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    del.classList.add("card__img", "card__delete");
    let useDel = document.createElementNS("http://www.w3.org/2000/svg", "use");
    useDel.setAttributeNS(null, "href", "assets/delete.svg#delete");
    del.appendChild(useDel);
    header.appendChild(star);
    header.appendChild(del);
    // endregion<------------------------heder---------------------->
    // region<------------------------section---------------------->
    let section = document.createElement("section");
    section.classList.add("card__body");
    let h3 = document.createElement("h3");
    h3.classList.add("card__title");
    h3.textContent = card.title;
    let p = document.createElement("p");
    p.classList.add("card__text");
    p.textContent = card.body;
    section.appendChild(h3);
    section.appendChild(p);
    // endregion<------------------------section---------------------->
    // region<------------------------footer---------------------->
    let footer = document.createElement("footer");
    footer.classList.add("card__comment");
    let footerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    footerSvg.classList.add("card__img");
    let footerUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
    footerUse.setAttributeNS(null, "href", "assets/comment.svg#add");
    footerSvg.appendChild(footerUse);
    let addSpan = document.createElement("span");
    addSpan.classList.add("card__add");
    addSpan.textContent = "Comment";
    footer.appendChild(footerSvg);
    footer.appendChild(addSpan);
    // endregion<------------------------footer---------------------->
    article.appendChild(header);
    article.appendChild(section);
    article.appendChild(footer);
    target.appendChild(article);
}

function getSvg(ev, classSvg) {
    let target = ev.target;
    return target.classList.contains(classSvg) ? target : target.parentElement.classList.contains(classSvg) ? target.parentElement : undefined;
}

function getIdea(id) {
    return ideas.find(idea => idea.id === id * 1);
}

function getId(ideaId) {
    let index;
    ideas.find((idea, id) => {
        if (idea.id === Number(ideaId)) {
            index = id;
            return true;
        }
    });
    return index;
}

function refreshCards() {
    if (showStarredBtn.innerText === "Show All Ideas") {
        loadFavoriteCards();
    } else {
        loadCards();
    }
}

function listenCard(ev) {
    for (let article of ev.currentTarget.children) {
        if (inBounds(article, getSvg(ev, "card__delete"))) {
            getIdea(article.id).deleteFromStorage();
            refreshCards();
            return;
        } else if (inBounds(article, getSvg(ev, "card__star"))) {
            getIdea(article.id).updateIdea();
            refreshCards();
            return;
        }
    }
}

function inBounds(container, target) {
    if (!container || !target) {
        return;
    }

    let rect = container.getBoundingClientRect();
    let rectTarget = target.getBoundingClientRect();

    return rectTarget.left >= rect.left && rectTarget.right <= rect.right &&
        rectTarget.top >= rect.top && rectTarget.bottom <= rect.bottom;
}

function loadFavoriteCards() {
    if (!ideas.length) {
        return;
    }
    cardsContainer.innerHTML = "";
    showStarredBtn.innerText = "Show All Ideas";
    ideas.forEach(idea => {
        if (idea.star) {
            injectCard(idea, cardsContainer);
        }
    });
}

function toggleShowStarred() {
    if (showStarredBtn.innerText === "Show All Ideas") {
        loadCards();
    } else {
        loadFavoriteCards();
    }
}

function findByText() {
    cardsContainer.innerHTML = "";
    if (!ideas.length) {
        return;
    }
    if (searchField.value) {
        ideas.forEach(idea => {
            if (idea.title.includes(searchField.value || idea.body.includes(searchField.value))) {
                injectCard(idea, cardsContainer);
            }
        });
    } else {
        loadCards();
    }

}