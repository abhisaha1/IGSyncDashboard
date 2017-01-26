var ActionTypes     = require('../actions/ActionTypes');

var initalState = {
	data: [],
	loading: true,
	inserting: false
}

function instagram(state=initalState, action) {

	
	switch(action.type) {
      	case ActionTypes.GET_DB_POSTS:
			return {
				...state,
        		data: [...state.data, ...action.payload],
        		loading: false
	      	};
      	case ActionTypes.REQUEST_DB_POSTS:
			return {
				...state,
				loading: true
	      	};
      	case ActionTypes.INSERTING_POST:
			return {
				...state,
				inserting: true
	      	};
      	case ActionTypes.INSERTING_POST_COMPLETE:
			return {
				...state,
				data: [...state.data, ...action.payload],
				inserting: false
	      	};
  		default:
  			break;


	}
	return state;
}

export default instagram;
