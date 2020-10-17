import { IOrder, IAction } from '../../interfaces/IOrder'

const now = new Date()

const INITIAL_STATE = {
    id : undefined,
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

export default function (state:IOrder = INITIAL_STATE, action: IAction) {
    switch (action.type) {
        case 'ORDER_CLEAR':
            return INITIAL_STATE;
        case 'ORDER_SET':
            return action.payload
        case 'ORDER_SAVE':
            return action.payload
        case 'ORDER_GET':
        default:
            return state;
    }
}