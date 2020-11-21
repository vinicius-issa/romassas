export function setErrorMessage(errorCode:string){
    let errorMessage = '';
    switch (errorCode) {
        case '':
            errorMessage = ''
            break;
        case 'auth/user-not-found':
            errorMessage = "Usuario não cadastrado"
            break;
        case 'auth/wrong-password':
            errorMessage = "Senha Inválida"
            break;
        case 'form/order/client':
            errorMessage = "Favor preencher o campo 'Nome do Cliente'"
            break;
        default:
            errorMessage = "Um erro inexperado aconteceu"
            break;
    }
    return {
        type: 'ERROR_UPDATE',
        payload: errorMessage
    }
}