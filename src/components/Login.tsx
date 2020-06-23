import React, { useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core'
import { auth } from '../services/firebase';
import { RouteComponentProps } from 'react-router-dom';
import './Login.css';
import { connect } from 'react-redux';
import { setErrorMessage } from '../store/actions/errorMessage';

interface Props extends RouteComponentProps {
    errorMessage: string;
    setError: any;
}

const Login: React.FC<Props> = ({ setError, history }) => {
    const [fields, setFields] = useState({
        email: '',
        password: '',
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setFields(fields => ({ ...fields, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let { email, password } = fields;
        auth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
                setError('');
                history.push('/');
            })
            .catch(function (error) {
                setFields(fields => ({ ...fields, password: '' }));
                setError(error.code);
            });

    }

    return (
        <Container maxWidth="xs" >
            <h1>Login</h1>
            <form noValidate onSubmit={handleSubmit} className="flex-container">
                <TextField type='text' name="email" label="Email" onChange={handleChange} value={fields.email} />
                <TextField type='password' name="password" label="Senha" onChange={handleChange} value={fields.password} />
                <Button id='button-submit' variant="contained" color="primary" type='submit'>
                    Login
                </Button>
            </form>
        </Container>
    );
};

function mapDispatchToProps(dispatch: any) {
    return {
        setError(error: string) {
            const action = setErrorMessage(error)
            dispatch(action);
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Login);