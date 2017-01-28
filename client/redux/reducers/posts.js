var ActionTypes     = require('../actions/ActionTypes');

var initalState = {
	data: [],
	posts_loading: true,
	posts_loaded: false,
	post: {},
	post_loading: true,
	post_loaded: false,
	
}

function instagram(state=initalState, action) {

	
	switch(action.type) {
      	case ActionTypes.GET_DB_POSTS:
			return {
				...state,
        		data: [...action.payload],
        		posts_loading: false,
        		posts_loaded: true,
	      	};
	    case ActionTypes.GET_DB_SINGLE_POST:
			return {
				...state,
        		post: action.payload,
        		post_loading: false,
        		post_loaded: true
	      	};
      	case ActionTypes.REQUEST_DB_POSTS:
			return {
				...state,
				posts_loading: true,
				posts_loaded: false,
        		post_loading: true,
        		post_loaded: false,
	      	};
  		default:
  			break;


	}
	return state;
}

export default instagram;
