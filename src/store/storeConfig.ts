import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware } from 'redux'
import errorMessageReducer from './reducers/errorMessage';
import snack from './reducers/snack';
import order from './reducers/order';

const reducers = combineReducers({
    errorMessage: errorMessageReducer,
    snack,
    order,
})

function storeConfig(){
    return applyMiddleware(thunk)(createStore)(reducers)
}

export default storeConfig;