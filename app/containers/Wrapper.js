import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../redux/actions/ActionCreators';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default class Wrapper extends Component {

	render() {
	    return (
			<div className="page-container">
				{ React.cloneElement(this.props.children, this.props) }
			</div>
	    )
  	}

}
