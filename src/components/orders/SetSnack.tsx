import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Paper,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableContainer,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TableHead,
    Input,
    TextField,
    Button
} from '@material-ui/core';

import { IOrder, ISnackQty } from '../../interfaces/IOrder'
import { ISnack } from '../../interfaces/ISnack'
import { setOrder } from '../../store/actions/order';
import { listSnacks, setSnack } from '../../store/actions/snack'
import { Autocomplete } from '@material-ui/lab';

interface Props {
    order: IOrder,
    changeOrder: any,
    listAllSnacks: any,
    snackList: ISnack[],
}

const SetSnack: React.FC<Props> = ({ order, changeOrder, snackList, listAllSnacks }) => {
    const defaultSnack = {snack:{name:'',type:'', id:undefined},'quantity':0};
    const [newSnackQty, setNewSnackQty] = useState<ISnackQty>(defaultSnack)
    const [autocompleteValue, setAutocompleteValue] = useState('')

    useEffect(() => {
        listAllSnacks()
    },[])

    const handleChangeSnackName = (event: React.ChangeEvent<any>, snack: ISnack | null) => {
        if(snack){
            setNewSnackQty({...newSnackQty, snack})
        }
    }

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const value = parseInt(event.target.value)
        setNewSnackQty( (snackQty)=>({
            ...snackQty,
            quantity:value
        }))
    }

    const addSnacks = (event: React.MouseEvent) => {
        if(!newSnackQty.snack.id){
            return
        }
        
        const snacksOrdered = order.snacks.slice();
        snacksOrdered.push(newSnackQty)
        changeOrder({...order,snacks:snacksOrdered})
        setNewSnackQty(defaultSnack)
        setAutocompleteValue('')
    }

    return (<div>

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Sabor</TableCell>
                        <TableCell>Quantidade</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        order.snacks.map((snack,index) => (
                            <TableRow>
                                <TableCell>{snack.snack.name}</TableCell>
                                <TableCell>{snack.quantity}</TableCell>
                                <TableCell>X</TableCell>
                            </TableRow>
                        ))
                    }

                    <TableRow>
                        <TableCell>
                            <FormControl fullWidth={true}>
                                <Autocomplete
                                    options={snackList}
                                    getOptionLabel={(option:ISnack)=>option.name}
                                    onChange={handleChangeSnackName}
                                    inputValue={autocompleteValue}
                                    onInputChange={(e,newValue)=>{setAutocompleteValue(newValue)}}
                                    renderInput={(params)=><TextField
                                        {...params}
                                    />}
                                />
                            </FormControl>
                        </TableCell>
                        <TableCell>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="quantity">Quantidade</InputLabel>
                                <Input 
                                    id='quantity'
                                    name='quantity'
                                    onChange={handleChangeQuantity} 
                                    type='number' 
                                    value={newSnackQty.quantity} 
                                />
                            </FormControl>
                        </TableCell>
                        <TableCell>
                            <Button variant='contained' color='primary' onClick={addSnacks}>
                                +
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}

function mapDispatchToProps(dispatch: any) {
    return {
        changeOrder(order: IOrder) {
            const action = setOrder(order)
            dispatch(action);
        },
        listAllSnacks(name: string) {
            const action = listSnacks()
            dispatch(action);
        },
    }
}

function mapStateToProps(state: any) {
    return {
        order: state.order,
        snackList: state.snack.list,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetSnack);