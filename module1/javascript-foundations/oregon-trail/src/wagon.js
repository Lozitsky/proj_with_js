class Wagon {
    constructor(obj) {
        this.title = obj.name;
        this.food = obj.food;
        this.ammunition = obj.ammunition;
        this.clothes = obj.clothes;
        this.wheels = obj.wheels ? obj.wheels : [];
        this.axles = obj.axles ? obj.axles : [];
        this.oxen = obj.oxen ? obj.oxen : [];
        this.yokes = obj.yokes ? obj.yokes : [];
        this.settlers = obj.settlers ? obj.settlers : [];
    }

    addPart(part) {
        if (part.type === "wheel") {
            this.wheels.push(part);
        } else if (part.type === "axle") {
            this.axles.push(part);
        } else if (part.type === "ox") {
            this.oxen.push(part);
        } else if (part.type === "yoke") {
            this.yokes.push(part);
        }
    }

    canTravel() {
        let isWorkingWheels = this.wheels.reduce((acc, wheel) => !wheel.broken && acc, true);
        let isWorkingAxles = this.axles.reduce((acc, axle) => !axle.broken && acc, true);
        let isWorkingOxen = this.oxen.reduce((acc, oxen) => !oxen.broken && acc, true);
        let isAlive = !!this.settlers.find(setter => setter.status === "healthy");

        return this.wheels.length === 4 && isWorkingWheels && this.axles.length > 1 && isWorkingAxles &&
            this.oxen.length > 1 && isWorkingOxen && this.yokes.length > 0 &&
            (this.oxen.length / 2).toFixed(0) <= this.yokes.length && this.settlers.length > 0 && isAlive;
    }
}

module.exports = Wagon;