class Rocket {
    constructor() {
        this.name = '';
        this.fuel = 'empty';
        this.astronauts = [];
        this.enginesIgnited = false;
        this.cargoDoors = 'closed';
        this.cargo = [];
    }

    loadAstronaut(name) {
        this.astronauts.push(name);
    }

    lightThisCandle() {
        this.enginesIgnited = true;
    }

    fillTanks() {
        this.fuel = 'full';
    }
}

export default Rocket;