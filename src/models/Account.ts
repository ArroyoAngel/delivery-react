import { Firebase } from '../helpers/firebase'

export default class Account {
  firebase: Firebase
  constructor(){
    this.firebase = new Firebase()
  }


  authRegisterByEmail(account: any): any{
    return this.firebase.authRegisterByEmail(account.email, account.password)
  }
  authByProviderGoogle(): any {
    return this.firebase.authByProviderGoogle()
  }
  async authLogin(type: string, account?: any): Promise<any>{
    switch(type){
      case 'google':
        await this.firebase.authByProviderGoogle()
        break;
      default:
        await this.firebase.authLoginByEmail(account.email, account.password)
        break;
    }
    const { user, credential }: any = await this.sessionState()
    if(user && credential){
      localStorage.setItem('credential', JSON.stringify(credential))
      localStorage.setItem('user', JSON.stringify(user))
      return { ...user, ...credential }
    }
    return false
  }
  async sessionState(): Promise<{user: any, credential: any}|null>{
    const credential = await this.firebase.sessionState()
    if(!credential)return null
    let user = await this.firebase.getDocumentByUid('usuarios', credential.uid)
    return { user, credential }
  }

  async logOut(): Promise<any>{
    let state = await this.firebase.logOut()
    if(state === true){
      localStorage.removeItem('user')
      localStorage.removeItem('credential')
      console.log("Desconexion satisfactoria!")
    }else{
      console.log("Ha ocurrido un error!", state)
    }
    return state
  }
}
