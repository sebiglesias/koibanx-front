import Container from '@mui/material/Container';
import React, {useCallback, useMemo} from 'react';
import './App.css';
import {SearchBox} from "./searchBox/searchBox";
import {Table, TableHeaders} from "./table/table";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {AppState} from "./store";
import {useDispatch, useSelector} from "react-redux";
import {useApi} from "./api/useApi";
import {setBooleanFieldMap, setMax, setSearchText, setSkip, setTextFieldMap} from "./query/querySlice";
import {BooleanMapFilterType, TextMapFilterType} from "./common/arrayHandler";
import {setData} from "./table/tableSlice";

export const App = () => {
    const {data} = useSelector((state: AppState) => state.data)
    const {query} = useSelector((state: AppState) => state.query)
    const api = useApi()
    const dispatch = useDispatch()

    const booleanFieldsChange = useCallback((map: BooleanMapFilterType) => {
        dispatch(setBooleanFieldMap(map))
    }, [dispatch])

    const search = useCallback(() => {
        api.fetchData(query).then(data => dispatch(setData(data))).catch(() => {})
    }, [api, dispatch, query])

    const searchTextChange = useCallback((text: string) => {
        dispatch(setSearchText(text))
    }, [dispatch])

    const textFieldsChange = useCallback((map: TextMapFilterType) => {
        dispatch(setTextFieldMap(map))
    }, [dispatch])

    const pageChange = useCallback((page) => {
        data !== undefined && dispatch(setSkip(data.rowsPerPage * page))
        search()
    }, [data, search, dispatch])

    const pageSizeChange = useCallback((size) => {
        // not entirely sure how the spec fits with the rowsPerPage attribute
        data !== undefined && dispatch(setMax(size))
        search()
    }, [data, search, dispatch])

    const tableData = useMemo(() => {
        return data !== undefined && data.data !== undefined ? data.data : []
    }, [data])

    const tablePagination = useMemo(() => {
        return data !== undefined ? {page: data.page, pages: data.pages, pageSize: data.rowsPerPage} : {page: 0, pages: 0, pageSize: 0}
    }, [data])

    const tableHeaders: TableHeaders[] = [
        {
            label: 'ID',
            objectAttribute: 'ID',
            type: 'text'
        },
        {
            label: 'Comercio',
            objectAttribute: 'Comercio',
            type: 'text'
        },
        {
            label: 'CUIT',
            objectAttribute: 'CUIT',
            type: 'text'
        },
        {
            label: 'Concepto1',
            objectAttribute: 'Concepto1',
            type: 'text'
        },
        {
            label: 'Concepto2',
            objectAttribute: 'Concepto2',
            type: 'text'
        },
        {
            label: 'Concepto3',
            objectAttribute: 'Concepto3',
            type: 'text'
        },
        {
            label: 'Concepto4',
            objectAttribute: 'Concepto4',
            type: 'text'
        },
        {
            label: 'Concepto5',
            objectAttribute: 'Concepto5',
            type: 'text'
        },
        {
            label: 'Concepto6',
            objectAttribute: 'Concepto6',
            type: 'text'

        },
        {
            label: 'BalanceActual',
            objectAttribute: 'BalanceActual',
            type: 'text'
        },
        {
            label: 'Activo',
            objectAttribute: 'Activo',
            type: 'boolean'
        },
        {
            label: 'UltimaVenta',
            objectAttribute: 'UltimaVenta',
            type: 'date'
        }
    ]

      return (
          <Container maxWidth="xl">
              <SearchBox
                  textFieldsToSearch={['ID', 'Comercio', 'CUIT']}
                  booleanFieldsToSearch={['Active']}
                  booleanFieldsChange={booleanFieldsChange}
                  search={search}
                  searchTextChange={searchTextChange}
                  textFieldsChange={textFieldsChange}
              />
              <Table info={tableData} headers={tableHeaders} paginationInfo={tablePagination} pageChange={pageChange} pageSizeChange={pageSizeChange}/>
              <ToastContainer/>
          </Container>
      );
}

export default App