import { Component } from "react";
import {
  IonPage, IonContent,
  IonList, IonItemSliding, IonItem, IonIcon, IonAvatar,
} from "@ionic/react";
import food from '../../../assets/food/Papeis.png'
class History extends Component<any>{
  constructor(props: any){
    super(props)
  }
  render(){
    return <IonPage>
      <IonContent>
        <IonList>
          <IonItemSliding>
            <IonItem>
              <IonAvatar slot="start">
                <img src={food}></img>
              </IonAvatar>
            </IonItem>
          </IonItemSliding>
        </IonList>
      </IonContent>
    </IonPage>
  }
}

export default History