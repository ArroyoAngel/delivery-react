import { Component } from "react";
import {
  IonPage, IonContent,
  IonList, IonItemSliding, IonItem, IonIcon, IonAvatar, IonLabel, IonChip
} from "@ionic/react";
import { createOutline, bagAddOutline } from 'ionicons/icons';
import food from '../../../assets/food/Papeis.png'

import Request from '../../../models/Request'
class History extends Component<any>{
  public state: any = {
    requests: []
  };
  constructor(props: any){
    super(props)
  }
  async componentWillMount(){
    let requests = await Request.getAll()
    this.setState({
      requests,
    })
    console.log(this.state.requests)
  }
  render(){
    return <IonPage>
      <IonContent>
        <IonList>
          <IonItemSliding>
            {this.state.requests.map((element:any, index:number)=>{
              return <IonItem key={index}>
                <IonAvatar>
                  <img src={food} />
                </IonAvatar>
                <IonLabel>
                  <h2>{element.type}</h2>
                  <h3>{element.location}</h3>
                  <p>Productos: {element.products.map((product: any, i: number)=>{
                    if(i===0)return product.name
                    return ', '+product.name
                  })}</p>
                </IonLabel>
                <IonChip onClick={()=>console.log('asdasd')}>
                  <IonIcon icon={createOutline} color="dark" />
                  <IonLabel>Editar</IonLabel>
                </IonChip>
              </IonItem>
            })}
          </IonItemSliding>
        </IonList>
      </IonContent>
    </IonPage>
  }
}

export default History