"use strict";

function getIndexesInBounds(lazyObjects, ...params) {
    const windowHeight = document.documentElement.clientHeight;
    let indexesInBounds = [];
    if (lazyObjects.length) {
        lazyObjects.forEach(obj => {
            const rect = obj.getBoundingClientRect();
            for (let p of params) {
                if (obj.dataset[p]) {
                    indexesInBounds.push(rect.bottom > 0 && rect.top < windowHeight);
                    break;
                }
            }
        });
    }
    return indexesInBounds;
}

/*function checkLazyImage() {
    let lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]');
    let indexes = getIndexesInBounds(lazyImages, "src", "srcset");
    if (indexes.length > 0 && indexes.includes(true)) {
        for (let i = 0; i < indexes.length; i++) {
            if (!indexes[i]) {
                continue;
            }
            if (lazyImages[i].dataset.src) {
                lazyImages[i].src = lazyImages[i].dataset.src;
                lazyImages[i].removeAttribute('data-src');
            } else if (lazyImages[i].dataset.srcset) {
                lazyImages[i].srcset = lazyImages[i].dataset.srcset;
                lazyImages[i].removeAttribute('data-srcset');
            }
        }
    }
}

function CheckLazyMap() {
    let loadMapBlocks = document.querySelectorAll('div[data-map]');
    let indexes = getIndexesInBounds(loadMapBlocks, "map");

    if (indexes.length > 0 && indexes.includes(true)) {
        for (let i = 0; i < indexes.length; i++) {
            if (!indexes[i]) {
                continue;
            }
            if (loadMapBlocks[i].dataset.map) {
                loadMapBlocks[i].insertAdjacentHTML(
                    "beforeend",
                    `<iframe src="${loadMapBlocks[i].dataset.map}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
                )
                loadMapBlocks[i].removeAttribute('data-map');
            }
        }
    }
}*/

function checkLazyObjects(param) {
    let lazyObjects;
    let indexes;
    if (param === "img") {
        lazyObjects = document.querySelectorAll('img[data-src],source[data-srcset]');
        indexes = getIndexesInBounds(lazyObjects, "src", "srcset");
    } else if (param === "map") {
        lazyObjects = document.querySelectorAll('div[data-map]');
        indexes = getIndexesInBounds(lazyObjects, "map");
    }

    if (indexes.includes(true)) {
        for (let i = 0; i < indexes.length; i++) {
            if (!indexes[i]) {
                continue;
            }
            if (lazyObjects[i].dataset.src) {
                lazyObjects[i].src = lazyObjects[i].dataset.src;
                lazyObjects[i].removeAttribute('data-src');
            } else if (lazyObjects[i].dataset.srcset) {
                lazyObjects[i].srcset = lazyObjects[i].dataset.srcset;
                lazyObjects[i].removeAttribute('data-srcset');
            } else if (lazyObjects[i].dataset.map) {
                lazyObjects[i].insertAdjacentHTML(
                    "beforeend",
                    `<iframe src="${lazyObjects[i].dataset.map}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
                )
                lazyObjects[i].removeAttribute('data-map');
            }
        }
    }
}

async function loadContent(element) {
    if (document.querySelector('.loading-icon')) {
        return;
    }
    element.insertAdjacentHTML(
        "beforeend",
        `<div class="loading-icon"></div>`
    );
    let response = await fetch('more.html', {
        method: 'GET',
    });
    if (response.ok) {
        let result = await response.text();
        element.insertAdjacentHTML("beforeend", result);
        if (document.querySelector('.loading-icon')) {
            document.querySelector('.loading-icon').remove();
        }
    } else {
        alert("Error!");
    }
}

function checkMoreText() {
    const windowHeight = document.documentElement.clientHeight;
    let more = document.querySelector('.load-more');
    if (more.getBoundingClientRect().bottom <= windowHeight) {
        loadContent(more);
    }
}

function lazyScroll() {
    checkLazyObjects("img");
    checkLazyObjects("map");
    checkMoreText();
}

window.addEventListener("scroll", lazyScroll);