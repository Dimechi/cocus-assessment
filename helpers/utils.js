// utils.js
function isSortedAscending(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
}

function isSortedDescending(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < array[i + 1]) {
            return false;
        }
    }
    return true;
}

module.exports = { isSortedAscending, isSortedDescending };
