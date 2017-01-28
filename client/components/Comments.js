import React, {Component} from 'react'
import moment from 'moment'

class CommentStatus extends Component {

    render() {
        return (
            <section className="widget">      
                <h2 className="widget-title">Comments</h2>     
                <span dangerouslySetInnerHTML={{__html: this.props.text}} />
            </section>
        )
    }
}
class CommentItem extends Component {

    render() {
        let comment = this.props.comment;
        return (
            <li>
                <a href="https://colorlib.com/dazzling/bullet-point-test/" className="tab-thumb thumbnail">
                    <img width="60" height="60" src={comment.from.profile_picture} className="attachment-tab-small size-tab-small wp-post-image" alt=""/> </a>
                <div className="content">
                    <a className="author-name" href="">
                        {comment.from.username}
                    </a>
                    {comment.text}
                    <i className='pull-right'><small>{moment.unix(comment.created_time).fromNow()}</small></i>
                </div>
            </li>
        )
    }
}

export default class Comments extends Component {

	render() {
		if(this.props.comments.loading) {
                return <CommentStatus text='Loading..'/>
            }

            let comments = this.props.comments.data.map((comment)=> <CommentItem comment={comment}/>)
            
            if(comments.length === 0) {
                return <CommentStatus text={`No comments yet. <a href='${this.props.refer_url}'>Be the first one to comment.</a>`}/>
            }
            return (
                <section className="widget">      
                    <h2 className="widget-title">Comments</h2>     
                    <ul id="popular-posts">
                        {comments}
                    </ul>
                </section>
            )
	}
}