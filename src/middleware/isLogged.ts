import {auth} from '../services/firebase';

const isLogged = ():boolean =>{
    let user = auth.onAuthStateChanged(user=>{
        console.log("USER: ", user);
        if(user) {
            console.log("LOGADO");
            return true;
        }
        return false;
    })

    return user !== null
}

export default isLogged;