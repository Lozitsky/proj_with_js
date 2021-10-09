class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.turn = 0;
        this.state = player1.token;
        this.won = undefined;
    }

    nextTurn(row, col) {
        if (this.state === "win" || this.state === "draw") {
            this.reset();
            return;
        }

        if (this.board[row][col] !== 0) {
            return;
        }

        if (this.state === this.player1.token || this.state === this.player2.token) {
            this.changeState(row, col);
            this.turn++;
        }
        return this.state;
    }

    reset() {
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.turn = this.getPlayer().token === this.player1.token ? 1 : 0;
        this.state = this.getPlayer().token;
        this.won = undefined;
    }

    getPlayer() {
        return this.turn % 2 ? this.player2 : this.player1;
    }

    changeState(row, col) {
        this.board[row][col] = this.getPlayer().token;

        if (this.turn < 4) {
            return this.getPlayer().token;
        }
        if (this.board[1][1] && (
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
    }
}