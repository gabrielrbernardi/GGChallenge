/****************************************
| Data: 30/07/2020                      |
| Resumo: SignUp Services               |
| Sistema: GGChallenge                  |
****************************************/

import { Auth } from 'aws-amplify';

class SignUpService {
    //error handling
    customException(message: string){
        const error = new Error();
        error.message = message;
        return error;
    }

    async singupFunction(username: string, password: string, email: string, phoneNumber: string){
        if(!username || !password || !email || !phoneNumber){
            return {signedUpUser: false, error: "Preencha todos os campos."};
        }else{
            await Auth.signUp({username, password, attributes:{email, phone_number: phoneNumber}})
                .then(response => response)
                .catch(err => {
                    throw this.customException(err);
                });
        }
    }

    async handleSubmitConfirmationSignUp(username: string, confirmationCode: string){
        if(!username || !confirmationCode){
            return {confirmationSignUp: false, error: "Preencha todos os campos."};
        }
        await Auth.confirmSignUp(username, confirmationCode)
            .then((response) => {
                return {confirmationSignUp: true, response}
            })
            .catch(err => {
                throw this.customException(err);
            })
    }
}

export default SignUpService;