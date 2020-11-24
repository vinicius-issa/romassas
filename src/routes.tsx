import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login';
import isLogged from './middleware/isLogged';
import Snack from './components/salgados/Snack';
import Order from './components/orders/newOrder';

interface Props{
    component:any;
    path : string;
    exact ?: boolean;
}

const PrivateRoute = ({component: Component, ...rest}:Props) => (
    <Route
        {...rest}
        render={props => 
            isLogged() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            )
        }
    />
)

const Routes: React.FC<{}> = props => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/" exact component={()=><h1>Hello Wolrd</h1>} />
            <PrivateRoute path="/salgados/" component={Snack} />
            <PrivateRoute path="/pedidos/add" exact component={(props:any)=><Order {...props} />} />
            <PrivateRoute path="/pedidos/add/:id" component={Order} />
            <Route path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
)

export default Routes;