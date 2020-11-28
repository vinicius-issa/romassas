import { Button } from '@material-ui/core';
import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { IOrder } from '../../interfaces/IOrder';
import { saveOrder } from '../../store/actions/order';

interface Props{
    save: any;
    order: IOrder;
    setUpdate:any;
}


const StatusButton:React.FC<Props> = ({order,save,setUpdate}) => {

    const handleClick = (order:IOrder, event:MouseEvent) => {
        event.preventDefault()
        if(order.status==='RECEIVED'){
            order.status='SEPARATED'
        }
        else{
            order.status='FINISHED'
        }

        save(order)
        setUpdate((value:number)=>value+1)
    }

    if(order.status==='RECEIVED' && order.varied){
        return (
            <Button fullWidth className='status'  variant="contained" href={`/pedidos/add/${order.id}`}>
                Separar
            </Button>
        );
    }
    else if(order.status==='RECEIVED'){
        return (
            <Button fullWidth className='status'  variant="contained" onClick={e=>handleClick(order,e)}>
                Separar
            </Button>
        )
    }
    else if(order.status==='SEPARATED'){
        return (
            <Button fullWidth className='status'  variant="contained" color='primary' onClick={e=>handleClick(order,e)}>
                Finalizar
            </Button>
        )
    }
    
    return (
        <Button fullWidth className='status'  variant="contained" disabled>
            Finalizado
        </Button>
    )
}

function mapDispatchToProps(dispatch: any){
    return{
        save(order: IOrder) {
            const action = saveOrder(order)
            dispatch(action);
        },
    }
}

export default connect(null,mapDispatchToProps)(StatusButton);