import React, { Component, Fragment } from 'react'
import {
    IonContent, IonPage,
    IonCard, IonCardHeader, IonCardContent,
    IonItem, IonLabel, IonInput,
    IonButton, IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

class Form extends Component {
    public state: any = null;
    constructor(props: any){
        super(props)
        this.register = this.register.bind(this)
    }
    register(){

    }
    render(): React.ReactNode {
        return(<IonPage>
            <IonContent>
              <IonCard>
                <IonCardHeader>REGISTRARSE</IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput value={this.state.name} onIonChange={e => this.setState({name: e.detail.value})}></IonInput>
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
          </IonPage>)
    }
}

export default Form