import React, {Component} from 'react';
import Header from '../components/Header';

export default class Main extends Component {

	render() {
	    return (
			<div className="page-container">
				<Header />
				<div className="container">
					{ React.cloneElement(this.props.children, this.props) }
				</div>
			</div>
	    )
  	}

}
