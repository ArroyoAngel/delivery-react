import Account from './Account'
export class User extends Account{
    constructor(){
        super()
    }
    async register(method: string, payload?: any, account?: any): Promise<any>{
        let credential: any = null
        switch(method){
            case "google":
                credential = await this.authByProviderGoogle()
                payload = {
                    name: credential.displayName?credential.displayName:'',
                    email: credential.email?credential.email:'',
                    phone: credential.phoneNumber?credential.phoneNumber:'',
                    bussines: '',
                }
                break
            case "phone":
                credential = console.log("This function is in progress")
                break
            default:
                credential = await this.authRegisterByEmail(account)
                break
        }
        if(!credential)return  { error: 'Ocurrió un error al registrar el correo.' }
        localStorage.setItem('credential', JSON.stringify(credential))
        const user = await this.firebase.registerDocument("usuarios", payload, credential.uid)
        if(!user)return  { error: 'Ocurrió un error al registrar su información.' }
        localStorage.setItem('user', JSON.stringify(user))
        return credential
    }
    async getAll(): Promise<Array<any>>{
        const result = await this.firebase.getCollection("clients")
        return result
    }
    async update(payload: any, uid: string): Promise<any>{
        const result = await this.firebase.updateDocument("clients", payload, uid)
        return result
    }
}

export default new User()