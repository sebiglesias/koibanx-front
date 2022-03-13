import {Checkbox, FormControlLabel} from "@mui/material";
import React, {useCallback} from "react";

export type SearchCheckboxProps = {
    checked: boolean
    id: string
    setChecked: (id: string, check: boolean) => void
}

export const SearchCheckbox = ({checked, id, setChecked}: SearchCheckboxProps) => {

    const onChangeCheck = useCallback(() => {
        setChecked(id, !checked)
    }, [setChecked, id, checked])


    return (
        <FormControlLabel
            control={ <Checkbox
                checked={checked}
                onChange={onChangeCheck}/>}
            label={id}/>
    )
}