import { ActionType } from '../types/errorMessage'



export default function(state:{},action:ActionType){
    switch(action.type){
        case 'ERROR_UPDATE':
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return {
                ...state,
                errorMessage: ''
            }
    }
}
