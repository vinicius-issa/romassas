import React from 'react';
import { connect } from 'react-redux'
import { Container } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { setErrorMessage } from '../../store/actions/errorMessage';
import './Alert.css'

interface Props {
    errorMessage: string;
    setError : any;
}

const AlertEl = ({errorMessage, setError}:Props) => {

    return (<Container id='alert-container' className='flex-container'>
                {errorMessage !== '' &&  
                    <Alert onClose={() => {setError('')}} className="alert" severity="error">{errorMessage}</Alert>
                }
            </Container>)
}

function mapStateToProps(state: any) {
    return {
        errorMessage: state.errorMessage.errorMessage
    }
  }
  
  function mapDispatchToProps(dispatch: any) {
    return {
        setError(error: string) {
            const action = setErrorMessage(error)
            dispatch(action);
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AlertEl);
  