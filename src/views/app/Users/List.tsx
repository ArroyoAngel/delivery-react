import React, { Component } from 'react'
import { 
  IonPage,
  IonList, IonLabel, IonAvatar,
  IonItemSliding, IonItem, IonItemOptions, IonItemOption,
  IonChip, IonIcon,
  IonSearchbar, IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonModal, IonInput,
} from '@ionic/react';
import { createOutline, addOutline, bagAddOutline } from 'ionicons/icons';
class List extends Component {
  public state: any
  constructor(props: any){
      super(props)
      this.update = this.update.bind(this)

  }
  update(data: any){

  }
  render(): React.ReactNode {
    return (
      <IonPage>
        <IonContent>
          <IonCard>
            <IonCardContent>
              <IonSearchbar
                value={this.state.searchText}
                onIonChange={e => this.setState({searchText: e.detail.value!})}
                color="tertiary"
                placeholder='Buscar agroquímicos'
                disabled={false}
                animated={false}>
              </IonSearchbar>
  
              <IonList>
                <IonItemSliding>
                  {this.state.agroquimicos.map((agroquimico: any)=>{
                    return (
                      <IonItem key={agroquimico.id}>
                        <IonLabel>
                          <h2>{agroquimico.nombre}</h2>
                          <h3>{agroquimico.tipo}</h3>
                          <p>Cantidad: {agroquimico.cantidad}</p>
                        </IonLabel>
                        <IonChip onClick={()=>this.update(agroquimico)}>
                          <IonIcon icon={createOutline} color="dark" />
                          <IonLabel>Editar</IonLabel>
                        </IonChip>
                        <IonChip onClick={()=>this.setState((prev: any)=>({modal: !prev.modal, selected: agroquimico}))}>
                          <IonIcon icon={bagAddOutline} color="dark" />
                          <IonLabel>Comprar</IonLabel>
                        </IonChip>
                      </IonItem>
                    )
                  })}
                </IonItemSliding>
              </IonList>
              <IonButton shape="round" color='tertiary' href='/app/agroquimicos/register'>
                <IonIcon slot="start" icon={addOutline} />
                Registrar
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonModal
          isOpen={this.state.modal}
          breakpoints={[0.1, 0.5, 1]}
          initialBreakpoint={0.5}
          onDidDismiss={()=>this.setState((prev: any)=>({modal: !prev.modal}))}
        >
          <IonItem>
            <IonLabel position="floating">Cantidad</IonLabel>
            <IonInput value={this.state.cantidad} type='number' onIonChange={e => this.setState({cantidad: Number(e.detail.value)})}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Precio /lt</IonLabel>
            <IonInput value={this.state.precio} type='number' onIonChange={e => this.setState({precio: e.detail.value})}></IonInput>
          </IonItem>
        </IonModal>
      </IonPage>
    )
  }
}