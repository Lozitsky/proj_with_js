const Direwolf = require('./direwolf');

class Stark {
    constructor(obj) {
        this.location = "Winterfell";
        this.safe = false;
        if (obj) {
            this.name = obj.name;
            if (obj.area) {
                this.location = obj.area;
            }
        }
    }

    sayHouseWords() {
        return this.safe ? "The North Remembers" : "Winter is Coming";
    }

    callDirewolf(name, home) {
        let direwolf = new Direwolf(name, this.location);
        direwolf.protect(this);
        return direwolf;
    }
}

module.exports = Stark;