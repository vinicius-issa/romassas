import {createStore, combineReducers} from 'redux'
import errorMessageReducer from './reducers/errorMessage';

const reducers = combineReducers({
    errorMessage: errorMessageReducer
})

function storeConfig(){
    return createStore(reducers)
}

export default storeConfig;