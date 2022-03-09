import React, { Component } from 'react'
import {
  IonContent, IonPage,
  IonRow, IonCol,
  IonCard, IonCardHeader, IonCardContent,
  IonItem, IonLabel,
  IonInput,
  IonButton, IonIcon,
  IonRouterLink,
} from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';

import Users from '../../models/Users'

class Login extends Component {
  constructor(props: any){
    super(props)
  }
  public state = {
    email: '',
    password: '',
  }
  async authLogin(type: string){
    let credential: any = {}
    let body = {
      email: this.state.email,
      password: this.state.password,
    }
    credential = await Users.authLogin(type, body)
    window.location.replace('/app')
  }
  render(): React.ReactNode {
    return (
      <IonPage>
        <IonContent>
          <IonRow align-items-center>
            <IonCol size-xl="4" size-sm="6" offset-xl="4" offset-sm="3" size-xs="12">
              <IonCard>
                <IonCardHeader>
                  <h1>LOGIN</h1>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Correo:</IonLabel>
                    <IonInput placeholder="example@example.com" type="email" onIonChange={e => this.setState({email: e.detail.value})}/>
                  </IonItem>
                  <IonItem>
                    <IonLabel  position="floating">Contraseña:</IonLabel>
                    <IonInput placeholder="Example123*" type="password" onIonChange={e => this.setState({password: e.detail.value})}/>
                  </IonItem>
                </IonCardContent>
                <IonCardContent>
                  <IonButton type="button" onClick={()=>this.authLogin('email')}><span>Entrar</span></IonButton><br/>
                  <IonButton type="button" onClick={()=>this.authLogin('google')}>
                    <IonIcon slot="start" icon={logoGoogle} />
                    <span>Google</span>
                  </IonButton><br/>
                  <IonRouterLink>¿Ház olvidado tu contraseña?</IonRouterLink><br/>
                  <IonRouterLink href='/user/register'>Registrar una nueva cuenta.</IonRouterLink><br/>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    )
  }
}
export default Login