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