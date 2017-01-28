import React from 'react';
import ReactDOM from 'react-dom/server';
//import Helmet from 'react-helmet';

import { match, RouterContext } from 'react-router'

import { Provider } from 'react-redux';

import routes from './routes';
//import prefetchComponentData from './utils/prefetchComponentData';

import store from './redux/createStore';


let prefetchComponentData = function(dispatch, components, params) {
 
  const needs = components.reduce((prev, current) => {
    return (current.prefetchData || []).concat(prev);
  }, []);
 
  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}

let t=  function(req, res) {

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      prefetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(renderHTML)
        .then((html) => res.status(200).send(html))
        .catch(err => res.end(err.message));
    } else {
      res.status(404).send('Not found')
    }

    function renderHTML() {

        const initialState = store.getState();

        const renderedComponent = ReactDOM.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
        );

        //let head = Helmet.rewind();

        const HTML = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/css/bootstrap.min.css">
                <link rel="stylesheet" href="http://bootswatch.com/cosmo/bootstrap.min.css">
                <link rel="stylesheet" href="/css/style.css">
              </head>
              <body id='dashboard'>
                <div id="app">${renderedComponent}</div>
                <script type="application/javascript">
                   window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
                <script src="/static/dashboard-bundle.js"></script>
              </body>
            </html>    
        `;

        return HTML;
    }
  })
};
module.exports = t;