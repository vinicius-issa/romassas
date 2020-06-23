interface Props{
    state:{};
    action: IAction;
}

interface IAction{
    type:string;
    payload: string;
}

export default function({state, action}:Props){
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