import { IonItem, IonLabel, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar,
    IonPopover, IonContent, IonList
  } from '@ionic/react';
  import { Component, ReactNode } from 'react';
  import image from '../../assets/user/color.png'
  import Users from '../../models/Users'
  import './Menu.css'
  
  class Menu extends Component<{title: string, session: any}> {
    users: any = Users.sessionState()
    constructor(props: any){
      super(props)
    }
    public state: any = {
      user: { name: '' }
    }
    profile(){
  
    }
    configuration(){
  
    }
    async logout(){
      const state = await Users.logOut()
      console.log("ESTADO DE DESCONEXION", state)
      if(state === true){
        window.location.replace('/app')
        console.log("Desconexion satisfactoria!")
      }else{
        console.log("Ha ocurrido un error!", state)
      }
    }
    render(): ReactNode {
      const session = this.props.session
      return (
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot='start' />
            <IonTitle>{this.props.title}</IonTitle>
            <IonItem slot="end" id='trigger-button' className="profile-menu">
              <IonLabel>{session.name.split(' ')[0]}</IonLabel>
              <IonAvatar>
                <img src={image}/>
              </IonAvatar>
            </IonItem>
          </IonToolbar>
          <IonPopover trigger="trigger-button" showBackdrop={false}>
            <IonContent>
              <IonList>
                <IonItem className="profile-menu-item" onClick={()=>this.profile()}><IonLabel>Perfil</IonLabel></IonItem>
                <IonItem className="profile-menu-item" onClick={()=>this.configuration()}><IonLabel>Configuraciones</IonLabel></IonItem>
                <IonItem className="profile-menu-item" onClick={()=>this.logout()}><IonLabel>Desconectarse</IonLabel></IonItem>
              </IonList>
            </IonContent>
          </IonPopover>
        </IonHeader>
      );
    }
  }
  
    
  export default Menu;
    