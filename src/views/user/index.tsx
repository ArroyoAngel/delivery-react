import React, { Component } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Register from './Register'
import Login from './Login'
class Main extends Component {
  match: any = {}
  constructor(props: any){
    super(props)
    this.match = props.match
  }
  render(): React.ReactNode {
    return <IonReactRouter>
      <IonRouterOutlet>
        <Redirect exact from={`${this.match.url}/`} to={`${this.match.url}/register`}/>
        <Route 
          path={`${this.match.url}/register`}
          render={ props => <Register {...props} />}
        />
        <Route 
          path={`${this.match.url}/login`}
          render={ props => <Login {...props} />}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  }
}
export default Main;