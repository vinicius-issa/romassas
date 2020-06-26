import React from 'react'
import { connect } from 'react-redux'

import { TextField, Button, Select } from '@material-ui/core';
import { changeName, saveSnack, changeType } from '../../store/actions/snack';
import { ISnack } from '../../interfaces/ISnack'
import './Snack.css'

interface Props{
    snack ?: ISnack;
    setName : any;
    saveChange: any;
    setType: any;
}

const Add:React.FC<Props> = ({snack = {}, setName, saveChange, setType}) => {
    return (
        <div className='flex-container-row'>
            <TextField className='flex-grow' type='text' name="name" label="Sabor" onChange={(e)=>setName(e.target.value)} value={snack.name} />
            <Select native className='flex-grow' type='text' name="type" label="Tipo" onChange={(e)=>setType(e.target.value)} value={snack.type} >
                <option aria-label="None" value="" />
                <option value={'Frito Festa'}>Frito Festa</option>
                <option value={'Assado Festa'}>Assado Festa</option>
            </Select>
            <Button onClick={()=>saveChange(snack)} variant="contained" color="primary">Salvar</Button>  
        </div>
    )
};

function mapDispatchToProps(dispatch: any) {
    return {
        setName(name: string) {
            const action = changeName(name)
            dispatch(action);
        },
        setType(type: string) {
            const action = changeType(type)
            dispatch(action);
        },
        saveChange(snack:ISnack){
            const action = saveSnack(snack)
            dispatch(action);
        }
    }
}

function mapStateToProps(state: any) {
    return {
        snack: state.snack,
    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add);