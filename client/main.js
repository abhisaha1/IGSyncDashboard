/*
  Import Dependencies
*/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'
import 'babel-polyfill';


/*
  Import Components
*/
import App from './containers/App';
import Home from './containers/Home';
import Connections from './containers/Connections';
import Instagram from './containers/Instagram';

/* Import our data store */
import store, { history } from './store';

/*
  Rendering
  This is where we hook up the Store with our actual component and the router
*/
render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/connections" component={Connections}></Route>
        <Route path="/instagram/display" component={Instagram}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
);