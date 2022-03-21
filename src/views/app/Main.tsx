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
  IonBackButton, IonHeader, IonToolbar, IonButtons, IonButton, IonRow,
  IonFab, IonFabButton,
} from '@ionic/react';

import ItemCard from '../../components/CardItem/ItemCard'
import food from '../../assets/food/Papeis.png'
import iconFood from '../../assets/Icons/cuchilleria.svg'
import drink from '../../assets/Icons/drink.svg'
import all from '../../assets/Icons/all.svg'
import foodPNG from '../../assets/food/color.png'
import drinkPNG from '../../assets/drink/color.png'

import { arrowBack, bagAddOutline, addOutline, remove, cartOutline } from 'ionicons/icons';
class Main extends Component<{session: any}> {
    public state: any = {
      searchText: '',
      modal: false,
      selected: 0,
      filter: 'all',
      productView: '',
      cart: [],
      cant: 0,
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
        this.addCart = this.addCart.bind(this)
    }
    update(){

    }

    addCart(payload: any){
      if(!localStorage.getItem('cart')){
        localStorage.setItem('cart','['+JSON.stringify(payload)+']')
      }else{
        let cartStorage: any = localStorage.getItem('cart')
        let temp = JSON.parse(cartStorage)
        let productCart = temp.find( (p: any)=>p.name===payload.name )
        let newCart;
        if(productCart){
          productCart.cant += payload.cant
          newCart = temp.map((e:any)=>{
            if(e.name===payload.name)e = productCart
            return e
          })
        }
        else {
          newCart = [...temp, payload]
        }
        
        this.setState({ 
          cart: [...newCart],
          cant: 0
        })
        console.log(this.state.cart)
        localStorage.setItem('cart', JSON.stringify(newCart))
      }
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
              <IonIcon icon={iconFood} />
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
          {this.state.data.map( (element: any, index:number) => {
            return <div key={index}>
              <ItemCard onClick={()=>{
                let cartStorage: any = localStorage.getItem('cart')
                if(!cartStorage)cartStorage='[]'
                this.setState({
                  modal: true,
                  productView: element,
                  cart: JSON.parse(cartStorage)
                })
              }}>
                <div
                    className='start' 
                    style={{
                    width: '100%', height: '100%',
                    backgroundImage: `url(${require(`../../assets/${element.type?element.type:'drink'}/color.png`)})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundColor: '#f2f2f2'
                }}></div>
                <IonLabel className='center'>
                  <h2>{element.name}</h2>
                  <h3>{element.price}</h3>
                  <p>{element.detail}</p>
                </IonLabel>
              </ItemCard>
            </div>
          })}
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
                  <IonCardTitle>{this.state.productView.name}</IonCardTitle>
                  <IonCardSubtitle>{this.state.productView.price} Bs. | En carrito: {
                    this.state.cart.find((e: any)=>e.name===this.state.productView.name)?
                      this.state.cart.find((e: any)=>e.name===this.state.productView.name).cant
                    :
                      0
                  }</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <button onClick={()=>console.log(this.state.cart)}>TEST</button>
                  Este producto es un alimento proporcionado por el restaurante, preparado bajo las mejores condiciones y considerando la mejor calidad.
                  <IonItem className='custom border-none'>
                    <IonButton color='primary' size='default' className='custom-radius-left' onClick={()=>this.setState((prev:any)=>({ cant: prev.cant-1}))}>
                      <IonIcon icon={remove}></IonIcon>
                    </IonButton>
                    <IonLabel className='custom-center'>{this.state.cant}</IonLabel>
                    <IonButton color='primary' size='default' className='custom-radius-right' onClick={()=>this.setState((prev:any)=>({ cant: prev.cant+1}))}>
                      <IonIcon icon={addOutline}></IonIcon>
                    </IonButton>
                  </IonItem>
                  <IonButton onClick={()=>this.addCart({ ...this.state.productView, cant: this.state.cant })}>
                    <IonIcon icon={cartOutline} slot='end'/>
                    Agregar
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonModal>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={()=>this.payment()}>
              <IonIcon icon={bagAddOutline} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    }
}
export default Main