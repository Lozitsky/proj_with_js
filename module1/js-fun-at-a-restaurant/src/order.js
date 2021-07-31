function takeOrder(erder, arr) {
    if (arr.length < 3) {
        arr.push(erder);
    }
}

function refundOrder(number, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].orderNumber === number) {
            arr.splice(i, 1);
            return;
        }
    }
}

function listItems(arr) {
    return arr.map(value => value.item).join(", ");
}

function searchOrder(arr, name) {
    for (let order of arr) {
        if (order.item === name) {
            return true;
        }
    }
    return false;
}

module.exports = {
    takeOrder,
    refundOrder,
    listItems,
    searchOrder
}

