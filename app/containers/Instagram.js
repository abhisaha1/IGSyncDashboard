import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ActionCreators from '../redux/actions/ActionCreators';
import { Link } from 'react-router';
import Loader from '../components/Loader'

class Card extends Component {

	render() {
		
		let connections = this.props.connections;
		return (
		    <tr>
				<td><img width="60" src={this.props.post.images.low_resolution.url}/></td>
				<td>{this.props.post.body}</td>
				<td>{this.props.post.tags}</td>
				<td className="text-center">{this.props.post.likes}</td>
				<td className="text-center">{this.props.post.comments}</td>
		    </tr>
		)
	}
}
class Instagram extends Component {

	componentDidMount() {
		this.props.getPosts();
	}
	startSync(e) {
		e.preventDefault();
		this.props.getInstagramImages(this.props.connections.instagram.access_token, () => {
			this.props.startSync();
		});
	}
	render() {
		if(this.props.posts.loading) {
			return (
				<Loader />
			)
		}

		let cards = this.props.posts.data.map((post,i) => {
			return <Card key={i} post={post} />
		});

		let syncing = '',
			disabled = '',
			status = '',
			visibility = 'hide';

		if(this.props.instagram.loading || this.props.posts.inserting) {
			syncing = <img width="16" src="/images/loading.svg" />
			disabled = 'disabled'
			visibility = ''
		}

		if(this.props.instagram.loading) {
			status = 'Fetching posts from Instagram'
		}

		if(this.props.posts.inserting) {
			status = 'Inserting posts in database';
		}

		return (
			<div>
				<div className="btn-group">
					<Link disabled={disabled} className="btn btn-default btn-sm" onClick={(evt) => this.startSync(evt)}>
						{syncing} Sync
					</Link>
					<span className={"label label-primary pull-right " + visibility}>{status}</span>
				</div>
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Image</th>
							<th>Caption</th>
							<th>Tags</th>
							<th>Likes</th>
							<th>Comments</th>
						</tr>
					</thead>
					<tbody>
						{cards}
					</tbody>
				</table>
			</div>
		)

	}

}

const mapStateToProps = (state) => {
  return {
    connections: state.connections,
    instagram: state.instagram,
    posts: state.posts
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    startSync: ActionCreators.startSync,
    getInstagramImages: ActionCreators.getInstagramImages,
    getPosts: ActionCreators.getPosts,
    getConnections: ActionCreators.getConnections
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Instagram);

