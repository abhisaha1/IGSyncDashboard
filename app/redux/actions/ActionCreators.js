import ActionTypes from './ActionTypes'
import $ from 'jquery';
import config from '../../../config/config'

let apiUrl = config.apiUrl;

export function getConnections() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_CONNECTIONS
        });

        fetch(`${config.apiUrl}/getConnections`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let connections = {}
            response.forEach((connection) => {
                connection.active = true;
                connections[connection.network] = connection;
            })
            return connections;
        })
        .then((response) => {
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
            url: `${config.apiUrl}/insertPosts`,
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

export function getInstagramImages(callback) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_IG_IMAGES
        });
        fetch(`${config.apiUrl}/getConnectionByName/instagram`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            let url = `https://api.instagram.com/v1/users/${response.data.user_id}/media/recent/?access_token=${response.data.access_token}`;
            var data = [];

            const getImages = (url) => {
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
        });

    }
}

export function getPosts() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.REQUEST_DB_POSTS
        });

        let url = `${apiUrl}/getAllPosts`;
        var data = [];

        const getIGPosts = (url) => {
            dispatch({
                type: ActionTypes.REQUEST_DB_POSTS,
                payload: true
            })
            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(response => {
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
            url: `${apiUrl}/handleIgAuth`,
            method: 'POST',
            data: {
                user_id: user_id,
                access_token: access_token
            },
            success: function() {
                dispatch({
                    type: ActionTypes.SAVED_IG_ACCESS_TOKEN,
                    payload: false
                })
            },
            error: (response) => {
                dispatch({
                    type: ActionTypes.INVALID_TOKEN,
                    payload: response.responseJSON
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