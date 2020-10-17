import { firestore } from '../../services/firebase';
import  {setErrorMessage} from './errorMessage'
import { IOrder, IAction } from '../../interfaces/IOrder'

export function setOrder(order:IOrder):IAction{
    return {
        type: 'ORDER_SET',
        payload: order
    }
}