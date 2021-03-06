class Activity {
    blocked;
    completed;

    constructor(
        category,
        description,
        minutes,
        seconds,
        id
    ) {
        this.category = category;
        this.description = description;
        this.minutes = minutes;
        this.seconds = seconds;
        this.id = id;
    }

    countdown(display_min, display_sec) {
        if (!this.blocked) {
            this.blocked = true;
            let duration = this.minutes * 60 + (this.seconds | 0);
            startTimer(duration, display_min, display_sec);
        }
    }

    markComplete() {
        // this.blocked = false;
        this.completed = true;
    }

    saveToStorage() {
        loggedCards.push(this);
        localStorage.setItem("loggedCards", JSON.stringify(loggedCards));
    }

}

function startTimer(duration, display_min, display_sec) {
    let start = Date.now(),
        diff,
        minutes,
        seconds;
    let interval;

    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;
        // minutes = minutes < 10 ? "0" + minutes : minutes;
        // seconds = seconds < 10 ? "0" + seconds : seconds;

        // display.textContent = minutes + ":" + seconds;
        display_min.textContent = getTimeFormat(minutes);
        display_sec.textContent = getTimeFormat(seconds);

        if (diff <= 0) {
            clearInterval(interval);
            activity.markComplete();
        }
    }

    // we don't want to wait a full second before the timer starts
    timer();
    interval = setInterval(timer, 1000);
    // setTimeout(alert, duration * 1000+1000, "Time completed!");
}

const categories = {
    study: "Study",
    meditate: "Meditate",
    exercise: "Exercise"
}