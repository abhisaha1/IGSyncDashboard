import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../redux/actions/ActionCreators';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

class Main extends Component {

	render() {
	    return (
			<div className="page-container">
				<Header />
				<div className="container">
					<div className="row row-offcanvas row-offcanvas-left">
						<Sidebar 
							connectionClicked={this.props.connectionClicked}
						/>
						<div className="col-xs-12 col-sm-9">
							<p/><p/>
				        	{ React.cloneElement(this.props.children, this.props) }
						</div>
					</div>
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
