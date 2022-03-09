import React, { Component, Fragment } from 'react'
import TopMenu from '../../components/TopMenu/Menu'
import './Main.css'
import {
  IonPage, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonLabel, IonAvatar, IonChip,
  IonList, IonItemSliding, IonItem, IonIcon, 
  IonSegment, IonSegmentButton,
  IonModal,
  IonInfiniteScroll, IonInfiniteScrollContent,
  IonBackButton, IonHeader, IonToolbar, IonButtons, IonButton
} from '@ionic/react';
import food from '../../assets/food/Papeis.png'
import drink from '../../assets/Icons/drink.svg'
import all from '../../assets/Icons/all.svg'
import foodPNG from '../../assets/food/color.png'
import drinkPNG from '../../assets/drink/color.png'

import { arrowBack, bagAddOutline, addOutline, add } from 'ionicons/icons';
class Main extends Component<{session: any}> {
    public state: any = {
      searchText: '',
      modal: false,
      selected: 0,
      filter: 'all',
      products: [
        {name: 'Saice', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Ranga', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Sopa de maní', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Bife', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Chuleta', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Majadito', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Pollo al horno', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Res', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Milanesa', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Napolitana', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Fejoada', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Muril', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Misk', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Tilapia', price: 25.5, detail: 'Platillo especial', type: 'food'},
        {name: 'Tilapia', price: 25.5, detail: 'Platillo especial', type: 'food'},

        {name: 'Coca-Cola', price: 25.5, detail: 'Platillo especial', type: 'drink'},
        {name: 'Pera', price: 25.5, detail: 'Platillo especial', type: 'drink'},
        {name: 'Pacena', price: 25.5, detail: 'Platillo especial', type: 'drink'},
        {name: 'Mocochinchi', price: 25.5, detail: 'Platillo especial', type: 'drink'},
        {name: 'Sesamo', price: 25.5, detail: 'Platillo especial', type: 'drink'},
      ],
      notifications: [
        { severity: 'warning', summary: 'Promo 2X1', detail: 'Compra dos refrescos y recibe 1' },
        { severity: 'success', summary: 'Postre', detail: 'Compra dos refrescos y recibe 1' },
        { severity: 'error', summary: 'Completo', detail: 'Compra dos refrescos y recibe 1' },
        { severity: 'success', summary: 'Jueves', detail: 'Compra dos refrescos y recibe 1' },
        { severity: 'warning', summary: 'Carnavalero', detail: 'Compra dos refrescos y recibe 1' },
      ],
      isInfiniteDisabled: false,
      data: [{name: 'Saice', price: 25.5, detail: 'Platillo especial', type: 'food'},
      {name: 'Ranga', price: 25.5, detail: 'Platillo especial', type: 'food'},
      {name: 'Sopa de maní', price: 25.5, detail: 'Platillo especial', type: 'food'},
      {name: 'Bife', price: 25.5, detail: 'Platillo especial', type: 'food'},
      {name: 'Chuleta', price: 25.5, detail: 'Platillo especial', type: 'food'},],
    };
    constructor(props: any){
        super(props)
        this.update = this.update.bind(this)
        this.pushData = this.pushData.bind(this)
        this.filterChange = this.filterChange.bind(this)
    }
    update(){

    }
    pushData(reset?:boolean){
      if(reset)this.setState({
        data: [],
        isInfiniteDisabled: false
      })
      let products = this.state.products.filter(
        (product: any) => this.state.filter==='all'||product.type===this.state.filter
      )
      const max = this.state.data.length + 5;
      const min = max - 5;
      const newData: any = this.state.data;
      for (let i = min; i < max; i++) {
        newData.push(products[i]);
      }
      this.setState({
        data: newData,
        isInfiniteDisabled: newData.length===products.length?true:false
      });
    }

    filterChange(value: any){
      this.setState({ filter: value })
      this.pushData(true)
    }

    payment(){
      this.setState((prev: any) => ({ modal: !prev.modal }))
      window.location.replace('/app/request/form')
    }

    render(): React.ReactNode {
      let session = this.props.session
      const loadData = (ev: any) => {
        setTimeout(() => {
          this.pushData();
          ev.target.complete();
          //this.setState({ isInfiniteDisabled: result });
          console.log(this.state.data)
        }, 500);
      }
      let images: any = {
        food: foodPNG,
        drink: drinkPNG
      }
      return <IonPage>
        <TopMenu title='Menú Principal' session={session} />
        <IonContent>
          <div className='notification'>
            {this.state.notifications.map((notification: any, index: number)=>{
              return (
                <IonItem
                  key={index} className={notification.severity}
                  button onClick={()=>console.log('NOTIFICATION')} 
                >
                  <IonLabel>
                    <h2>{notification.summary}</h2>
                    <h3>{notification.detail}</h3>
                  </IonLabel>
                </IonItem>
              )
            })}
          </div>
          <IonSegment class='segment-request' value={this.state.filter} onIonChange={({detail})=>this.filterChange(detail.value)}>
            <IonSegmentButton value="food" aria-selected={true} >
              <IonIcon icon={food} />
              <IonLabel>Comida</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="drink">
              <IonIcon icon={drink} />
              <IonLabel>Bebida</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="all">
              <IonIcon icon={all} />
              <IonLabel>Todo</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonCard>
            <IonCardContent>
              <IonList>
                <IonItemSliding class='products-list'>
                  {this.state.data.map( (element: any, index:number) => {
                    return <div key={index}>
                      <IonItem button onClick={()=>this.setState((prev: any)=>({ modal: !prev.modal }))} key={0}>
                        <IonAvatar>
                          <img src={require(`../../assets/${element.type?element.type:'drink'}/color.png`)} />
                        </IonAvatar>
                        <IonLabel>
                          <h2>{element.name}</h2>
                          <h3>{element.price}</h3>
                          <p>{element.detail}</p>
                        </IonLabel>
                        <IonChip onClick={()=>this.payment()}>
                          <IonIcon icon={bagAddOutline} color="dark" />
                          <IonLabel >Comprar</IonLabel>
                        </IonChip>
                      </IonItem>
                    </div>
                  })}
                </IonItemSliding>
              </IonList>
              <IonInfiniteScroll
                onIonInfinite={loadData}
                threshold="100px"
                disabled={this.state.isInfiniteDisabled}
              >
                <IonInfiniteScrollContent
                  loadingSpinner="bubbles"
                  loadingText="Loading more data..."
                ></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </IonCardContent>
          </IonCard>

            <IonModal
              className='modal-product-information'
              isOpen={this.state.modal}
              onDidDismiss={()=>this.setState({modal: false})}
              swipeToClose={false}
            >
              <IonButton color='light' className='back-button' onClick={()=>this.setState({modal: false})}>
                <IonIcon icon={arrowBack}></IonIcon>
              </IonButton>
               <div style={{
                  width: '100%', height: '150px',
                  backgroundImage: `url(${food}), radial-gradient(black, white)`,
                  backgroundRepeat: 'repeat',
                  backgroundAttachment: 'fixed',
                  backgroundPosition: 'center',
               }}></div>
              <IonCard >
                <IonCardHeader>
                  
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                  <IonCardTitle>Card Title</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Keep close to Nature's heart... and break clear away, once in awhile,
                  and climb a mountain or spend a week in the woods. Wash your spirit clean.
                </IonCardContent>
              </IonCard>
            </IonModal>
        </IonContent>
      </IonPage>
    }
}
export default Main