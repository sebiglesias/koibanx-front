import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {BooleanMapFilterType, TextMapFilterType} from "../common/arrayHandler";
import {generateQuery} from "./urlGenerator";

export type DataState = {
    searchText: string,
    textFieldMap: TextMapFilterType,
    booleanFieldMap: BooleanMapFilterType,
    skip: number, // used for pagination, skip x number of records
    max: number, // used for pagination, retrieve a max amount of records
    query: string
}

const initialState: DataState = {
    searchText: '',
    textFieldMap: new Map(),
    booleanFieldMap: new Map(),
    skip: 0,
    max: 50,
    query: ''
}

const slice = createSlice({
    initialState,
    name: 'data',
    reducers: {
        setSearchText(state, {payload}: PayloadAction<string>) {
            state.searchText = payload
            state.query = generateQuery(state.searchText, state.textFieldMap, state.booleanFieldMap, state.skip, state.max)
        },
        setTextFieldMap(state, {payload}: PayloadAction<TextMapFilterType>) {
            state.textFieldMap = payload
            state.query = generateQuery(state.searchText, state.textFieldMap, state.booleanFieldMap, state.skip, state.max)
        },
        setBooleanFieldMap(state, {payload}: PayloadAction<BooleanMapFilterType>) {
            state.booleanFieldMap = payload
            state.query = generateQuery(state.searchText, state.textFieldMap, state.booleanFieldMap, state.skip, state.max)
        },
        setSkip(state, {payload}: PayloadAction<number>) {
            state.skip = payload
            state.query = generateQuery(state.searchText, state.textFieldMap, state.booleanFieldMap, state.skip, state.max)
        },
        setMax(state, {payload}: PayloadAction<number>) {
            state.max = payload
            state.query = generateQuery(state.searchText, state.textFieldMap, state.booleanFieldMap, state.skip, state.max)
        }
    }
})

export const {setSearchText, setTextFieldMap, setBooleanFieldMap, setSkip, setMax} = slice.actions

export default slice.reducer