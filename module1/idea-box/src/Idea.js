class Idea {
    constructor(title, body, star = false) {
        if (typeof title === "object") {
            this.title = title.title;
            this.body = title.body;
            this.star = title.star;
            this.id = title.id;
        } else {
            this.title = title;
            this.body = body;
            this.star = star;
            this.id = Date.now();
        }
    }

    saveToStorage() {
        ideas.push(this);
        localStorage.setItem("ideas", JSON.stringify(ideas));
    }

    deleteFromStorage() {
        ideas.splice(getId(this.id), 1);
        localStorage.setItem("ideas", JSON.stringify(ideas));
    }

    updateIdea() {
        ideas.find(idea => {
            if ((idea.id === this.id)) {
                this.star = !this.star;
                return true;
            }
        });
        localStorage.setItem("ideas", JSON.stringify(ideas));
    }
}