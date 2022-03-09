import React, { Component } from 'react'
import {
  IonContent, IonPage,
  IonCard, IonCardHeader, IonCardContent,
  IonItem, IonLabel, IonInput,
  IonButton, IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

import Users from '../../models/Users'
class Register extends Component {
  constructor(props: any){
    super(props)
  }
  public state = {
    name: '',
    lastname: '',
    bussines: '',
    phone: '',
    email: '',
    password: '',
  }
  register(){
    const body = {
      name: this.state.name,
      lastname: this.state.lastname,
      bussines: this.state.bussines,
      phone: this.state.phone,
    }

    const account = {
      email: this.state.email,
      password: this.state.password,
    }
    Users.register('email', body, account)
  }
  render(): React.ReactNode {
    return (
      <IonPage>
        <IonContent>
          <IonCard>
            <IonCardHeader>REGISTRARSE</IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Nombre</IonLabel>
                <IonInput value={this.state.name} onIonChange={e => this.setState({name: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Apellido</IonLabel>
                <IonInput value={this.state.lastname} onIonChange={e => this.setState({lastname: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Empresa</IonLabel>
                <IonInput value={this.state.bussines} onIonChange={e => this.setState({bussines: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Telefono</IonLabel>
                <IonInput value={this.state.phone} onIonChange={e => this.setState({phone: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Correo</IonLabel>
                <IonInput value={this.state.email} onIonChange={e => this.setState({email: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Contrasena</IonLabel>
                <IonInput value={this.state.password} onIonChange={e => this.setState({password: e.detail.value})}></IonInput>
              </IonItem>
              <IonButton shape="round" color='tertiary' onClick={()=>this.register()}>
                <IonIcon slot="start" icon={addOutline} />
                Registrar
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )
  }
}
export default Register