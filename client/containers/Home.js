import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../redux/actions/ActionCreators';
import SocialButtons from '../components/SocialButtons'
import SidebarWrapper from '../components/SidebarWrapper';
import About from '../components/About';
import Masonry from 'react-masonry-component'

class Card extends Component {

	render() {
		
		return (
			<article className='col-sm-12 col-md-6'>
				<div className='card'>
					<header>
						<Link to={'/post/' + this.props.post.url }>
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
			    </div>
		  	</article>
		)
	}
}

class LoadMore extends Component {
	
	constructor(props){
		super(props);
		this.handleLoadMore = this.handleLoadMore.bind(this);
	}

	loadMoreStatus() {
        if(this.props.posts.data.length < this.props.posts.count) {
        	return true;
        }
    }
	handleLoadMore(e) {
		e.preventDefault();
		let page_no = 2;
		if(this.props.props.params.page_no) {
			page_no = parseInt(this.props.props.params.page_no) + 1;
		}

		this.context.router.push('/page/'+ page_no)
		//this.props.props.getPosts(page_no);
	}

	render() {
		if(!this.loadMoreStatus()) {
			return <div>Nothing to load</div>
		}
		return (
			<div className="col-lg-12">
				<Link className="btn btn-default btn-sm" onClick={(e) => this.handleLoadMore(e)}>Load More</Link>
			</div>
		)
	}
}
LoadMore.contextTypes = {
  router: React.PropTypes.object.isRequired
};

var masonryOptions = {
    transitionDuration: 0
};


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
	componentWillReceiveProps(nextProps) {
		if(this.props.params.page_no != nextProps.params.page_no) {
			this.props.getPosts(nextProps.params.page_no, true);
		}
	}

	render() {
		if(this.props.posts.posts_loading) {
			return (
				<div>
	        		<div className="jumbotron">
					  <h1>Cliptales</h1>
					  <p>Where paperclips come to life and do weird things</p>
					</div>
					<div className="row row-offcanvas row-offcanvas-left">
						<SidebarWrapper sidebar={<About/>} />
						<div className="col-xs-12 col-sm-8" style={{'marginTop': '30px'}}>
							Loading..
						 	<LoadMore posts={this.props.posts} props={this.props} getPosts={this.props.getPosts}/>
						</div>
					</div>
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
							<Masonry
				                className={''} // default ''
				                elementType={'div'} // default 'div'
				                options={masonryOptions} // default {}
				                disableImagesLoaded={false} // default false
				                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
				            >
				                {posts}
				            </Masonry>
						 	
					 	</section>
					 	<LoadMore posts={this.props.posts} props={this.props} getPosts={this.props.getPosts}/>
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
