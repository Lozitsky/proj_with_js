class Game {
    constructor(obj, player2) {
        if (obj instanceof Player) {
            this.player1 = obj;
            this.player2 = player2;
            this.state = obj.token;
            this.first = player2.token;
            this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            this.turn = 0;
            this.won = undefined;
        } else {
            this.player1 = new Player(obj.player1);
            this.player2 = new Player(obj.player2);
            this.first = obj.won.token === obj.player1.token ? obj.player2.token : obj.player1.token;
            // this.state = "reset";
            // this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            // this.turn = 0;
            this.won = obj.won;
            this.reset();
        }
    }

    nextTurn(row, col) {
        if (this.state === "win" || this.state === "draw") {
            this.reset();
        } else if (this.state === "reset") {
            this.turn++;
            this.changeState(row, col);
            this.won = undefined;
        } else if (this.board[row][col] !== 0) {
        } else if (this.state === this.player1.token || this.state === this.player2.token) {
            this.turn++;
            this.changeState(row, col);
        }
        return this.state;
    }

    reset() {
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.turn = 0;
        this.state = "reset";
    }

    getPlayer() {
        if (this.first === this.player2.token) {
            return this.turn % 2 ? this.player2 : this.player1;
        } else {
            return this.turn % 2 ? this.player1 : this.player2;
        }
    }

    changeState(row, col) {
        this.board[row][col] = this.getPlayer().token;

        if (this.turn < 4) {
            this.state = this.getPlayer().token;
        } else if (this.board[1][1] && (
                this.board[0][1] & this.board[1][1] & this.board[2][1] ||
                this.board[1][0] & this.board[1][1] & this.board[1][2] ||
                this.board[2][0] & this.board[1][1] & this.board[0][2] ||
                this.board[0][0] & this.board[1][1] & this.board[2][2]) ||
            this.board[0][0] && (
                this.board[0][0] & this.board[0][1] & this.board[0][2] ||
                this.board[0][0] & this.board[1][0] & this.board[2][0]) ||
            this.board[2][2] && (
                this.board[2][2] & this.board[2][1] & this.board[2][0] ||
                this.board[2][2] & this.board[1][2] & this.board[0][2])
        ) {
            this.getPlayer().saveWinsToStorage(this.board);
            this.state = "win";
            this.won = this.getPlayer();
        } else if (this.turn === 9) {
            this.state = "draw";
        } else {
            this.state = this.getPlayer().token;
        }
        return this.state;
    }
}