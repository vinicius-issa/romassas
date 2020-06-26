import { firestore } from '../../services/firebase';
import  {setErrorMessage} from './errorMessage'

interface ISnack{
    id ?: string;
    name : string;
    type: string;
}

export function changeName(name:string){
    return {
        type: 'SNACK_CHANGE_NAME',
        payload: name
    }
}

export function changeType(type:string){
    return {
        type: 'SNACK_CHANGE_TYPE',
        payload: type
    }
}

export const saveSnack = (snack:ISnack) => (dispatch:any) => {
    if(snack.id)
        firestore.collection('snacks').doc(snack.id).set({name: snack.name, type: snack.type})
            .then(()=>{
                dispatch({
                    type: 'SNACK_CLEAR'
                })
            }).then((resp:any)=>dispatch(listSnacks()))
    else
       firestore.collection('snacks').doc().set({name:snack.name, type:snack.type})
        .then(()=>{
            dispatch(
                {
                    type: 'SNACK_CLEAR'
                }
            ) ;
    }
    ).then((resp:any)=>dispatch(listSnacks()))
    .catch((error)=>{
        console.error(error.code, error);
        dispatch(setErrorMessage(error.code));
    });
}

export const listSnacks = () => (dispatch:any) => {
    firestore.collection('snacks').get().then((data)=>{
        console.log('DATA: ', data.docs);
        let firebaseList = data.docs;
        let list:ISnack[] = []
        firebaseList.forEach(iten=>{
            list.push({
                id: iten.id,
                name: iten.data().name,
                type: iten.data().type
            })
        })
        dispatch({
            type: 'SNACK_LIST',
            payload:list
        });
    }).catch((error)=>{
        console.error(error.code, error);
        dispatch(setErrorMessage(error.code));
    });
}

export const setSnack = (snack:ISnack)  => {
    return {
        type: 'SNACK_SET',
        payload: snack
    }   
}

export const deleteSnack = (id:string) => (dispatch:any)  => {
    firestore.collection('snacks').doc(id).delete().then(()=>{
        dispatch({
            type: 'SNACK_CLEAR'
        })
    }).then(()=>{
        dispatch(listSnacks());
    }).catch((error)=>{
        setErrorMessage(error.code);
    })
}