import ActionTypes from './ActionTypes'
import $ from 'jquery';
import fetch from 'isomorphic-fetch';

export function getPosts() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_DB_POSTS
        });

        let url = 'http://localhost:4000/getPosts';
        var data = [];

        const getIGPosts = (url) => {
            dispatch({
                type: ActionTypes.REQUEST_DB_POSTS,
                payload: true
            })
            
            return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                dispatch({
                    type: ActionTypes.GET_DB_POSTS,
                    payload: response
                })
            })
        }

        return getIGPosts(url);
    }
}

export function getPost(title) {
    
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_DB_POSTS
        });
        let url = `http://localhost:4000/getPostsByUrl/${title}`;
    
        var data = [];

        const getIGPosts = (url) => {
            dispatch({
                type: ActionTypes.REQUEST_DB_POSTS,
                payload: true
            })
            
            return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                dispatch({
                    type: ActionTypes.GET_DB_SINGLE_POST,
                    payload: response
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
        let url = `http://localhost:4000/getCommentsByPostId/${post_id}`;
    
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


