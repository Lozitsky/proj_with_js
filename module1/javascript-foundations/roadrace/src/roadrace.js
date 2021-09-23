class Roadrace {
    constructor(obj) {
        this.name = obj.title;
        this.location = obj.city;
        this.distance = 0;
        this.participants = [];
    }

    setDistance(miles) {
        this.distance = miles;
        return `The ${this.name} in ${this.location} is a ${miles} mile race.`;
    }

    registerParticipants(participant) {
        this.participants.push(participant);
    }

    completeRace() {
        this.participants.forEach(p => p.runRace(this.name, this.distance));
    }
}

module.exports = Roadrace;
