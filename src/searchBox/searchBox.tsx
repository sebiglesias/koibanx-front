import React, {useCallback, useMemo, useState} from "react"
import {Button, Card, FormGroup, TextField} from "@mui/material";
import {
    TextMapFilterType,
    stringArrayToSearchFilterMap,
    stringArrayToBooleanSearchFilterMap, BooleanMapFilterType
} from "../common/arrayHandler";
import classes from './searchBox.module.scss'
import {SearchCheckbox} from "./searchElements/searchCheckbox/searchCheckbox";
import {SearchSelect} from "./searchElements/searchSelect/searchSelect";

export type SearchBoxProps = {
    textFieldsToSearch: string[]
    booleanFieldsToSearch: string[]
    searchTextChange: (text: string) => void
    textFieldsChange: (map: TextMapFilterType) => void
    booleanFieldsChange: (map: BooleanMapFilterType) => void
    search: () => void
}

export const SearchBox = (
    {
        textFieldsToSearch,
        booleanFieldsToSearch,
        searchTextChange,
        textFieldsChange,
        booleanFieldsChange,
        search
    }: SearchBoxProps) => {

    const [checkedTextFields, setCheckedTextFields] = useState<TextMapFilterType>
        (stringArrayToSearchFilterMap(textFieldsToSearch))
    const [checkedBooleanFields, setCheckedBooleanFields] = useState<BooleanMapFilterType>
        (stringArrayToBooleanSearchFilterMap(booleanFieldsToSearch))

    const setChecked = useCallback((id: string, checked: boolean) => {
        const map = new Map(checkedTextFields).set(id, {id, checked})
        setCheckedTextFields(map)
        textFieldsChange(map)
    }, [textFieldsChange, setCheckedTextFields, checkedTextFields])

    const setValue = useCallback((id: string, value: string) => {
        const map = new Map(checkedBooleanFields).set(id, {id, value})
        setCheckedBooleanFields(map)
        booleanFieldsChange(map)
    }, [booleanFieldsChange, setCheckedBooleanFields, checkedBooleanFields])

    const onSearchTextChange = useCallback((event) => {
        const text = event.target.value;
        searchTextChange(text)
    }, [searchTextChange])

    const textFieldCheckboxes = useMemo(() => {
        return (
            <FormGroup row>
                {textFieldsToSearch.map((field, index) => {
                    const mapValue = checkedTextFields.get(field)
                    return mapValue !== undefined &&
                        <SearchCheckbox key={index} id={field} checked={mapValue.checked} setChecked={setChecked}/>
                })}
            </FormGroup>
        )
    }, [textFieldsToSearch, checkedTextFields, setChecked])

    const booleanFieldCheckboxes = useMemo(() => {
        return (
            <FormGroup row>
                {booleanFieldsToSearch.map((field, index) => {
                    const mapValue = checkedBooleanFields.get(field)
                    return mapValue !== undefined &&
                        <SearchSelect key={index} id={field} value={mapValue.value} setValue={setValue}/>
                })}
            </FormGroup>
        )
    }, [booleanFieldsToSearch, checkedBooleanFields, setValue])

    return (
        <Card className={classes.container} variant="outlined">
            <div className={classes.fluidContainer}>
                <TextField
                    label="Search..."
                    variant="outlined"
                    onChange={onSearchTextChange}
                    type={'search'}
                    className={classes.searchBox}
                />
                <Button variant="contained" onClick={search}>Search</Button>
            </div>
            <div>
                <h3>Search in the following columns</h3>
                {textFieldCheckboxes}
            </div>
            <div>
                <h3>Additional Filters</h3>
                {booleanFieldCheckboxes}
            </div>
        </Card>
    )
}