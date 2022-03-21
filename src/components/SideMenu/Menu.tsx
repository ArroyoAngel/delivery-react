import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
  } from '@ionic/react';
  
  import { useLocation } from 'react-router-dom';
  import { bookmarkOutline, mailOutline, mailSharp } from 'ionicons/icons';
  import './Menu.css';
  
  const Menu: React.FC<{session: any}> = ({session}) => {
    const location = useLocation();
    let parent: any = location.pathname.split('/')
    parent = `/${parent[1]}/${parent[2]}`
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>
              <a href='/'>{'Rincón del Valle'}</a>
            </IonListHeader>
            <IonNote>{session.email}</IonNote>
            <IonMenuToggle key={0} autoHide={false}>
              <IonItem className={parent === '/app/request' ? 'selected' : ''} href={'/app/request'}  detail={false}>
                <IonIcon slot="start" ios={mailOutline} md={mailSharp} />
                <IonLabel>{'Pedidos'}</IonLabel>
              </IonItem>
              <IonItem className={parent === '/app/history' ? 'selected' : ''} href={'/app/history'}  detail={false}>
                <IonIcon slot="start" ios={mailOutline} md={mailSharp} />
                <IonLabel>{'Historial'}</IonLabel>
              </IonItem>
              <IonItem className={parent === '/app/reports' ? 'selected' : ''} href={'/app/reports'}  detail={false}>
                <IonIcon slot="start" ios={mailOutline} md={mailSharp} />
                <IonLabel>{'Reportes'}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };
  
  export default Menu;
  
  /**
  
          <IonList id="labels-list">
            <IonListHeader>Labels</IonListHeader>
            <IonItem lines="none" key={0}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{'Family'}</IonLabel>
            </IonItem>
          </IonList>
   */