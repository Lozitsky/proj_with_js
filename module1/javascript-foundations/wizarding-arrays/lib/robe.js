class Robe {
    constructor() {
        this.pockets = [[], [], [], [], [], [], [], [], [], []];
    }

    addToPocket(thing) {
        this.pockets.find(arr => !arr.length).push(thing);
    }

    retrieve(name) {
        let index;
        this.pockets.find((arr, i) => {
                if (arr.includes(name)) {
                    index = i;
                }
            }
        );
        return  this.pockets[index].splice(0, this.pockets[index].length)[0];
    }

    emptyAllPockets() {
        this.pockets.forEach(pocket => pocket.length = 0);
    }
}

module.exports = Robe;