import React from 'react'
import { connect } from 'react-redux'

import { Container, TextField, Button, Select, FormGroup, FormControl, InputLabel, Input, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import { setOrder } from '../../store/actions/order';
import { IOrder, IAction } from '../../interfaces/IOrder'

interface Props {
    order: IOrder,
    changeOrder: any,
}

const Order: React.FC<Props> = ({ order, changeOrder }) => {

    const handleChangeOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const field = event.currentTarget.name
        changeOrder({
            ...order,
            [field]: event.currentTarget.value
        })
    }

    const handleSelectOrder = (event: React.ChangeEvent<{ value: unknown, name?: any }>) => {
        event.preventDefault();
        const field = event.target.name
        changeOrder({
            ...order,
            [field]: event.target.value
        })
    }

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name
        changeOrder({
            ...order,
            [field]: event.target.checked
        })
    }

    return (
        <Container maxWidth='sm' style={{marginBottom:'20px'}}>
            <h1>{order.id ? 'Editar Pedido' : 'Novo Pedido'}</h1>

            <FormControl fullWidth={true}>
                <InputLabel htmlFor="client">Nome do Cliente</InputLabel>
                <Input id='client' name='client' value={order.client} onChange={handleChangeOrder} />
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel htmlFor="phone">Telefone de Contato</InputLabel>
                <Input id='phone' name='phone' value={order.phone} onChange={handleChangeOrder} />
            </FormControl>

            <FormControl fullWidth={true}>
                <TextField
                    id="date"
                    label="Data do Pedido"
                    type="datetime-local"
                    defaultValue={order.date} //Dont working. TODO
                    name='date'
                    onChange={handleChangeOrder}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel id="shop">Unidade</InputLabel>
                <Select
                    labelId='shop'
                    value={order.shop}
                    name='shop'
                    onChange={handleSelectOrder}
                >
                    <MenuItem value='MATRIZ'>Matriz</MenuItem>
                    <MenuItem value='VILA'>Vila</MenuItem>
                    <MenuItem value='HE'>HE</MenuItem>

                </Select>
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel htmlFor="quantity">Quantidade</InputLabel>
                <Input id='quantity' name='quantity' type='number' value={order.quantity} onChange={handleChangeOrder} />
            </FormControl>

            <FormControl fullWidth={true}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={order.varied}
                            onChange={handleSwitch}
                            name="varied"
                            color="primary"
                        />
                    }
                    label="Sortidos"
                />
            </FormControl>



            <FormControl fullWidth={true}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={order.delivery}
                            onChange={handleSwitch}
                            name="delivery"
                            color="primary"
                        />
                    }
                    label="Entregar"
                />
            </FormControl>

            { order.delivery &&
                <FormControl fullWidth={true}>
                    <InputLabel htmlFor="address">Endereço</InputLabel>
                    <Input id='address' name='address' value={order.address} onChange={handleChangeOrder} />
                </FormControl>
            }
            
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="value">Valor Total</InputLabel>
                <Input id='value' name='value' type='number' value={order.value} onChange={handleChangeOrder} />
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel id="paymentForm">Forma de Pagamento</InputLabel>
                <Select
                    labelId='paymentForm'
                    value={order.paymentForm}
                    name='paymentForm'
                    onChange={handleSelectOrder}
                >
                    <MenuItem value='DINHEIRO'>Dinheiro</MenuItem>
                    <MenuItem value='CARTAO'>Cartão</MenuItem>
                    <MenuItem value='IFOOD'>IFood/UaiRango</MenuItem>
                    <MenuItem value='PENDURA'>Pendura</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth={true}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={order.paid}
                            onChange={handleSwitch}
                            name="paid"
                            color="primary"
                        />
                    }
                    label="Pago"
                />
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel id="status">Status do Pedido</InputLabel>
                <Select
                    labelId='status'
                    value={order.status}
                    name='status'
                    onChange={handleSelectOrder}
                >
                    <MenuItem value='RECEIVED'>Pedido Recebido</MenuItem>
                    <MenuItem value='SEPARATED'>Pedido Separado</MenuItem>
                    <MenuItem value='FINISHED'>Finalizado</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel htmlFor="note">Observação</InputLabel>
                <Input id='note' name='note' value={order.note} onChange={handleChangeOrder} />
            </FormControl>

            <FormControl fullWidth={true} style={{marginTop:'10px'}}>
                <Button variant='contained' color='primary' onClick={()=>console.log(order)}>Salvar</Button>
            </FormControl>

        </Container>
    )
}

function mapDispatchToProps(dispatch: any) {
    return {
        changeOrder(order: IOrder) {
            const action = setOrder(order)
            dispatch(action);
        },
    }
}

function mapStateToProps(state: any) {
    return {
        order: state.order,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);