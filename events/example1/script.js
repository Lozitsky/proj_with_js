var addNewButton = document.querySelector('.add-new');
var parent = document.querySelector('.parent');
var allButtons = document.querySelectorAll('.parent .click-me');

addNewButton.addEventListener('click', createButton);

for(var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener('click', showAlert);
}

function showAlert() {
  alert('You clicked me!');
}

function createButton() {
  var newButton = document.createElement('button');
  newButton.className = 'click-me';
  newButton.innerText = "New click me button!";
  parent.appendChild(newButton);
}
