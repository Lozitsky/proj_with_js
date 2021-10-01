class Idea {
    constructor(title, body, star = false) {
        this.title = title;
        this.body = body;
        this.star = star;
        this.id = Date.now();
    }

    saveToStorage() {
        ideas.push(this);
        localStorage.setItem("idea", JSON.stringify(this));
    }

    deleteFromStorage() {
        localStorage.removeItem("idea");
    }

    updateIdea(star) {
        let idea = ideas.find((idea, id) => {
            if ((idea.id === this.id)) {
                this.star = star;
                ideas[id] = idea;
            }
        });
        this.saveToStorage();
    }
}