import Account from './Account'
export class User extends Account{
    constructor(){
        super()
    }
    async register(method: string, payload?: any, account?: any): Promise<void>{
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
        localStorage.setItem('credential', JSON.stringify(credential))
        const user = await this.firebase.registerDocument("usuarios", payload, credential.uid)
        localStorage.setItem('user', JSON.stringify(user))
        console.log("Registro completado")
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