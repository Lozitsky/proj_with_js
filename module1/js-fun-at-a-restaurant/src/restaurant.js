function createRestaurant(name) {
    return {name: name, menus: {breakfast: [], lunch: [], dinner: []}};
}

function addMenuItem(restourant, menu) {
    if (!restourant.menus[menu.type].includes(menu)) {
        restourant.menus[menu.type].push(menu);
    }
}

function removeMenuItem(restourant, nameMenu, type) {
    if (!restourant.menus[type].find(menu => menu.name === nameMenu)) {
        return `Sorry, we don't sell ${nameMenu}, try adding a new recipe!`;
    }

    restourant.menus[type] = restourant.menus[type].filter(menu => menu.name !== nameMenu);

    if (!restourant.menus[type].length) {
        return `No one is eating our ${nameMenu} - it has been removed from the ${type} menu!`;
    }
}

module.exports = {
    createRestaurant,
    addMenuItem,
    removeMenuItem
}