class Player {
    constructor(player, token, wins = []) {
        if (typeof player === "object") {
            this.id = player.id;
            this.token = player.token;
            this.wins = player.wins;
        } else {
            this.id = player;
            this.token = token;
            this.wins = wins;
        }
    }

    saveWinsToStorage(win) {
        this.wins.push(win);
    }

    retrieveWinsFromStorage() {
        return this.wins;
    }
}

