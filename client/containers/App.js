import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../redux/actions/ActionCreators';
import Header from '../components/Header';

class Main extends Component {

	render() {
	    return (
			<div className="page-container">
				<div className="container">
		        	{ React.cloneElement(this.props.children, this.props) }
				</div>
			</div>
	    )
  	}

}

/*
  Here we create an <App/> component which is just our <Main/> component with it's props
  populated with our actions and our state
  We're injecting the data at the top level and passing it down, but you can connect() any component to make the actions and the store available to you. 
*/
const mapStateToProps = (state) => {
  return {
    connections: state.connections
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    connectionClicked: ActionCreators.connectionClicked
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
