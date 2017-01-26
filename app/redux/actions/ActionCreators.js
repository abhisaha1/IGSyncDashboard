import ActionTypes from './ActionTypes'
import $ from 'jquery';

export function getConnections() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_CONNECTIONS
        });

        fetch('/get-connections')
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                dispatch({
                    type: ActionTypes.GET_CONNECTIONS,
                    payload: response
                })
            });
    }
}
export function startSync(access_token) {

    return (dispatch, store) => {
        dispatch({
            type: ActionTypes.INSERTING_POST
        });
        let igData = store().instagram.data;
        $.ajax({
            url: '/insert-posts',
            method: 'POST',
            data: {
                data: igData
            },
            success: function() {
                dispatch({
                    type: ActionTypes.INSERTING_POST_COMPLETE,
                    payload: igData
                });
            }
        })
    };
}

export function getInstagramImages(access_token, callback) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_IG_IMAGES
        });

        let url = 'https://api.instagram.com/v1/users/364550466/media/recent/?access_token=' + access_token;
        var data = [];

        const getImages = (url) => {
            dispatch({
                type: ActionTypes.REQUEST_IG_IMAGES,
                payload: true
            })
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: url,
                success: function(response) {
                    if (response.meta.code === 200) {
                        dispatch({
                            type: ActionTypes.GET_IG_IMAGES,
                            payload: response.data
                        })
                        if (response.pagination.next_url) {
                            getImages(response.pagination.next_url);
                        } else {
                            callback();
                        }
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }

        getImages(url);
    }
}

export function getPosts() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_DB_POSTS
        });

        let url = '/get-posts';
        var data = [];

        const getIGPosts = (url) => {
            dispatch({
                type: ActionTypes.REQUEST_DB_POSTS,
                payload: true
            })
            $.get(url, function(response) {
                dispatch({
                    type: ActionTypes.GET_DB_POSTS,
                    payload: response
                })
            })
        }

        getIGPosts(url);
    }
}

export function saveAccessToken(user_id, access_token) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SAVING_IG_ACCESS_TOKEN,
            payload: true
        });

        $.ajax({
            url: '/handle_ig_auth',
            method: 'POST',
            data: {
                user_id: user_id,
                access_token: access_token
            },
            success: function() {
                dispatch({
                    type: ActionTypes.SAVED_ACCESS_TOKEN,
                    payload: false
                })
            }
        })

    }
}

export function connectNetwork(network) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_CONNECTIONS
        });
    }
}

export function disconnectNetwork(network) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_CONNECTIONS
        });


    }
}