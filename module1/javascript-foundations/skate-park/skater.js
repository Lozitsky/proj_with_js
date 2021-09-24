class Skater {
    constructor(obj) {
        this.name = obj.name;
        this.skill = obj.skill;
        this.tricks = obj.tricks ? obj.tricks : [];
        this.money = obj.cash;
        this.frustration = 0;
        this.knownTricks = {};
    }

    practice(trick) {
        if (!this.tricks[trick]) {
            if (this.knownTricks[trick]) {
                this.knownTricks[trick] = this.knownTricks[trick] + 1;
                if ((this.knownTricks[trick] | 0) > 2) {
                    this.tricks[trick] = true;
                    // console.log(`I just learned to ${trick}!!!`);
                    this.frustration = 0;
                    return `I just learned to ${trick}!!!`;
                }
            } else {
                this.knownTricks[trick] = 1;
            }
            this.frustration++;
        }
    }
}

module.exports = Skater;