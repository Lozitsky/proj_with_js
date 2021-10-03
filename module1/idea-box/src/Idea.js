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
        ideas.splice(getId(this.id), 1);
        localStorage.removeItem("idea");
    }

    updateIdea() {
        ideas.find(idea => {
            if ((idea.id === this.id)) {
                this.star = !this.star;
                return true;
            }
        });
        localStorage.setItem("idea", JSON.stringify(this));
    }
}