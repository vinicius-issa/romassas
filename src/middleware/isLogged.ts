import {auth} from '../services/firebase';

const isLogged = ():boolean =>{
    let user = auth.onAuthStateChanged(user=>{
        if(user) {
            return true;
        }
        return false;
    })

    return user !== null
}

export default isLogged;