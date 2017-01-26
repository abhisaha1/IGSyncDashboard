var ActionTypes     = require('../actions/ActionTypes');
	
var initalState = {
	instagram: {
		active: false,
		access_token: '',
		user_id: '',
		saving: false
	},
	facebook: {
		active: false,
		accessToken: ''
	},
	twitter: {
		active: false,
		accessToken: ''
	},
	loading: true,
}

function connections(state=initalState, action) {

	
	switch(action.type) {
		case ActionTypes.GET_CONNECTIONS:
			return {
				...state,
				...action.payload,
				loading: false
	      	};
      	case ActionTypes.REQUEST_CONNECTIONS:
			return {
				...state,
				loading: true
	      	};
      	case ActionTypes.SAVING_IG_ACCESS_TOKEN:
			return {
				...state,
				instagram: {...state.instagram, saving: true}
	      	};
      	case ActionTypes.SAVED_IG_ACCESS_TOKEN:
			return {
				...state,
				instagram: {...state.instagram, saving: false}
	      	};
  		default:
  			break;


	}
	return state;
}

export default connections;
