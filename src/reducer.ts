import { combineReducers } from 'redux'
import dataReducer from "./table/tableSlice";
import queryReducer from "./query/querySlice";
import { enableMapSet } from 'immer'

enableMapSet()
const rootReducer = combineReducers({
    data: dataReducer,
    query: queryReducer
})

export default rootReducer
