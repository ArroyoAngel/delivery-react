import React, { Fragment } from 'react'
import TopMenu from '../../../components/TopMenu/Menu'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { LocationMarker } from '../../../helpers/LocationMarker'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import Map from '../../../components/Map/Map'
import locationIcon from '../../../assets/location.png'
import 'leaflet/dist/leaflet.css'

import {
  IonPage, IonContent,
  IonCard, IonCardContent,
  IonLabel,
  IonInput, IonSelect, IonSelectOption
  ,IonItem, IonButton, IonIcon
} from '@ionic/react';

import { createOutline, addOutline, remove } from 'ionicons/icons';

function ChangeMapView( payload: any) {
  const coords = payload.coords
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

class Request extends React.Component<{session: any}> {
  public state: any = {
    detail: '',
    type: '',
  };
  title: string = "Registrar"; submit: string = "Registrar";
  constructor(props: any){
      super(props)
  }
  async register(){
  }
  async componentWillMount(){
    const { latitude, longitude } = await (await Geolocation.getCurrentPosition()).coords
    const diff = [-0.008394800000001368, 0.009707099999999969]
    //const diff = [0, 0]
    this.setState({
      location: [ latitude-diff[0], longitude-diff[1] ]
    })
  }
  render(): React.ReactNode {
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
              <IonInput value={this.state.detail} onIonChange={e => this.setState({detail: e.detail.value})}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Entrega</IonLabel>
              <IonSelect interface="popover" value={this.state.type} placeholder="Tipo de Agroquímico" onIonChange={e => this.setState({type: e.detail.value})}>
                <IonSelectOption value="domicilio">Domicilio</IonSelectOption>
                <IonSelectOption value="llevar">Para llevar</IonSelectOption>
                <IonSelectOption value="mesa">Mesa</IonSelectOption>
              </IonSelect>
            </IonItem>
            
            {this.state.type==='domicilio'?
              <Fragment>
                <IonItem>
                  <IonLabel>Entrega</IonLabel>
                  <IonSelect interface="popover" value={this.state.location} placeholder="Tipo de Agroquímico" onIonChange={e => this.setState({ location: e.detail.value })}>
                    <IonSelectOption value={[-16.926866, -62.610465]}>Casa 1</IonSelectOption>
                    <IonSelectOption value={[-16.925350, -62.611218]}>Casa 2</IonSelectOption>
                    <IonSelectOption value={[-16.889289, -62.615100]}>Casa 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                
                <Map location={this.state.location}>
                  <h3>asdasdsa</h3>
                </Map>
              </Fragment>
            :
              null
            }
            <IonButton shape="round" color='tertiary' onClick={()=>{}}>
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