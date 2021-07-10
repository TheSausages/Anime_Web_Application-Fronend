export function findFirstNotUndefined(elements) {
    var title;
    Object.keys(elements).forEach((key) => {
        if (elements[key] !== undefined) {
            title = elements[key];
            return title;
        } 
    })
    return title;
}

export function titlesInWantedOrder(titles) {
    if (titles.english !== undefined) {
        return titles.english
    }

    if (titles.romaji !== undefined) {
        return titles.romaji
    }

    return titles.native
}

export function Capitalize(value) {
    if (typeof value === 'string') {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
}

export function valueOrNotKnown(value) {
    return value === undefined ? "Not Known" : Capitalize(value)
}

export function dateOrNotKnown(value) {
    return value.year === undefined ? "Not Known" : (value.day + '.' + value.month + '.' + value.year)
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color
  }