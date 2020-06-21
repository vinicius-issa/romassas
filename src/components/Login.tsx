import React, {useState} from 'react';
import {Container, TextField, Button} from '@material-ui/core'
import {auth} from '../services/firebase';

interface Props{
    email:string;
    password: string;
}

const Login: React.FC<Props> = ({email,password}) => {
    const [fields, setFields] = useState({
        email:'',
        password:''
    });

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        event.persist();
        setFields(fields=>({...fields,[event.target.name]:event.target.value}));
    }

    const handleSubmit = (event:React.FormEvent) =>{
        event.preventDefault();
        let {email,password} = fields;
        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            console.error(error);
            // ...
          });

        auth.onAuthStateChanged(user=>{
            if(user) console.log(user);
        })

    }

    return (
        <Container>
            <form  noValidate  onSubmit={handleSubmit}>
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