import {Pagination} from "./pagination/pagination";
import {useCallback, useMemo} from "react";
import classes from './table.module.scss'
import moment from "moment";

export type TableHeaders = {
    label: string,
    objectAttribute: string,
    type: 'text' | 'date' | 'boolean'
}

export type TableProps = {
    info: Object[],
    paginationInfo: {page: number, pages: number, pageSize: number}
    headers: TableHeaders[]
    pageChange: (page: number) => void
    pageSizeChange: (page: number) => void
}

export const Table = ({info, headers, paginationInfo, pageChange, pageSizeChange}: TableProps) => {

    const onPageChange = useCallback((page: number) => pageChange(page), [pageChange])
    const onPageResize = useCallback((size: number) => pageSizeChange(size), [pageSizeChange])

    const pagination = useMemo(() =>
        <Pagination
            page={paginationInfo.page}
            pages={paginationInfo.pages}
            pageSize={paginationInfo.pageSize}
            onPageChange={onPageChange} onPageResize={onPageResize}/>,
        [paginationInfo, onPageChange, onPageResize])

    const rows = useMemo(() => {
        return info !== undefined && info.map((row, index) => {
            return <tr className={classes.row} key={index}>
                {headers.map((h, index) => {

                    // @ts-ignore
                    const rowElement = row[h.objectAttribute];
                    let result = rowElement
                    if (h.type === 'date') {
                        result = moment(rowElement, 'DD/MM/YYYY').format('DD/MM/YYYY').toString()
                    } else if (h.type === 'boolean') {
                        result = h.type ? `Is ${h.label}` : `Not ${h.label}`
                    }
                    return <td key={index} className={classes.cell}>{result}</td>
                })}
            </tr>
        })
    }, [info, headers])

    const table = useMemo(() => {
        return (
            <div className={classes.tableContainer}>
                {pagination}
                <table className={classes.table}>
                    <thead>
                    <tr className={classes.row}>
                        {headers.map((h, index) => {
                            return <th key={index} className={classes.header}>{h.label}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                {pagination}</div>
        )
    }, [pagination, rows, headers])

    return (
        <>
            {info.length > 0 && table}
            {info.length === 0 && <h1>No info to show</h1>}
        </>
    )
}