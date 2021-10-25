import { MiscellaneousProperties } from "../../Properties/MiscellaneousProperties";

interface SectionProperty {
    resolution: number,
    elements: number
}

function sectionCondition(section: SectionProperty, array: Array<any>): boolean {
    return (window.innerWidth < section.resolution && array.length > section.elements)
}

export function isTooManySections(array: Array<any>): boolean {
    return sectionCondition(MiscellaneousProperties.section.firstSection, array) || 
        sectionCondition(MiscellaneousProperties.section.secondSection, array) || 
        sectionCondition(MiscellaneousProperties.section.thirdSection, array) || 
        array.length > MiscellaneousProperties.section.maxElements
}

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

export function spliceArrayIfNeeded(array: Array<any>, showRow: boolean): Array<any> {
    if (isTooManySections(array) && showRow) {
        return array.slice(0, numberOfSectionElements());
    }

    return array;
}