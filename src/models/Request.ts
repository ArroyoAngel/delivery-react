import Account from './Account'
export class Request extends Account{
    constructor(){
        super()
    }
    async register(payload: any): Promise<any>{
        return await this.firebase.registerDocument("pedidos", payload)
    }
    async getAll(): Promise<any> {
        return await this.firebase.getCollection("pedidos")
    }
}

export default new Request()