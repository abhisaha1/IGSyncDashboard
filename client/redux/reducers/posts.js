var ActionTypes     = require('../actions/ActionTypes');

var initalState = {
	data: [],
	posts_loading: true,
	posts_loaded: false,
	post: {},
	post_loading: true,
	post_loaded: false,
	count: 0,
	loadMore: false
}

function deepCopy(obj,cb) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    cb(copy);
}
function structuredClone(obj) {
	  const oldState = history.state;
	  history.replaceState(obj, null);
	  const clonedObj = history.state;
	  history.replaceState(oldState, null);
	  return clonedObj;
};
function instagram(state=initalState, action) {

	switch(action.type) {
      	case ActionTypes.GET_DB_POSTS:
      		action.payload.data.map(post => {
      			post.images.standard_resolution.loadUrl = post.images.standard_resolution.url;
      			post.images.standard_resolution.url = '/images/post.png';
      		})
      		return Object.assign({}, state, {
                data : (state.loadMore) ? state.data.concat(...action.payload.data) : [...state.data],
                posts_loading: false,
        		posts_loaded: true,
        		count: action.payload.count,
        		loadMore: action.loadMore
            });

	    case ActionTypes.GET_DB_SINGLE_POST:
			return {
				...state,
        		post: action.payload,
        		post_loading: false,
        		post_loaded: true
	      	};
      	case ActionTypes.LAZY_LOADED:
      		return {
      			...state,
      			data: action.payload
      		}
      		
      	case ActionTypes.REQUEST_DB_POSTS:
			return {
				...state,
				posts_loading: true,
				posts_loaded: false,
        		post_loading: true,
        		post_loaded: false,
        		loadMore: action.loadMore
	      	};
  		default:
  			break;


	}
	return state;
}

export default instagram;
