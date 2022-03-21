import React, { Component } from 'react'
import {
  IonContent, IonPage,
  IonCard, IonCardHeader, IonCardContent,
  IonItem, IonLabel, IonInput,
  IonButton, IonIcon,
} from '@ionic/react';
import Map from '../../components/Map/Map'
import Toast from '../../components/Toast/Toast'
import { addOutline } from 'ionicons/icons';

import Users from '../../models/Users'
class Register extends Component {
  constructor(props: any){
    super(props)
  }
  public state: any = {
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    password_repeat: '',
    position: null,

    toast: false,
    toastMessage: '',
    toastSeverity: '',
  }
  async register(){
    if(this.state.password!==this.state.password_repeat){
      this.setState({
        toast: true,
        toastMessage: 'La constrasenas deben ser iguales.',
        toastSeverity: 'warning',
      })
      return
    }
    const body = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
    }
    
    const account = {
      email: this.state.email,
      password: this.state.password,
    }
    const response = await Users.register('email', body, account)
    if(response.error){
      this.setState({ 
        toast: true,
        toastMessage: response.error,
        toastSeverity: 'danger'
      })
    }else{
      let show = () => new Promise( (resolve, reject)=>{
        setTimeout(()=>this.setState({ 
          toast: true,
          toastMessage: 'Registro completo.',
          toastSeverity: 'success'
        }), 4000)
      })
      show().then(()=>window.location.replace('/'))
    }
  }

  setPosition(position: any){
    this.setState({ position: position })
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
                <IonInput defaultValue={this.state.name} onIonChange={e => this.setState({name: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Telefono</IonLabel>
                <IonInput defaultValue={this.state.phone} onIonChange={e => this.setState({bussines: e.detail.value})}></IonInput>
              </IonItem>
              
              <Map assign={true} position={this.state.position} setPosition={ (position: any )=>this.setPosition(position) }></Map>
              <IonItem>
                <IonLabel position="floating">Dirección</IonLabel>
                <IonInput defaultValue={this.state.address} onIonChange={e => this.setState({phone: e.detail.value})}></IonInput>
              </IonItem>
              
              <IonItem>
                <IonLabel position="floating">Correo</IonLabel>
                <IonInput defaultValue={this.state.email} onIonChange={e => this.setState({email: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Contrasena</IonLabel>
                <IonInput defaultValue={this.state.password} onIonChange={e => this.setState({password: e.detail.value})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Contrasena</IonLabel>
                <IonInput defaultValue={this.state.password} onIonChange={e => this.setState({password_repeat: e.detail.value})}></IonInput>
              </IonItem>
              <IonButton shape="round" color='tertiary' onClick={()=>this.register()}>
                <IonIcon slot="start" icon={addOutline} />
                Registrar
              </IonButton>
              <Toast
                show={this.state.toast}
                dismiss={()=>this.setState({ toast: false })}
                message={this.state.toastMessage}
                color={this.state.toastSeverity}
              />
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )
  }
}
export default Register