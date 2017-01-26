var ActionTypes     = require('../actions/ActionTypes');
import moment from 'moment'

var initalState = {
	data: [],
	loading: false
}

function filterByTag(data, tag) {

	return data.filter(function(item, index){
		return (item.tags.indexOf(tag) >= 0)
	})

}

function formatData(data) {

	let formattedData = [];
	data.forEach((item) => {
		let post = {
			title: 'Instagram Post',
			body: item.caption.text,
			author: item.caption.from.full_name,
			likes: item.likes.count,
			comments: item.comments.count,
			created_on: moment.unix(item.created_time).format("YYYY-MM-DD HH:mm:ss"),
			images: JSON.stringify(item.images),
			tags: item.tags.join(', '),
			post_id: item.id,
		};
		formattedData.push(post);
	})
	return formattedData;
}

function instagram(state=initalState, action) {

	
	switch(action.type) {
		case ActionTypes.GET_IG_IMAGES:

			let filteredData = filterByTag(action.payload, 'nature');
			let formattedData = formatData(filteredData);

			return {
				...state,
        		data: [...state.data, ...formattedData],
        		loading: false
	      	};
      	case ActionTypes.REQUEST_IG_IMAGES:
			return {
				...state,
				loading: true
	      	};
  		default:
  			break;


	}
	return state;
}

export default instagram;
