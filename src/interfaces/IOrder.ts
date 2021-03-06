import { ISnack } from './ISnack'

const now = new Date()
export const INITIAL_STATE:IOrder = {
    id : '',
    client : '',
    phone : '',
    date : now.getTime(),
    shop : 'MATRIZ',
    delivery : false,
    address : '',
    quantity : 0,
    snacks : [],
    value : 0,
    paid : false,
    paymentForm : '',
    status : 'RECEIVED',
    varied : true,
    note: ''
}

export interface ISnackQty{
    quantity: number;
    snack: ISnack;
}

export interface IAction {
    type: string;
    payload?: IOrder;
}

export interface IOrder{
    id ?: string;
    client: string;
    phone: string;
    date: Date | string | number;
    shop: string;
    delivery: boolean;
    address: string;
    quantity: number;
    snacks: ISnackQty[];
    value: number;
    paid: boolean;
    paymentForm: string;
    status: 'RECEIVED' |  'SEPARATED' | 'FINISHED' ;
    varied: boolean;
    note: string;
}