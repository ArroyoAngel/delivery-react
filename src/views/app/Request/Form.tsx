import React, { Fragment } from 'react'
import TopMenu from '../../../components/TopMenu/Menu'

import {
  IonPage, IonContent,
  IonCard, IonCardContent,
  IonLabel,
  IonInput, IonSelect, IonSelectOption
  ,IonItem, IonButton, IonIcon
} from '@ionic/react';

import { createOutline, addOutline, remove } from 'ionicons/icons';

class Request extends React.Component<{session: any}> {
  public state: any = {
    name: '',
    type: '',
  };
  title: string = "Registrar"; submit: string = "Registrar";
  constructor(props: any){
      super(props)
  }
  register(){

  }
  render(): React.ReactNode {
    let session = this.props.session
    return(<IonPage>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonItem className='custom border-none'>
              <IonButton color='primary' size='default' className='custom-radius-left'>
                  <IonIcon icon={remove}></IonIcon>
                </IonButton>
                <IonLabel className='custom-center'>0</IonLabel>
                <IonButton color='primary' size='default' className='custom-radius-right'>
                  <IonIcon icon={addOutline}></IonIcon>
              </IonButton>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Detalle del pedido</IonLabel>
              <IonInput value={this.state.name} onIonChange={e => this.setState({name: e.detail.value})}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Entrega</IonLabel>
              <IonSelect interface="popover" value={this.state.type} placeholder="Tipo de Agroquímico" onIonChange={e => this.setState({type: e.detail.value})}>
                <IonSelectOption value="herbicida">Domicilio</IonSelectOption>
                <IonSelectOption value="insecticida">Para llevar</IonSelectOption>
                <IonSelectOption value="abono">Mesa</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton shape="round" color='tertiary' onClick={()=>this.register()}>
              <IonIcon slot="start" icon={this.submit==="Editar"?createOutline:addOutline} />
              {this.submit}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>)
  }
}

export default Request