import React, { Component } from 'react'

export default class SocialButton extends Component {

	render() {

		return (
			<div>
				<a target='_blank' href={`https://twitter.com/home?status=${this.props.post.url}`} className='btn btn-default btn-xs btn-social-icon btn-twitter'> 
	    			<i className='fa fa-twitter-square'></i> 
	    		</a> 
	    		<a target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${this.props.post.url}`} className='btn btn-default btn-xs btn-social-icon btn-fb'> 
	    			<i className='fa fa-facebook-square'></i> 
	    		</a> 
	    		<a target='_blank' href={`https://plus.google.com/share?url=${this.props.post.url}`} className='btn btn-default btn-xs btn-social-icon btn-fb'> 
	    			<i className='fa fa-google-plus-square'></i> 
	    		</a> 
	    		<a target='_blank' href={`https://pinterest.com/pin/create/button/?url=${this.props.post.url}&amp;media=${this.props.post.images.standard_resolution.url}&amp;description=${this.props.post.title}`} className='btn btn-default btn-xs btn-social-icon btn-fb'> 
	    			<i className='fa fa-pinterest-square'></i> 
	    		</a> 
    		</div>
		)

	}
}