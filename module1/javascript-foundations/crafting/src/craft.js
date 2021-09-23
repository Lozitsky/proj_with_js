class Craft {
    constructor(obj) {
        this.name = obj.type;
        this.materials = [];
        this.completed = false;
        if (obj.materials) {
            this.materials = obj.materials;
        }
    }

    completeCraft() {
        this.completed = true;
        return "All done! It looks great!";
    }

    calculateProjectTotal() {
        return this.materials.reduce((pv, nv) => pv + nv.calculateMaterialCost(), 0);
    }
}

module.exports = Craft;
