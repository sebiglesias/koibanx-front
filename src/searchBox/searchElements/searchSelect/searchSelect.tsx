import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useCallback} from "react";

export type SearchSelectProps = {
    id: string,
    value: string,
    setValue: (id: string, vlaue: string) => void
}

export const SearchSelect = ({id, value, setValue}: SearchSelectProps) => {

    const setSelectValue = useCallback((event) => {
        setValue(id, event.target.value)
    }, [setValue, id, value])

    return (
        <FormControl>
            <InputLabel>{id}</InputLabel>
            <Select
                value={value}
                label={id}
                onChange={setSelectValue}
            >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'true'}>Only {id}</MenuItem>
                <MenuItem value={'false'}>Only not {id}</MenuItem>
            </Select>
        </FormControl>
    )
}