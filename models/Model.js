var pool = require('../config/mysql.config').pool;
import moment from 'moment'

module.exports = {

	getConnections: function(callback) {

		var self = this;
		pool.getConnection(function(err, connection){

			connection.query("SELECT * FROM connections", function(err, rows) {
				if (err) throw err;
				connection.release();
				callback(rows);
			});

		});
	},
	insertConnection: function(data, callback) {

		pool.getConnection(function(err,connection) {

			var msg = {
                access_token: data.access_token,
                network: data.network,
                username: data.user.username,
                user_id: data.user.id,
                user: JSON.stringify(data.user),
                created_on: moment.utc().format('YYYY-MM-DD HH:mm:ss')
            };
            //insert the message
            connection.query("INSERT INTO connections SET ?", msg, function (err, rows) {
                if (err) throw err;
                connection.release()
                callback(true);
            });

		})
	},
	insertPosts: function(data, callback) {
		pool.getConnection(function(err,connection) {

			var values = [];
			data.forEach(function(post){
				let item = [post.post_id, post.title, post.body, post.author, post.likes, post.comments, post.created_on, post.images, post.tags];
				values.push(item);
			})
            //insert the message
            connection.query("INSERT INTO posts (post_id, title, body, author, likes, comments, created_on, images, tags) VALUES ?", [values], function (err, rows) {
                if (err) throw err;
                connection.release()
                callback(true);
            });

		})
	},
	getPosts: function(data, callback) {

		var self = this;
		pool.getConnection(function(err, connection){

			connection.query("SELECT * FROM posts",function(err, rows) {
				if (err) throw err;
				connection.release();
				callback(rows);
			});

		});
	},

}