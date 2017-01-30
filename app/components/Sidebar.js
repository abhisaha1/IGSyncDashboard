import React, { Component } from 'react';
import {Link} from 'react-router'

export default class Sidebar extends Component {

    render() {
        return (
            <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
                <ul className="nav">
                    <li><Link to="/connections" className="active">Connections</Link></li>              
                    <li><Link to="/posts" className="active">Posts</Link></li>              
                </ul>
            </div>

        )
    }

}

