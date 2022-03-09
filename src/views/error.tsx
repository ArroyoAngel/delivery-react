import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

class Error extends Component {
  constructor(props: any){
    super(props)
  }
  render(): React.ReactNode {
    return (
      <h1>ERROR AL CARGAR ESTA PAGINA</h1>
    )
  }
}
export default Error