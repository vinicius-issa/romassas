import { firestore } from '../../services/firebase';
import React, { useEffect, useState } from 'react';
import { INITIAL_STATE, IOrder } from '../../interfaces/IOrder';
import OrderAccordion from './OrderAccordion';
import { Grid } from '@material-ui/core';
import useFilter from '../../hooks/useFilter';

import './listOrder.css'


function ListOrder(props:any) {
    const [orders,setOrders] = useState<IOrder[]>([])
    const [update, setUpdate] = useState(0)
    const [filter,] = useFilter()
    
    useEffect(()=>{
        const {start,end} = filter
        const savedOrders:IOrder[] = []
        const docRef = firestore.collection('orders').where('date','>',start).where('date','<',end);
        docRef.get().then(snapshot=>{
            snapshot.forEach(doc=>{
                const newOrder = INITIAL_STATE
                savedOrders.push({...newOrder, id:doc.id, ...doc.data()})
            })
            setOrders(savedOrders)
        })
    },[setOrders, update, filter])
    
    return (
        <div id='list-orders'>
            {
                orders.length > 0 ? 
                <Grid container spacing={2} >
                    {orders.map(order=>(
                        <Grid item xs={12} sm={6} md={3}>
                            <OrderAccordion order={order} setUpdate={setUpdate}/>
                        </Grid>
                    ))}
                </Grid> : 
                <div>
                    Ainda não há pedidos para a data selecionada
                </div>
            }
        </div>
    );
}

export default ListOrder;