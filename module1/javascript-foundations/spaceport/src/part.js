class Part {
    constructor(obj) {
        this.name = obj.name;
        this.type = obj.type;
        this.value = obj.value;
        this.broken = false;
        this.checkForValidity = `This part needs a ${!this.name ? 'name' :
            !this.type ? 'type' :
            !this.value ? 'value' :
                undefined}!`;
        this.isValid = !!this.name && !!this.type && !!this.value;
    }
}

module.exports = Part;