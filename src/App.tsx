import React, { Component } from 'react'
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/custom.css'

/* View app */
import ViewApp from './views/app'
import ViewUser from './views/user'
import ViewMain from './views'
import Error from './views/error'

setupIonicReact();
class AuthRoute extends Component <{ path: string, authUser: any }> {
  isDemo: any = null
  constructor(props: any){
    super(props)
  }
  render() {
    return (
      <Route
        path={this.props.path}
        render={props => 
          this.props.authUser? (
            <ViewApp session={this.props.authUser} {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: '/user/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

const App: React.FC = () => {
  let credential: any = localStorage.getItem('credential')
  let user: any = localStorage.getItem('user')
  const loginUser = credential&&user?{
    ...JSON.parse(user),
    ...JSON.parse(credential),
  }:null
  return (
    <IonApp>
      <IonReactRouter>
      <IonReactRouter>
        <AuthRoute
          path = '/app'
          authUser={loginUser}
        />
        <Route 
          path={"/"}
          exact
          render={ props => <ViewMain {...props} />}
        />
        <Route 
          path="/user"
          render={ props => <ViewUser {...props}/>}
        />
        <Route
          path={"/error"}
          render={ props => <Error {...props} />}
        />
      </IonReactRouter>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
