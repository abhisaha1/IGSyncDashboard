import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
	App,
	Home,
  	Post
} from './containers';

export default (
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/post/:title" component={Post}></Route>
      </Route>
);