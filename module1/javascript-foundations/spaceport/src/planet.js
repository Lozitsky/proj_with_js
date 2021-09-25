const Ship = require("./ship");

class Planet {
    constructor(obj) {
        this.name = obj.name;
        this.shop = obj.shop;
        this.currentShip;
        this.coordinates = obj.coordinates;
    }

    landShip(fighter) {
        this.currentShip = fighter;
    }

    calculateDistance(otherPlanet) {
        return Math.sqrt(Math.pow(otherPlanet.coordinates.x - this.coordinates.x, 2) +
            Math.pow(otherPlanet.coordinates.y - this.coordinates.y, 2) +
            Math.pow(otherPlanet.coordinates.x - this.coordinates.z, 2))
    }

    refuel(ship) {
        ship.fuel = ship.fuelCapacity;
    }

    giveClearance(otherPlanet) {
        if (!this.currentShip.fuel) {
            return "Clearance denied: Cannot fly without fuel";
        }
        this.currentShip.fuel = 0;
        otherPlanet.currentShip = this.currentShip;
        this.currentShip = undefined;
        return `Clearance granted: Enjoy your trip to ${otherPlanet.name}`;
    }
}

module.exports = Planet;