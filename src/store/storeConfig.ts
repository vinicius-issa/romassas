import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware } from 'redux'
import errorMessageReducer from './reducers/errorMessage';
import snack from './reducers/snack';

const reducers = combineReducers({
    errorMessage: errorMessageReducer,
    snack,
})

function storeConfig(){
    return applyMiddleware(thunk)(createStore)(reducers)
}

export default storeConfig;