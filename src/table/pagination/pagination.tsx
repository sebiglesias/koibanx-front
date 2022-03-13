import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classes from './pagination.module.scss'
import {useCallback} from "react";

export type PaginationProps = {
    page: number,
    pages: number,
    pageSize: number,
    onPageChange: (page: number) => void
    onPageResize: (size: number) => void
}

export const Pagination = ({page, pages, onPageChange, onPageResize, pageSize}: PaginationProps) => {
    const changePageSize = useCallback((event) => {
        onPageResize(event.target.value)
    }, [onPageResize])

    const changePage = useCallback((pageToChange: number) => {
        console.log(pageToChange)
        onPageChange(pageToChange)
    }, [onPageChange])

    const isFirstPage = page === 1

    const isLastPage = page === pages

    return (
        <div className={classes.container}>
            <select onChange={changePageSize} value={pageSize}>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <ul className={classes.ulContainer}>
                {/*Left arrow*/}
                <li onClick={() => !isFirstPage && changePage(page-1)}><ArrowBackIcon /></li>
                {/*first page*/}
                {!isFirstPage && <li onClick={() => !isFirstPage && changePage(1)}>1</li>}
                {!isFirstPage && '... '}

                {/*current page*/}
                <li>{page}</li>

                {/*last page*/}
                {!isLastPage && '... '}
                {!isLastPage && <li onClick={() => !isFirstPage && changePage(pages)} >{pages}</li>}

                {/*right arrow*/}
                <li onClick={() => !isFirstPage && changePage(pages)}><ArrowForwardIcon /></li>
            </ul>

        </div>
    )
}