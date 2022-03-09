import React, { Component, Fragment } from "react";
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../../components/SideMenu/Menu';

import Request from './Request';
import Main from './Main';

class App extends Component<{session:any}> {
  match: any = {}
  constructor(props: any){
    super(props)
    this.match = props.match
  }
  render(): React.ReactNode {
    const session = this.props.session
    return <IonReactRouter>
        <IonSplitPane contentId="main">
        <Menu session={session} />
        <IonRouterOutlet id="main">
          <Redirect exact from={`${this.match.url}/`} to={`${this.match.url}/main`}/>
          <Route 
            path={`${this.match.url}/request`}
            render={ props => <Request session={session} {...props}/>}
          />
          <Route 
            path={`${this.match.url}/main`}
            render={ props => <Main session={session} {...props}/>}
          />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  }
}
export default App;