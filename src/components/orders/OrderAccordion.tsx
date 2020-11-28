import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IOrder } from '../../interfaces/IOrder';
import { formatTime } from '../../services/date';
import { Paper, Table, TableBody, TableContainer, TableRow, TableCell } from '@material-ui/core';
import StatusButton from './StatusButton';
import { Link } from 'react-router-dom';


interface Props {
    order: IOrder,
    setUpdate: any,
}

const STATUS = {
    'RECEIVED' : 'Recebido',
    'SEPARATED' : 'Separado',
    'FINISHED' : 'Finalizado',
}

const OrderAccordion: React.FC<Props> = ({order, setUpdate}) => {
    const hour = formatTime(order.date)

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="order-title"
                    className={order.status}    
                >
                    <div className="accordion-orders order-title">
                        <div className='date-client'>
                            <span>{order.client}</span> 
                            <span className='hour'>{hour}</span>
                        </div>
                        <div className='quantity'>
                            <span> {order.shop} </span>
                            <span> {order.quantity}  {order.varied ? 'sortidos' : 'un'}</span>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='accordion-orders'>
                        <div className='edit-link'>
                            <Link to={`/pedidos/add/${order.id}`}>
                                Editar
                            </Link>
                        </div>
                        <TableContainer component={Paper} className='flavors-table'>
                            <Table size='small'>
                                <TableBody>
                                {
                                    order.snacks.map(snack=><TableRow>
                                        <TableCell>{snack.snack.name}</TableCell>
                                        <TableCell>{snack.quantity}</TableCell>
                                    </TableRow>)
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className='order-info'>
                            <div>Contato: {order.phone} </div>
                            <div>{ order.delivery && order.address }</div>
                            <div>
                                <span>R${ order.value }</span>
                                <span>{ order.paymentForm }</span>
                                { order.paid && <span className='paid' >PAGO</span>}
                            </div>
                        </div>

                        <div>
                            <StatusButton order={order} setUpdate={setUpdate}/>
                        </div>

                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default OrderAccordion;