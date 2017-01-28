import React, { Component } from 'react';
import {Link} from 'react-router'
import Comments from './Comments'

export default class SidebarWrapper extends Component {
  
    render() {
        return (
            <div className="col-xs-6 col-sm-4 sidebar-offcanvas" id="sidebar" role="navigation">
                <section className="widget">      
                    {this.props.sidebar}
                </section>
            </div>
        )
    }
};
