class Settler {
    constructor(obj) {
        this.name = obj.name;
        this.age = obj.age;
        this.nationality = obj.nationality ? obj.nationality : 'unknown';
        this.status = 'healthy';
        this.ailments = [];
    }

    experienceDistress(ailment) {
        if (this.ailments.length < 1) {
            this.status = 'fair';
        } else if (this.ailments.length === 1) {
            this.status =  'poor';
        } else if (this.ailments.length === 2) {
            this.status = 'dead';
        } else {
            return;
        }
        this.ailments.push(ailment);
    }

    heal() {
        if (this.status === 'dead') {
            return "Sorry, we can't heal a corpse. Will needs a proper burial!";
        }
        this.status = 'healthy';
        this.ailments = [];
    }
}

module.exports = Settler;