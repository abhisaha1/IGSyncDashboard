var pool = require('../../config/mysql.config').pool;
import moment from 'moment'

export function insertPosts(req,params) {
    
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {

        	let data = req.body.data;
            var values = [];
			data.forEach(function(post){
				let item = [post.post_id, post.title, post.body, post.author, post.likes, post.comments, post.created_on, JSON.stringify(post.images), post.tags, post.url, post.refer_url];
				values.push(item);
			})
            connection.query('TRUNCATE TABLE posts', function(err, rows){
                connection.query("INSERT INTO posts (post_id, title, body, author, likes, comments, created_on, images, tags, url, refer_url) VALUES ?", [values], function (err, rows) {
                    if (err) throw err;
                    connection.release()
                    resolve(true);
                });
            })
            

        });

    });
}

export function getPosts(req) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {

            connection.query("SELECT * FROM posts",function(err, rows) {
				if (err) throw err;
				connection.release();
                rows.map((row, i) => {
                    rows[i].images = JSON.parse(row.images);
                })
				resolve(rows);
			});

        });

    });
}

export function getPostsByUrl(req, params) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {
            console.log("Api params in api",params);
            connection.query("SELECT * FROM posts WHERE url=?", params[0] ,function(err, rows) {
                if (err) throw err;
                connection.release();
                rows.map((row, i) => {
                    rows[i].images = JSON.parse(row.images);
                })
                resolve(rows[0]);
            });

        });

    });
}

