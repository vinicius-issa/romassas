import { ISnack } from './ISnack'

export interface ISnackQty{
    quantity: number;
    snack: ISnack;
}

export interface IAction {
    type: string;
    payload: IOrder;
}

export interface IOrder{
    id ?: string;
    client: string;
    phone: string;
    date: number;
    shop: string;
    delivery: boolean;
    address: string;
    quantity: number;
    snacks: ISnackQty[];
    value: number;
    paid: boolean;
    paymentForm: string;
    status: string;
    varied: boolean;
    note: string;
}