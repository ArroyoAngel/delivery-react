import { Component, Fragment } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { icon } from 'leaflet'
import locationIcon from '../../assets/location.png'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

function ChangeMapView( payload: any) {
  const coords = payload.coords
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

class Map extends Component<any> {
  constructor(props: any){
    super(props)
  }

  render(){
    const L = require('leaflet');
    const myIcon = L.icon({
      iconUrl: locationIcon,
      iconSize: [ 64, 64 ],
      iconAnchor: [ 32, 64 ],
      popupAnchor: [ 0, 0 ],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
    });

    return <Fragment>
      <MapContainer
        center={this.props.location}
        zoom={15}
        style={{  height: '50vh' }}
        {...this.props}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=Pa6leDya9suIt1lu73qZ"
        />
        <Marker position={this.props.location} icon={myIcon}>
          <Popup>
            { this.props.children }
          </Popup>
        </Marker>
        <ChangeMapView coords={this.props.location} />
      </MapContainer>
    </Fragment>
  }
}

export default Map