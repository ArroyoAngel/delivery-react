import React, { Component } from "react";
import { IonRouterOutlet, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonPage, IonContent, IonAvatar, IonItem, 
  IonSelect, IonSelectOption, IonLabel,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Form from './Form'
import TopMenu from '../../../components/TopMenu/Menu'
class Agroquimicos extends Component<{session: any}> {
  match: any = {}
  user: any = null
  constructor(props: any){
    super(props)
    this.match = props.match
    this.user = localStorage.getItem('user')
  }
  public state: any = {
    loginUser: { name: '' }
  }
  componentDidMount(){
    this.setState({
      loginUser: { 
        ...JSON.parse(this.user)
      }
    })
  }
  render(): React.ReactNode {
    const session=this.props.session
    return <IonReactRouter>
      <IonPage>
        <TopMenu title='Pedidos' session={session} />
        <IonContent>
          <IonRouterOutlet>
            <Redirect exact from={`${this.match.url}/`} to={`${this.match.url}/form`}/>
            <Route 
              path={`${this.match.url}/form`}
              render={ props => <Form {...props} session={session}/>}
            />
          </IonRouterOutlet>
        </IonContent>
      </IonPage>
    </IonReactRouter>
  }
}
export default Agroquimicos;