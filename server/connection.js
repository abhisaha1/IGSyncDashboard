var socialConfig = require('../config/social.config');
var request = require('request');

export default function Connection(app) {

    return {
        instagram: function() {
            let redirect_uri = '/handle_ig_auth';
            return {
                authorize_ig_user: function(req, res) {
                    res.redirect(socialConfig.instagram.getAuthUrl(`${req.protocol}://${req.headers.host}${redirect_uri}`));
                },
                handle_ig_auth: function(req, res, cb) {

                    var params = {
                        client_id: socialConfig.instagram.client_id,
                        client_secret: socialConfig.instagram.client_secret,
                        grant_type: 'authorization_code',
                        redirect_uri: `${req.protocol}://${req.headers.host}${redirect_uri}`,
                        code: req.query.code
                    };

                    request.post({
                        url: socialConfig.instagram.getTokenUrl(),
                        form: params
                    }, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            cb(null, body)
                        }else{
                            cb(error);
                        }
                    });
                }
            }
        }
    }
}