import React, { Fragment } from 'react'
import TopMenu from '../../../components/TopMenu/Menu'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LocationMarker } from '../../../helpers/LocationMarker'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
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

class Request extends React.Component<{session: any}> {
  public state: any = {
    detail: '',
    type: '',
    location: [-16.912694, -62.612993]
  };
  title: string = "Registrar"; submit: string = "Registrar";
  constructor(props: any){
      super(props)
  }
  async register(){
    const location = await Geolocation.getCurrentPosition( )
    console.log(location)
  }
  render(): React.ReactNode {
    let session = this.props.session
    const L = require('leaflet');
    const myIcon = L.icon({
      iconUrl: locationIcon,
      iconSize: [64,64],
      iconAnchor: [16, 64],
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
  });
    return(<IonPage>
      <IonContent>
      <MapContainer center={this.state.location} zoom={15} style={{ width: '500px', height: '500px'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=Pa6leDya9suIt1lu73qZ"
        />
        <Marker position={this.state.location} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
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
              </Fragment>
            :
              null
            }
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