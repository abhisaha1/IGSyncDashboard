import React from 'react';
import { Route, IndexRoute } from 'react-router';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer'

import {
	App,
	Home,
	Connections,
	Posts,
	Login
} from './containers';
function requireAuth() {

}
export default (
      <Route path="/" component={App}>
            <Route path="/login" component={Login}></Route>
            <Route path="/connections" component={Connections}></Route>
            <Route path="/posts" component={Posts}></Route>
      </Route>
);

/**
<Route component={EnsureLoggedInContainer}>
                <Route path="/connections" component={Connections}></Route>
                <Route path="/posts" component={Posts}></Route>
            </Route>
*/