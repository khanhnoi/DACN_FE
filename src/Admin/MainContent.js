import React, { Component } from 'react';
import { Accounts } from './Accounts/Accounts';
import { Products } from './Products/Products';
import { Summary } from './Summary/Summary';
import { Orders } from './Orders/Orders';
import { ShopUsers } from './ShopUsers/ShopUsers';
import { Route, Switch, Redirect } from "react-router-dom";
import { Profile } from "./Profile/Profile";
import { Shops } from "./Shop/Shops";

export class MainContent extends Component {

    render(){
        return <main className={ this.props.style }>
            <Switch>
                <Route path='/accounts' component={Accounts} />
                <Route path="/shops" component={ Shops } />
                <Route path='/shopusers' component={ShopUsers} />
                <Route path='/products' component={Products} />
                <Route path='/orders' component={Orders} />
                <Route path='/summary' component={Summary} />
                <Route path='/profile' render={() => <Profile role={ this.props.role } />} />
            </Switch>
        </main>
    }

}