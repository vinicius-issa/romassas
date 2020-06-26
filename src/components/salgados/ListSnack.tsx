import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { listSnacks, setSnack, deleteSnack } from '../../store/actions/snack'
import { IconButton, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper } from '@material-ui/core'
import { descendingComparator } from '../../services/sort';
import { ISnack } from '../../interfaces/ISnack'

interface Props{
    list:any;
    listAllSnacks:any;
    setSnackEdit:any;
    delSnack:any;
}

const ListSnack:React.FC<Props> = ({list, listAllSnacks, setSnackEdit, delSnack}) => {
    useEffect(()=>{
        listAllSnacks();
    },[listAllSnacks]);
    
    list = list.sort((a:any,b:any)=>{return -descendingComparator(a,b,'name')});
    return (
        <div>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Nome</strong></TableCell>
                            <TableCell><strong>Tipo</strong></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { list.map((snack:any)=><TableRow key={snack.id}>
                                <TableCell>{snack.name}</TableCell>
                                <TableCell>{snack.type}</TableCell>
                                <TableCell align='right'>
                                <IconButton size='small' aria-label="edit" onClick={(e)=>{console.log(snack);setSnackEdit(snack)}}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={(e)=>{delSnack(snack.id)}} size='small' aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                </TableCell>
                            </TableRow>)
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

const mapStateToProps = (state:any) =>{
    return {
        list: state.snack.list,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        listAllSnacks(name: string) {
            const action = listSnacks()
            dispatch(action);
        },
        setSnackEdit(snack:ISnack){
            const action = setSnack(snack);

            dispatch(action);
        },
        delSnack(id:string){
            let del = window.confirm('Deseja realmente excluir esse salgado?'); 
            if(del){
                const action = deleteSnack(id);
                dispatch(action);
            }
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListSnack)