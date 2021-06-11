export function findFirstNotUndefined(elements) {
    var title;
    Object.keys(elements).forEach((key) => {
        if (elements[key] !== undefined) {
            title = elements[key];
            return;
        } 
    })
    return title;
}

export function Capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}