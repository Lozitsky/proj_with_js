// Create variables targetting the relevant DOM elements here 👇

let savedGame = localStorage.getItem("game");
const game = savedGame ? new Game(JSON.parse(savedGame)) : new Game(new Player("one", 1), new Player("two", 2));

let mainHeader = document.querySelector('.main__header');
let mainCard = document.querySelector('.main__card');
let asideLeft = document.querySelector(".aside_left");
let asideRight = document.querySelector(".aside_right");

// Add your event listeners here 👇
document.addEventListener("DOMContentLoaded", startGame);

mainCard.addEventListener("click", clickListener);

// Create your event handlers and other functions here 👇

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function getLargePicture(token) {
    return token === game.player1.token ? "assets/heart100x99.png" : "assets/star100x95.png";
}

function setDefaultMainHeader() {
    mainHeader.innerHTML = "";
    let leftSpan = document.createElement("span");
    let mainToken = document.createElement("img");
    mainToken.classList.add("token", "main__token");

    if (!game.player1.wins.length && !game.player2.wins.length) {
        game.first = getRandomIndex([game.player1.token, game.player1.token]) === 0 ? game.player1.token : game.player2.token;
    }
    mainToken.src = getLargePicture(game.getPlayer().token);

    let rightSpan = document.createElement("span");
    leftSpan.classList.add("text");
    leftSpan.innerText = "It's";
    rightSpan.classList.add("text");
    rightSpan.innerText = "'s turn"
    mainHeader.appendChild(leftSpan);
    mainHeader.appendChild(mainToken);
    mainHeader.appendChild(rightSpan);
}

function startGame() {
    setDefaultMainHeader();
    loadCards();
}

function refreshAside(target, source) {
    let article = document.createElement("article");
    article.classList.add("card", "cards__card");
    source.forEach((row, rNum) => {
            row.forEach((el, cNum) => {
                let section = document.createElement("section");
                section.classList.add("field");
                if (source[rNum][cNum]) {
                    injectSmallIcon(rNum, cNum, section, source);
                }
                article.appendChild(section);
            })
        }
    );
    target.appendChild(article);
}

function loadCards() {
    refreshLeftHeader();
    game.player1.wins.forEach(card => refreshAside(asideLeft.querySelector(".cards"), card));
    refreshRightHeader();
    game.player2.wins.forEach(card => refreshAside(asideRight.querySelector(".cards"), card));
}

function refreshLeftHeader() {
    asideLeft.querySelector(".header__text").textContent = `${game.player1.wins.length} wins`;
}

function refreshRightHeader() {
    asideRight.querySelector(".header__text").textContent = `${game.player2.wins.length} wins`;
}

function refreshBoard() {
    if (game.state === "win") {
        localStorage.setItem("game", JSON.stringify(game));

        game.first = game.won.token === game.player1.token ? game.player2.token : game.player1.token;
        mainHeader.innerHTML = "";
        let mainToken = document.createElement("img");
        mainToken.classList.add("token", "main__token");
        mainToken.src = game.won.token === game.player1.token ? "assets/star100x95.png" : "assets/heart100x99.png";
        let rightSpan = document.createElement("span");
        rightSpan.classList.add("text", "main__text");
        rightSpan.innerText = "won!";
        mainHeader.appendChild(mainToken);
        mainHeader.appendChild(rightSpan);
        let cards;
        if (game.won.token === game.player1.token) {
            cards = asideLeft.querySelector(".cards");
            refreshLeftHeader();
        } else {
            cards = asideRight.querySelector(".cards");
            refreshRightHeader();
        }
        refreshAside(cards, game.board);
    } else if (game.state === "draw") {
        mainHeader.innerHTML = "";
        let span = document.createElement("span");
        span.classList.add("text", "main__text");
        span.innerText = "It's a draw!";
        mainHeader.appendChild(span);
    } else if (game.state === "reset") {
        setDefaultMainHeader();
        game.board.forEach((row, rNum) => {
            row.forEach((col, cNum) => {
                getField(rNum, cNum, mainCard, "field").innerHTML = "";
            })
        });
    } else {
        let mainToken = mainHeader.querySelector(".main__token");
        mainToken.src = getLargePicture(game.getPlayer().token);
    }

    game.board.forEach((row, rNum) => {
            row.forEach((el, cNum) => {
                if (game.board[rNum][cNum]) {
                    injectLargeIcon(rNum, cNum);
                }
            })
        }
    );
}

function getField(rowNumb, colNumb, target, className) {
    let field;
    switch (`${rowNumb} ${colNumb}`) {
        case "0 0" :
            field = target.querySelector(`.${className}_1`);
            break;
        case "0 1" :
            field = target.querySelector(`.${className}_2`);
            break;
        case "0 2" :
            field = target.querySelector(`.${className}_3`);
            break;
        case "1 0" :
            field = target.querySelector(`.${className}_4`);
            break;
        case "1 1" :
            field = target.querySelector(`.${className}_5`);
            break;
        case "1 2" :
            field = target.querySelector(`.${className}_6`);
            break;
        case "2 0" :
            field = target.querySelector(`.${className}_7`);
            break;
        case "2 1" :
            field = target.querySelector(`.${className}_8`);
            break;
        case "2 2" :
            field = target.querySelector(`.${className}_9`);
            break;
    }
    return field;
}

function injectLargeIcon(rowNumb, colNumb) {
    let field = getField(rowNumb, colNumb, mainCard, "field");

    let tokenLarge = document.createElement("img");
    tokenLarge.classList.add("token", "token-large");

    tokenLarge.src = game.board[rowNumb][colNumb] === game.player1.token ? "assets/star200x191.png" : "assets/heart200x198.png";
    field.innerHTML = "";
    field.appendChild(tokenLarge);
}

function injectSmallIcon(rowNumb, colNumb, target, source) {
    if (!target) {
        return;
    }
    let tokenSmall = document.createElement("img");
    tokenSmall.classList.add("token", "cards__token");

    tokenSmall.src = source[rowNumb][colNumb] === game.player1.token ? "assets/star25x24.png" : "assets/heart25x25.png";
    target.innerHTML = "";
    target.appendChild(tokenSmall);
}

function clickListener(ev) {
    if (ev.target.classList.contains("field")) {
        switch (ev.target.classList.item(1)) {
            case "field_1" :
                game.nextTurn(0, 0);
                break;
            case "field_2" :
                game.nextTurn(0, 1);
                break;
            case "field_3" :
                game.nextTurn(0, 2);
                break;
            case "field_4" :
                game.nextTurn(1, 0);
                break;
            case "field_5" :
                game.nextTurn(1, 1);
                break;
            case "field_6" :
                game.nextTurn(1, 2);
                break;
            case "field_7" :
                game.nextTurn(2, 0);
                break;
            case "field_8" :
                game.nextTurn(2, 1);
                break;
            case "field_9" :
                game.nextTurn(2, 2);
                break;
        }
        refreshBoard();
    }
}
