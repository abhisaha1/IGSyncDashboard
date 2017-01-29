import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../redux/actions/ActionCreators';
import SocialButtons from '../components/SocialButtons'
import SidebarWrapper from '../components/SidebarWrapper';
import About from '../components/About';

class Card extends Component {


	render() {
		
		return (
			<article className='card'>
				<header>
					<Link to={'post/' + this.props.post.url }>
						<div className="media">
							<img width='100%' src={this.props.post.images.standard_resolution.url}/>
						</div>
					</Link>
				</header>	
				<div className='content-area'>
				    <div className='content'>{this.props.post.body }</div>
				    <footer>
				    	<div className='share pull-left'> 
				    		<SocialButtons post={this.props.post}/>
			    		</div>
			    		<div className='comment-count pull-right'> 
			    			<a target='_blank' href='https://www.instagram.com/p/-T1WIcPdWJ/' className='btn btn-default btn-xs btn-social-icon btn-fb'> 
			    				<i className='fa fa-heart'></i><span> {this.props.post.likes}</span> 
			    			</a> 
			    			<a href='http://cliptales.com/instapost/swing/' className='btn btn-default btn-xs btn-social-icon btn-fb'> 
			    				<i className='fa fa-comments'></i><span> {this.props.post.comments}</span> 
			    			</a> 
		    			</div>
		    			<div className='clearfix'/>
				    </footer>
			    </div>
		  	</article>
		)
	}
}

class Home extends Component {

	constructor(props){
		super(props);
	}
	
	static prefetchData = [
		(params) => ActionCreators.getPosts(params.page_no)
	];

	componentDidMount() {
		if(!this.props.posts.posts_loaded) {
			this.props.getPosts();
		}
	}
	render() {
		if(this.props.posts.posts_loading) {
			return (
				<div>
            		Loading..
				</div>
			)
		}
		const posts = this.props.posts.data.map((post, i) => {
			return <Card key={i} post={ post } />
		})
        return (
        	<div>
        		<div className="jumbotron">
				  <h1>Cliptales</h1>
				  <p>Where paperclips come to life and do weird things</p>
				</div>
				<div className="row row-offcanvas row-offcanvas-left">
					<SidebarWrapper sidebar={<About/>} />
					<div className="col-xs-12 col-sm-8" style={{'marginTop': '30px'}}>
					<section className='grid-container'>
				    	{posts}
					</section>
					</div>
				</div>
            </div>
        );

	}

}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getPosts: ActionCreators.getPosts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
