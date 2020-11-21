import { IOrder, IAction, INITIAL_STATE } from '../../interfaces/IOrder'



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