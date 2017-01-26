var fs = require('fs');
var sessions = require("express-session");
var MySQLStore = require('express-mysql-session')(sessions);
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var path = require('path');
var locked = false;
import Model from './models/Model'
var dbConfig = require('./config/mysql.config').config;
///dbConfig.debug = true;
var SessionStore = new MySQLStore(dbConfig);
import fetch from 'isomorphic-fetch'
import SocialConnection from './server/connection'
import createLocation from 'history/lib/createLocation';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match,Route } from 'react-router';
import {store } from './app/store'

function checkPermission(req,res,callback) {
    SessionStore.get(req.sessionID,function(err,data){
        callback(data);
    })
}

module.exports.serve = function (app) {

    app.get("/dashboard", function (req, res) {
        res.render(path.join(__dirname + '/public/dashboard.html'));
    });

    //Instagram Requests
    // let conection = SocialConnection(app);
    // let igConnection = conection.instagram();
    // app.get('/authorize_ig_user', igConnection.authorize_ig_user);
    // app.get('/handle_ig_auth', (req,res) => igConnection.handle_ig_auth(req,res,function(err, response){
    //     if(!err) {
    //         response = JSON.parse(response);
    //         response.network = 'instagram';
    //         Model.insertConnection(response,()=>{});
    //         //res.send(response);
    //         res.redirect(`${req.protocol}://${req.headers.host}#/connections`)
    //     }
    // }));

    app.get('/get-connections', function (req, res) {
        Model.getConnections(function(response){
            let output = {};
            response.forEach(function(connection){
                output[connection.network] = {
                    active: true,
                    ...connection
                }
            });
            res.set('Content-Type', 'application/json');
            res.send(output);
        })
    });

    app.get('/get-posts', function (req, res) {
        Model.getPosts({},function(response){
            res.set('Content-Type', 'application/json');
            res.send(response);
        })
    });

    app.post('/insert-posts', function (req, res) {

        let data = req.body.data;

        Model.insertPosts(data,function(response){
            res.set('Content-Type', 'application/json');
            res.send(response);
        })
    });

    app.post('/handle_ig_auth', (req,res) => {
        let access_token = req.body.access_token;
        let user_id = req.body.user_id;
        fetch(`https://api.instagram.com/v1/users/${user_id}/?access_token=${access_token}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let data = {};
            data.network = 'instagram';
            data.access_token = access_token;
            data.user = response.data;
            Model.insertConnection(data,()=>{});
        })
        
    });


// class AppView extends React.Component {
//   render() {
//     return (
//       <div id="app-view">
//         <h1>Todos</h1>
//         <hr />
//         {this.props.children}
//       </div>
//     );
//   }
// }
//     app.use((req, res) => {
//       const location = createLocation(req.url);
//       let routes = <Route name="app" component={AppView} path="/">
//                    </Route>
//       match({ routes, location }, (err, redirectLocation, renderProps) => {
//         if (err) { 
//           console.error(err);
//           return res.status(500).end('Internal server error');
//         }
//         if (!renderProps) return res.status(404).end('Not found.');
        
//         const InitialComponent = (
//           <RouterContext {...renderProps} />
//         );
//         const componentHTML = renderToString(InitialComponent);
//         const HTML = ''
//         res.end(HTML);
//       });
//     });
    app.use((req, res) => {
      const location = createLocation(req.url);
      let routes = <Route name="app" component={AppView} path="/">
                   </Route>
      match({ routes, location }, (err, redirectLocation, renderProps) => {
        
        let reduxState = escape(JSON.stringify(store.getState()));
        console.log(reduxState);
        let componentHTML = renderToString(
          <RoutingContext {...renderProps}/> 
        );
        res.render(path.join(__dirname + '/public/dashboard.html'),{ componentHTML, reduxState })
      });
    });

};