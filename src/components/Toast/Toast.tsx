import React, { useState, Fragment } from 'react';
import { IonToast, IonContent, IonButton } from '@ionic/react';
import { informationCircle } from 'ionicons/icons';

const Toast = (props: any) => {
  return <Fragment>
    <IonToast
      isOpen={props.show}
      onDidDismiss={()=>props.dismiss()}
      message={props.message}
      color={props.color}
      icon={informationCircle}
      position="top"
      duration={1200}
      buttons={[
        /*{
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        },*/
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]}
    />
  </Fragment>
}

export default Toast