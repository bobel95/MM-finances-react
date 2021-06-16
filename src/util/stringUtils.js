
/**
 * Utility function that formats uppercase, underscore separated strings
 * to title case, space separated strings
 * @param {string} str
 */
const formatEnumString = (str) => {
    str = str.toLowerCase();
    let res = "";
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === "_") {
            res += " ";
        } else {
            res += str.charAt(i);
        }
    }

    return res.charAt(0).toUpperCase() + res.slice(1);
}

/**
 * Returns date as string
 * formatted to "dd-MM-yyy"
 * @param {Date} date
 */
const getDateString = (date) => {
    return [
        date.getFullYear(),
        padWith0(date.getMonth() + 1),
        padWith0(date.getDate())
    ].join("-");
}

const padWith0 = (date) => {
    if (date.toString().length === 1) {
        return `0${date}`;
    }
    return date;
}

export { formatEnumString, getDateString };