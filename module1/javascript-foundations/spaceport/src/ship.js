const Being = require("./being");
const Part = require("./part");

class Ship {
    constructor(obj) {
        this.name = obj.name;
        this.type = obj.type;
        this.maxCrew = obj.maxCrew;
        this.odometer = obj.odometer ? obj.odometer : 0;
        this.fuelCapacity = obj.fuelCapacity ? obj.fuelCapacity : 10;
        this.fuel = 0;
        this.captain = obj.captain;
        this.crew = [];
        this.cargo = [];
        this.parts = obj.parts ? obj.parts : {};
        this.readyToFly = false;
    }

    addCrew(crew) {
        if (crew.reduce((prev, current) => prev && current instanceof Being, true)) {
            this.crew = [...this.crew, ...crew];
            this.crew.length = this.maxCrew;
        }
    }

    loadCargo(cargo) {
        if (cargo instanceof Part) {
            this.cargo.push(cargo);
        }
    }

    updatePart(part) {
        if (part instanceof Part) {
            let value = 0;
            if (this.parts[part.type]) {
                value = this.parts[part.type].value - part.value;
            }
            this.parts[part.type] = part;
            return value;
        }
    }

    checkReadiness() {
        this.readyToFly = false;
        if (!this.captain) {
            return "Cannot fly without a captain";
        } else if (!this.fuel) {
            return "Cannot fly without fuel";
        } else if (!Object.keys(this.parts).length) {
            return "Cannot fly without parts";
        }
        this.readyToFly = true;
        return "Good to go!";
    }
}

module.exports = Ship;