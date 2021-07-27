const addNewButton = document.querySelector('.add-new');
const parent = document.querySelector('.parent');

addNewButton.addEventListener('click', createButton);
parent.addEventListener('click', showAlert);

function showAlert(event) {
  if (event.target.className === 'click-me') {
    alert('You clicked me!');
  }
}

function createButton() {
  let newButton = document.createElement('button');
  newButton.className = 'click-me';
  newButton.innerText = "New click me button!";
  parent.appendChild(newButton);
}
