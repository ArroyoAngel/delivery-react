import React, { Component } from "react";
import { IonRouterOutlet, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonPage, IonContent, IonAvatar, IonItem, 
  IonSelect, IonSelectOption, IonLabel,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Graph from './Graph'
import TopMenu from '../../../components/TopMenu/Menu'
class Reports extends Component<{session: any}> {
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
        <TopMenu title='Reportes' session={session} />
        <IonContent>
          <IonRouterOutlet>
            <Redirect exact from={`${this.match.url}/`} to={`${this.match.url}/graph`}/>
            <Route 
              path={`${this.match.url}/graph`}
              render={ props => <Graph {...props} session={session}/>}
            />
          </IonRouterOutlet>
        </IonContent>
      </IonPage>
    </IonReactRouter>
  }
}
export default Reports;