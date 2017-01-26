var pool = require('../../config/mysql.config').pool;
import moment from 'moment'

export function insertPosts(req) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {

        	let data = req.body.data;
            var values = [];
			data.forEach(function(post){
				let item = [post.post_id, post.title, post.body, post.author, post.likes, post.comments, post.created_on, post.images, post.tags];
				values.push(item);
			})
            //insert the message
            connection.query("INSERT INTO posts (post_id, title, body, author, likes, comments, created_on, images, tags) VALUES ?", [values], function (err, rows) {
                if (err) throw err;
                connection.release()
                resolve(true);
            });

        });

    });
}

export function getPosts(req) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {

            connection.query("SELECT * FROM posts",function(err, rows) {
				if (err) throw err;
				connection.release();
				resolve(rows);
			});

        });

    });
}
