import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login';
import App from './App';
import isLogged from './middleware/isLogged';

interface Props{
    component:any;
    path : string;
    exact ?: any;
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
            <PrivateRoute path="/" exact component={App} />
            <Route path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
)

export default Routes;