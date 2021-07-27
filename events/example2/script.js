var grandParent = document.querySelector('.grandparent');
var parent = document.querySelector('.parent');
var button = document.querySelector('#click-me');

// button.addEventListener('click', logButtonClicking);
// parent.addEventListener('click', logButtonClicking);
// grandParent.addEventListener('click', logButtonClicking);
// button.addEventListener('click', (e) => logEvent(e));
// parent.addEventListener('click', function (e){logEvent(e)});
// grandParent.addEventListener('click', (e) => logEvent(e));
button.addEventListener('click', logEvent);
parent.addEventListener('click', logEvent);
grandParent.addEventListener('click', logEvent);


function logButtonClicking() {
    console.log(this.className + " was clicked!");
}

function logEvent(event) {
    console.log(event.target.className + " was clicked!");
}
