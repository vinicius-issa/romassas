import { firestore } from '../../services/firebase';
import { setErrorMessage } from './errorMessage'
import { IOrder, IAction } from '../../interfaces/IOrder'

export function setOrder(order: IOrder): IAction {
    return {
        type: 'ORDER_SET',
        payload: order
    }
}

export const saveOrder = (order: IOrder) => (dispatch: any) => {
    if (order.id) {
        firestore.collection('orders').doc(order.id).set(order)
            .then(() => {
                dispatch({
                    type: 'ORDER_CLEAR'
                })
            }).catch ((error) => {
                console.error(error.code, error);
                dispatch(setErrorMessage(error.code));
            });
    } else {
        delete order.id
        firestore.collection('orders').doc().set(order)
            .then(() => {
                dispatch(
                    {
                        type: 'ORDER_CLEAR'
                    }
                );
            }).catch ((error) => {
                console.error(error.code, error);
                dispatch(setErrorMessage(error.code));
        });
    }
}