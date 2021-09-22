class Fairy {
    constructor(name) {
        this.name = name;
        this.dust = 10;
        this.clothes = {dresses: ['Iris']};
        this.disposition = "Good natured";
        this.humanWards = [];
    }

    receiveBelief() {
        this.dust++;
    }

    believe() {
        this.dust += 10;
    }

    makeDresses(strings) {
        this.clothes = {dresses: [...this.clothes.dresses, ...strings]};
    }

    becomeProvoked() {
        this.disposition = "Vengeful";
    }

    replaceInfant(infant) {
        if (this.disposition === "Vengeful") {
            infant.disposition = "Malicious";
            this.humanWards.push(infant);
            if (this.humanWards.length > 2) {
                this.disposition = "Good natured";
            }
        }
        return infant;
    }
}

module.exports = Fairy;