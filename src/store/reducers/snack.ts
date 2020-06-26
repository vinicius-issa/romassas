
interface IAction{
    type:string;
    payload: ISnack;
}

interface ISnack{
    id: string;
    name: string;
    type: string;
}

const INITIAL_STATE = {
    id: null,
    name: '',
    type:'',
    list: []
}

export default function(state=INITIAL_STATE,action:IAction){
    switch(action.type){
        case 'SNACK_CHANGE_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'SNACK_CHANGE_TYPE':
            return {
                ...state,
                type: action.payload
            }
        case 'SNACK_LIST':
            return {
                ...state,
                list: action.payload
            }
        case 'SNACK_CLEAR':
            return {
                ...state,
                type : '',
                name: ''
            }
        case 'SNACK_SET':
            return {
                ...state,
                type :action.payload.type,
                name: action.payload.name,
                id: action.payload.id
            }
        default:
            return state;
    }
}