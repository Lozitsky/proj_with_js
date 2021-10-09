class Player {
    constructor(id, token) {
        this.id = id;
        this.token = token;
        this.wins = [];
    }

    saveWinsToStorage(win) {
        this.wins.push(win);
    }

    retrieveWinsFromStorage() {
        return this.wins;
    }
}

