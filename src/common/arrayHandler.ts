export type TextMapFilterType = Map<string, { id: string; checked: boolean }>

// value can be 'all' | 'true' | 'false'
export type BooleanMapFilterType = Map<string, { id: string; value: string }>

/**
 * From a string array, creates a map with info about the filter's values. ID in value is redundant, but is an example
 * of extensibility, any extra info pertinent to filters could be added in as a value.
 * @param arr
 */
export const stringArrayToSearchFilterMap = (arr: string[]): TextMapFilterType => {
    const map = new Map()
    arr.forEach(elem => {
        map.set(elem, { id: elem, checked: false})
    })
    return map
}

export const stringArrayToBooleanSearchFilterMap = (arr: string[]): BooleanMapFilterType => {
    const map = new Map()
    arr.forEach(elem => {
        map.set(elem, { id: elem, value: 'all'})
    })
    return map
}