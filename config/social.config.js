module.exports = {

	instagram_old: {
		client_secret: '5236bac2f7ee477fadf2f5cbc23fb849',
		client_id: '395c883b5db04872960d13fd422ce51f',
		baseUrl: 'https://api.instagram.com',
		getAuthUrl: function(redirect_uri) {
			let endpoint = this.baseUrl + '/oauth/authorize';
			return `${endpoint}?client_id=${this.client_id}&redirect_uri=${redirect_uri}&response_type=code`;
			//return endpoint + '?client_id=' + this.client_id + '&redirect_uri='+ redirect_uri +'&response_type=token;
		},
		getTokenUrl: function(redirect_uri) {
			return this.baseUrl + '/oauth/access_token';
		}
	},
	instagram: {
		client_secret: '4e0794722c3b4669aa0912dbd4bfbacf',
		client_id: '065d5f714da54c6ca2027478a004aed6',
		baseUrl: 'https://api.instagram.com',
		getAuthUrl: function(redirect_uri) {
			let endpoint = this.baseUrl + '/oauth/authorize';
			return `${endpoint}?client_id=${this.client_id}&redirect_uri=${redirect_uri}&response_type=code`;
			//return endpoint + '?client_id=' + this.client_id + '&redirect_uri='+ redirect_uri +'&response_type=token;
		},
		getTokenUrl: function(redirect_uri) {
			return this.baseUrl + '/oauth/access_token';
		}
	}

}