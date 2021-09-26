class Spell {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.executionHistory = [];
    }

    execute(target) {
        if (typeof target === "object") {
            this.executionHistory = [...this.executionHistory, ...target];
            return target.reduce((acc, target) => acc + `Success! You've cast a spell on the ${target}. `, "").slice(0, -1);
        }
        this.executionHistory.push(target);
        return `Success! You've cast a spell on the ${target}.`;
    }

    clearExecutionHistory() {
        // this.executionHistory.length = 0;
        this.executionHistory.splice(0, this.executionHistory.length);
    }
}

module.exports = Spell;