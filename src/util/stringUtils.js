
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

export { formatEnumString };