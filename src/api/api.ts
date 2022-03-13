import {toast} from "react-toastify";
import {mockData} from "../common/mockData";

export type Data = {
    data: {
        ID: string,
        Comercio: string,
        CUIT: string,
        Concepto1: number,
        Concepto2: number,
        Concepto3: number,
        Concepto4: number,
        Concepto5: number,
        Concepto6: number,
        BalanceActual: string,
        Activo: boolean,
        UltimaVenta: string
    }[]
    page: number,
    pages: number,
    rowsPerPage: number,
    total: number
}

export class Api {
    private baseUrl =  'https://api.koibanx.com/stores'
    fetchData(query: string): Promise<Data> {
        toast(this.baseUrl + query)
        console.log(this.baseUrl + query)
        // should perform a fetch to the api, but mocking data instead
        return Promise.resolve(mockData)
    }
}