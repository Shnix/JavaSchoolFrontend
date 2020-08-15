import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Drivers from './Drivers'
import Vehicles from './Vehicles'
import Orders from './Orders'
import Home from '../home/Home'
import DriverInfo from './DriverInfo'


const Router = (props) => (
    <Switch>
        <Route path='/' component={Home} exact/>
          <PrivateRoute path='/vehicles' component={Vehicles} />
          <PrivateRoute path='/orders' component={Orders} />
          <PrivateRoute path='/drivers' component={Drivers} />
          <PrivateRoute path='/driverinfo' component={DriverInfo}/>
    </Switch>

)

const isAuthenticated = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);



export default Router;