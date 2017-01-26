import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
	App,
	Home,
	Connections,
	Instagram
} from './containers';

export default (
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/connections" component={Connections}></Route>
        <Route path="/instagram/display" component={Instagram}></Route>

        <Route path="/dashboard" component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="/connections" component={Connections}></Route>
        </Route>
      </Route>

);