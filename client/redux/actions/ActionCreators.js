import ActionTypes from './ActionTypes'
import $ from 'jquery';
import fetch from 'isomorphic-fetch';
import config from '../../../config/config'

export function getPosts(page_no = 1, loadMore = false) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_DB_POSTS
        });

        let url = `${config.apiUrl}/getPosts/page/${page_no}`;
        var data = [];

        const getIGPosts = (url) => {
            dispatch({
                type: ActionTypes.REQUEST_DB_POSTS,
                payload: true,
                loadMore: loadMore
            })
            
            return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                dispatch({
                    type: ActionTypes.GET_DB_POSTS,
                    payload: response,
                    loadMore: false
                })
            })
        }

        return getIGPosts(url);
    }
}
function deepCopy(obj,cb) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    cb(copy);
}
export function lazyLoadFinish(index) {

    return (dispatch, state) => {
        let posts = state().posts
        deepCopy(posts.data,(newState) => {
            newState.map((post, i) => {
                if(index == i) {
                    newState[i].images.standard_resolution.url = post.images.standard_resolution.loadUrl
                    delete newState[i].images.standard_resolution.loadUrl
                }
            });
            dispatch({
                type: ActionTypes.LAZY_LOADED,
                payload: newState
            });
        });
        
    }
}

export function getPost(title) {
    
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_DB_POSTS
        });
        let url = `${config.apiUrl}/getPostsByUrl/${title}`;
    
        var data = [];

        const getIGPosts = (url) => {
            dispatch({
                type: ActionTypes.REQUEST_DB_POSTS,
                payload: true,
                loadMore: false
            })
            
            return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                dispatch({
                    type: ActionTypes.GET_DB_SINGLE_POST,
                    payload: response,
                    loadMore: false
                })
            })
        }

        return getIGPosts(url);
    }
}

export function getComments(post_id) {
    
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_COMMENTS
        });
        let url = `${config.apiUrl}/getCommentsByPostId/${post_id}`;
    
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                dispatch({
                    type: ActionTypes.GET_COMMENTS,
                    payload: response
                })
            })
        
    }
}


