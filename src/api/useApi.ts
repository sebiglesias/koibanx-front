import {useMemo} from "react";
import {Api} from "./api";

export const useApi = () => {
    return useMemo(() => {
        return new Api()
    }, [])
}