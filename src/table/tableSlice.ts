import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Data} from "../api/api";

export type DataState = {
    data?: Data,
    loading: boolean
}

const initialState: DataState = {
    data: undefined,
    loading: false,
}

const slice = createSlice({
    initialState,
    name: 'data',
    reducers: {
        setData(state, {payload}: PayloadAction<Data>) {
            state.data = payload
        },
        setLoading(state, {payload}: PayloadAction<boolean>) {
            state.loading = payload
        }
    }
})

export const {setData, setLoading} = slice.actions

export default slice.reducer