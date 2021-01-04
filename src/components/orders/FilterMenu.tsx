import React, { useCallback, useEffect, useState } from 'react';
import { FormControl, TextField } from '@material-ui/core'
import { getDate } from '../../services/date';

interface IProps {
    setFilter: any;
}

const FilterMenu: React.FC<IProps> = ({ setFilter }) => {
    const [date, setDate] = useState(getDate(new Date()))

    const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value)
        setDate(event.target.value)
    }

    const changeFilter = useCallback(setFilter,[date])

    useEffect(()=>{
        changeFilter(date,date)
    },[date, changeFilter])

    return (
        <div>
            <FormControl fullWidth={true}>
                <TextField
                    label="Data"
                    type="date"
                    value={date}
                    name='start'
                    onChange={handleDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
        </div>
    );
}

export default FilterMenu;