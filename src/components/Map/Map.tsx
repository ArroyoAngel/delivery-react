import { Component, Fragment, useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker as Mark, Popup, useMap, useMapEvents } from 'react-leaflet'
import { icon } from 'leaflet'
import positionIcon from '../../assets/location.png'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

function ChangeMapView( payload: any) {
  const coords = payload.coords
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

const Marker = (props: any) => {
  const [position, setPosition] = useState(props.position)
  const L = require('leaflet');
  const myIcon = L.icon({
    iconUrl: positionIcon,
    iconSize: [ 64, 64 ],
    iconAnchor: [ 32, 64 ],
    popupAnchor: [ 0, 0 ],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  });
  
  const map = useMapEvents({
    click: (e)=>{
      map.setView(e.latlng, map.getZoom())
      const coords = [e.latlng.lat, e.latlng.lng]
      if(props.assign){
        setPosition(coords)
        props.setPosition(coords)
      }
    },  
  })

  const ref = useRef()
  useEffect(() => {
    setPosition(props.position)
  }, [props]);

  return <Mark position={position} icon={myIcon}>
    {props.children?
      <Popup>{props.children}</Popup>
    :
      null
    }
  </Mark>
}

const Map = (props: any) => {
  const getCurrentPosition = async ()=> {
    const { latitude, longitude } = await (await Geolocation.getCurrentPosition()).coords
    setPostion([ latitude, longitude ])
  }
  
  const [position, setPostion] = useState([0,0])
  
  useEffect(()=>{
    if(props.position){
      setPostion(props.position)
    }else{
      getCurrentPosition()
    }
  }, [props])
  
  return <MapContainer
    center={{ lat: position[0], lng: position[1]}}
    zoom={13}
    style={{  height: '50vh' }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=Pa6leDya9suIt1lu73qZ"
    />
    <Marker position={position} assign={props.assign} setPosition={props.setPosition}>
      { props.children }
    </Marker>
    <ChangeMapView coords={position} />
  </MapContainer>
}

export default Map