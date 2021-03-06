import { firestore } from '../../services/firebase';
import {  formatDate } from '../../services/date';
import { setErrorMessage } from './errorMessage'
import { IOrder, IAction, INITIAL_STATE } from '../../interfaces/IOrder'

export function setOrder(order: IOrder): IAction {
    return {
        type: 'ORDER_SET',
        payload: order
    }
}

export const  getOrder = (id: string) => (dispatch: any) => { 
    
    const docRef = firestore.collection('orders').doc(id);

    docRef.get().then(doc=>{
        if(doc.exists){
            let order = INITIAL_STATE;
            order = {...order ,...doc.data(), id}
            const date = new Date(order.date)
            order.date = formatDate(date)
            return dispatch(setOrder(order))
        }
    })

    return {
        type: 'ORDER_CLEAR',
    }

}

export const saveOrder = (order: IOrder) => (dispatch: any) => {
    const date = new Date(order.date)
    order.date = date.getTime();
    order.value = +order.value
    order.quantity = +order.quantity

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
                dispatch(setErrorMessage(error.code));
        });
    }
}