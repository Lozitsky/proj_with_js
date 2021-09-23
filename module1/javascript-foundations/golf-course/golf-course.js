class GolfCourse {
    constructor(name, difficulty, openings = 0, features = []) {
        this.name = name;
        this.difficulty = difficulty;
        this.openings = openings;
        this.features = features;
        this.currentlyPlaying = [];
    }

    checkInGroup(group) {
        if (group.length > this.openings) {
            return "Sorry, we are currently booked! Please come back later.";
        }
        // let names = group.map(golfer => golfer.name).reverse();
        this.openings -= group.length;
        this.currentlyPlaying = [...group.map(golfer => golfer.name).reverse(), ...this.currentlyPlaying];
        return "You're checked in. Have fun!";
    }
}

module.exports = GolfCourse;
