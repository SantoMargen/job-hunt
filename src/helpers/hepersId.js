const generateId = (prefix, num, size) => {
    let newId = num + "";
    if (size > 1) {
        while (newId.length < size) {
            newId = "0" + newId;
        }
    } else {
        newId = num
    }
    return `${prefix}${newId}`;
}

const splitId = (id) => {
    const regex = /^([a-zA-Z]+)(\d+)$/;
    const matches = id.match(regex);

    if (matches) {
        const prefix = matches[1];
        const numberPart = parseInt(matches[2]);

        return numberPart
    } else {
        return 'Invalid combined string format'
    }
}

module.exports = {
    generateId, splitId
}