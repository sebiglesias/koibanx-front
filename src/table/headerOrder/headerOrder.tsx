import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useCallback, useState} from "react";
import classes from './headerOrder.module.scss'
export type HeaderOrderProps = {
    onChange: (header: string, order: 'asc' | 'desc' | 'none') => void
    header: string
}

export const HeaderOrder = ({onChange, header}: HeaderOrderProps) => {
    const [order, setOrder] = useState<'asc'|'desc'|'none'>('none')

    const onAscClick = useCallback(() => {
        setOrder('asc')
        onChange(header, 'asc')
    }, [header, onChange])
    const onDescClick = useCallback(() => {
        setOrder('desc')
        onChange(header, 'desc')
    }, [onChange, header])
    const onCancelClick = useCallback(() => {
        setOrder('none')
        onChange(header, 'none')
    }, [onChange, header])

    return (
        <div>
            {order === 'none' && <ArrowUpwardIcon onClick={onAscClick} />}
            {order === 'asc' && <ArrowDownwardIcon onClick={onDescClick}/>}
            {order === 'desc' && <ArrowUpwardIcon className={classes.cancelArrow} onClick={onCancelClick}/>}
        </div>
    )
}