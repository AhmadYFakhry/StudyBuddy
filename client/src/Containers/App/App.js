import React from 'react'
import Auth from '../../HOC/Auth'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage'
import RegistrationFrom from '../../Components/Register/Register.js'
import Dashboard from '../../Components/Dashboard/Dashboard';
import ProfilePage from '../../Components/ProfilePage/ProfilePage';
import Gateway from '../Gateway/Gateway';
import SocketAuth from '../../GroupStudy/Auth/Auth';
import GroupStudy from '../../GroupStudy/GroupStudy/GroupStudy';

const App = () => {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => Auth.authenticate() ?
      (<Component {...props} />) :
      (<Redirect to={{ pathname: "/" }} />)} />);
  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/user" component={ProfilePage} />
        <Route exact path='/login' component={AuthPage} />
        <Route exact path='/' component={AuthPage} />

        <Route exact path='/register' component={RegistrationFrom} />
        <PrivateRoute exact path="/dashboard/solo" component={Dashboard} />
        <PrivateRoute exact path="/dashboard" component={Gateway} />
        <PrivateRoute exact path="/dashboard/group/auth" component={SocketAuth} />
        <PrivateRoute exact path="/dashboard/group/study" component={GroupStudy} />
      </Router>
    </div>
  )
}

export default App;
