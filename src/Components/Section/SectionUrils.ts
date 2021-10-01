export function isTooManySections(array: Array<any>): boolean {
    return (window.innerWidth < 960 && array.length > 2) || (window.innerWidth < 1100 && array.length > 3) || (window.innerWidth < 1350 && array.length > 4) || array.length > 6
}

export function numberOfSectionElements(): number {
    if (window.innerWidth < 960) {
        return 2;
    }

    if (window.innerWidth < 1100) {
        return 3;
    }

    if (window.innerWidth < 1350) {
        return 4;
    }

    return 6;
}

export function spliceArrayIfNeeded(array: Array<any>, showRow: boolean): Array<any> {
    if (isTooManySections(array) && showRow) {
        return array.slice(0, numberOfSectionElements());
    }

    return array;
}