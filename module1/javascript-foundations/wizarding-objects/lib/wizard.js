class Wizard {
    constructor(obj) {
        this.name = obj.name;
        this.petsCount = 0;
        this.pets = [];
    }

    adoptPet(pet) {
        this.pets.push(pet);
        this.petsCount++;
    }

    petList() {
        return this.pets.reduce(
            (acc, pet) => acc + `A${pet.type === "owl" ? "n" : ""} ${pet.type} named ${pet.name}; `, "")
            .replace(/;.$/, ".");
    }

    getWand(wand) {
        this.wand = wand;
    }

    castSpell(spell) {
        return `Casting ${spell}!`;
    }
}

module.exports = Wizard;