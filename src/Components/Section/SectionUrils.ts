import { MiscellaneousProperties } from "../../Properties/MiscellaneousProperties";

/**
 * Check if the array has to many elements for a given resolution.
 * @param array Array to be checked.
 * @returns Does the element have to many elements?
 */
export function isTooManySections(array: Array<any>): boolean {
    return array.length > numberOfSectionElements();
}

/**
 * Returns the number of maximuym elements for a given resolution.
 */
export function numberOfSectionElements(): number {
    //From smallest resolution to biggest

    if (window.innerWidth < MiscellaneousProperties.section.thirdSection.resolution) {
        return MiscellaneousProperties.section.thirdSection.elements;
    }

    if (window.innerWidth < MiscellaneousProperties.section.secondSection.resolution) {
        return MiscellaneousProperties.section.secondSection.elements;
    }

    if (window.innerWidth < MiscellaneousProperties.section.firstSection.resolution) {
        return MiscellaneousProperties.section.firstSection.elements;
    }

    return MiscellaneousProperties.section.maxElements;
}

/**
 * Small utility method, used to splice the array to a smaller collection depending on the screen resolution.
 * If the number of element is smaller that the maximum number for a given resolution, it returns the original array.
 * Additionally, if the {@param splice} is true, return the array without trying to splice.
 * @param array The array that could be sliced.
 * @param splice Should the array be even spliced?
 * @returns Array, that may be spliced.
 */
export function spliceArrayIfNeeded(array: Array<any>, splice: boolean): Array<any> {
    if (splice && isTooManySections(array)) {
        return array.slice(0, numberOfSectionElements());
    }

    return array;
}