function nameMenuItem(name) {
    return `Delicious ${name}`;
}

function createMenuItem(name, price, type) {
    return {name: name, price: price, type: type};
}

function addIngredients(ingredient, arr) {
    return arr.includes(ingredient) ? arr : arr.push(ingredient);
}

function formatPrice(price) {
    return `\$${price}`;
}

function decreasePrice(price) {
    return price - price / 10;
}

function createRecipe(title, ingredients, type) {
    return {title: title, ingredients: ingredients, type: type};
}

module.exports = {
    nameMenuItem,
    createMenuItem,
    addIngredients,
    formatPrice,
    decreasePrice,
    createRecipe
}


