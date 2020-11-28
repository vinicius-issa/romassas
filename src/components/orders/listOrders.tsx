import { firestore } from '../../services/firebase';
import React, { useEffect, useState } from 'react';
import { INITIAL_STATE, IOrder } from '../../interfaces/IOrder';
import OrderAccordion from './OrderAccordion';
import { Grid } from '@material-ui/core';

import './listOrder.css'


function ListOrder(props:any) {
    const [orders,setOrders] = useState<IOrder[]>([])
    const [update, setUpdate] = useState(0)
    
    useEffect(()=>{
        const start = new Date("1980-01-01T00:00").getTime()
        const end = new Date("2030-01-01T23:59").getTime()
        const savedOrders:IOrder[] = []
        const docRef = firestore.collection('orders').where('date','>',start).where('date','<',end);
        docRef.get().then(snapshot=>{
            snapshot.forEach(doc=>{
                const newOrder = INITIAL_STATE
                savedOrders.push({...newOrder, id:doc.id, ...doc.data()})
            })
            setOrders(savedOrders)
        })
    },[setOrders, firestore, update])
    
    return (
        <div id='list-orders'>
            <Grid container spacing={2} >
                {orders.map(order=>(
                    <Grid item xs={12} sm={6} md={3}>
                        <OrderAccordion order={order} setUpdate={setUpdate}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ListOrder;