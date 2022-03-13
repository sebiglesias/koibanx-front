import {BooleanMapFilterType, TextMapFilterType} from "../common/arrayHandler";

export const generateQuery = (searchText: string, textFieldMap: TextMapFilterType, booleanFieldMap: BooleanMapFilterType, skip: number, max: number): string => {

    const textResult = generateSearchTextQuery(searchText, textFieldMap)
    const booleanResult = generateBooleanQuery(booleanFieldMap)
    const skipResult = generateSkipQuery(skip)
    const maxResult = generateMaxQuery(max)
    const result = textResult.length > 0 && booleanResult.length > 0 ? `${textResult},${booleanResult}` : textResult + booleanResult
    return `q={ ${result} }${maxResult}${skipResult}`
}

export const generateSearchTextQuery = (searchText: string, textFieldMap: TextMapFilterType): string => {
    let textResult = ''
    if (searchText.length > 0) {
        const values = textFieldMap.values();
        let elem = values.next()
        // making column text searches as an or
        textResult = '$or: [ '
        let innerText = ''
        while(elem.value !== undefined) {
            if (elem.value.checked) {
                // assuming text searches will be as a %like% sql search
                const likeRegex = '^.*?' + searchText + '.*?$'
                innerText = innerText + ` {"${elem.value.id}" : {"$regex" : "${likeRegex}"}},`
            }
            elem = values.next()
        }
        // slice removes last comma character
        innerText = innerText.slice(0, -1)
        textResult = innerText.length > 0 ? textResult + innerText + ' ]' : ''
    }
    return textResult
}

export const generateBooleanQuery = (booleanFieldMap: BooleanMapFilterType): string => {
    let booleanResult = ''
    // boolean query
    const booleanValues = booleanFieldMap.values();
    let booleanElem = booleanValues.next();
    while (booleanElem !== undefined && booleanElem.value !== undefined) {
        if (booleanElem.value.value === 'true') {
            booleanResult = booleanResult + ` "${booleanElem.value.id}": "1",`
        } else if (booleanElem.value.value === 'false') {
            booleanResult = booleanResult + ` "${booleanElem.value.id}": "0",`
        }
        booleanElem = booleanValues.next();
    }
    // slice removes last comma character
    booleanResult = booleanResult.slice(0, -1)
    return booleanResult
}

export const generateSkipQuery = (skip: number): string => {
    return `&skip=${skip}`
}
export const generateMaxQuery = (max: number): string => {
    return `&max=${max}`
}