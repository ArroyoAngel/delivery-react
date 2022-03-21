import React, { Fragment } from 'react'
import TopMenu from '../../../components/TopMenu/Menu'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { LocationMarker } from '../../../helpers/LocationMarker'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import Map from '../../../components/Map/Map'
import locationIcon from '../../../assets/location.png'
import 'leaflet/dist/leaflet.css'

import RequestService from '../../../models/Request'

import {
  IonPage, IonContent,
  IonCard, IonCardContent,
  IonLabel,
  IonInput, IonSelect, IonSelectOption
  ,IonItem, IonButton, IonIcon,
  IonDatetime,
} from '@ionic/react';

import { createOutline, addOutline, remove } from 'ionicons/icons';

class Request extends React.Component<{session: any}> {
  public state: any = {
    detail: '',
    type: '',

    locations: [
      { name: 'Prado', coords: [-16.926866, -62.610465] },
      { name: 'Centro', coords: [-16.925350, -62.611218] },
      { name: 'Front', coords: [-16.889289, -62.615100] },
    ],
    ubication: 0,

    arrive: '',
  };
  title: string = "Registrar"; submit: string = "Registrar";
  constructor(props: any){
      super(props)
  }
  async payment(){
    const cartStorage:any = localStorage.getItem('cart')
    const cart = JSON.parse(cartStorage)
    const { detail, type, locations, ubication, arrive } = this.state
    let body: any = {
      detail: detail,
      type: type,
      products: cart,
    }
    switch(type){
      case 'domicilio':
        body.location = locations[ubication].coords
        break;
      case 'mesa':
        body.arrive = arrive
    }
    RequestService.register(body)
  }
  async componentWillMount(){
    const { latitude, longitude } = await (await Geolocation.getCurrentPosition()).coords
    //const diff = [-0.008394800000001368, 0.009707099999999969]
    //const diff = [-0.010768385318286, 0.00815753722881]
    const diff = [0, 0]
    this.setState({
      position: [ latitude-diff[0], longitude-diff[1] ]
    })
  }
  render(): React.ReactNode {
    const locations = this.state.locations;
    return(<IonPage>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Detalle del pedido</IonLabel>
              <IonInput value={this.state.detail} onIonChange={e => this.setState({detail: e.detail.value})}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Entrega</IonLabel>
              <IonSelect interface="popover" value={this.state.type} placeholder="Entrega" onIonChange={e => this.setState({type: e.detail.value})}>
                <IonSelectOption value="domicilio">Domicilio</IonSelectOption>
                <IonSelectOption value="llevar">Para llevar</IonSelectOption>
                <IonSelectOption value="mesa">Mesa</IonSelectOption>
              </IonSelect>
            </IonItem>
            
            {this.state.type==='domicilio'?
              <Fragment>
                <IonItem>
                  <IonLabel>Entrega</IonLabel>
                  <IonSelect
                    interface="popover"
                    value={this.state.ubication}
                    placeholder="Ubicación"
                    onIonChange={e => {
                      const element = locations[e.detail.value]
                      if(element)this.setState({
                        position: element.coords,
                        ubication: e.detail.value
                      })
                    }}
                  >
                    { locations.map((location: any, index: number) => {
                      return <IonSelectOption key={index} value={index}  >{location.name}</IonSelectOption>
                    })}
                  </IonSelect>
                </IonItem>
                
                <Map position={this.state.position}>
                  <h3>asdasdsa</h3>
                </Map>
              </Fragment>
            :
              this.state.type==='mesa'?
              <IonItem>
                <IonLabel position="floating">Hora de llegada</IonLabel>
                
                <IonDatetime
                  presentation="time"
                  onChange={(e)=>{}}
                ></IonDatetime>
              </IonItem>
            :
              null
            }
            <IonButton shape="round" color='tertiary' onClick={()=>this.payment()}>
              <IonIcon slot="start" icon={this.submit==="Editar"?createOutline:addOutline} />
              {'Pagar'}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>)
  }
}

export default Request