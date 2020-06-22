import React, {useState} from 'react';
import {Container, TextField, Button} from '@material-ui/core'
import {Alert} from '@material-ui/lab';
import {auth} from '../services/firebase';
import { RouteComponentProps } from 'react-router-dom';
import './Login.css';


const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [fields, setFields] = useState({
        email:'',
        password:'',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        event.persist();
        setFields(fields=>({...fields,[event.target.name]:event.target.value}));
    }

    const handleSubmit = (event:React.FormEvent) =>{
        event.preventDefault();
        let {email,password} = fields;
        auth.signInWithEmailAndPassword(email, password)
            .then(function(user){
                history.push('/');
            })
            .catch(function(error) {
                setFields(fields=>({...fields,password:''}));
                if(error.code==='auth/user-not-found') setErrorMessage("Usuario não cadastrado");
                else if(error.code==='auth/wrong-password') setErrorMessage("Senha Inválida");
                else setErrorMessage("Um erro inexperado aconteceu");
          });

    }

    return (
        <Container maxWidth="xs" >
            {errorMessage!=='' && <Alert severity="error">{errorMessage}</Alert>}
            <form  noValidate  onSubmit={handleSubmit} className="flex-container">
                <TextField  type='text' name="email" label="Email" onChange={handleChange} value={fields.email}/>
                <TextField  type='password' name="password" label="Senha" onChange={handleChange} value={fields.password}/>
                <Button variant="contained" color="primary" type='submit'>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;