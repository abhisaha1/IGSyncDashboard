var pool = require('../../config/mysql.config').pool;
var siteConfig = require('../../config/site.config');
import moment from 'moment'

export function insertPosts(req,params) {
    

    return new Promise((resolve,reject) => {
        pool.getConnection((err, connection) => {

        	let data = req.body.data;
            var values = [];
			data.forEach((post)=> {
				let item = [post.post_id, post.title, post.body, post.author, post.likes, post.comments, post.created_on, JSON.stringify(post.images), post.tags, post.url, post.refer_url];
				values.push(item);
			})
            connection.query('TRUNCATE TABLE posts', (err, rows)=> {
                connection.query("INSERT INTO posts (post_id, title, body, author, likes, comments, created_on, images, tags, url, refer_url) VALUES ?", [values], function (err, rows) {
                    if (err) throw err;
                    connection.release()
                    resolve(true);
                });
            })
        });

    });
}

export function getPosts(req, params) {

    return new Promise((resolve,reject) => {
        
        if(params.length != 2) {
            reject({data:[], count: 0, status: 500, message: 'Invalid paramaters'})
            return;
        }
        //First page should be actually 0th page.)
        let low = (params[1] - 1) * siteConfig.items_per_page;
        let high = siteConfig.items_per_page;
        pool.getConnection((err, connection) => {


            connection.query("SELECT count(*) as count FROM posts",(err, rows) => {
                let count = rows[0].count;
                connection.query("SELECT * FROM posts ORDER BY created_on DESC LIMIT ?,?",[low,high],(err, rows) => {
    				if (err) throw err;
    				connection.release();
                    rows.map((row, i) => {
                        rows[i].images = JSON.parse(row.images);
                    })
    				resolve({data:rows, count: count, status: 200});
    			});
            })

        });

    });
}

export function getAllPosts(req, params) {
    
    return new Promise((resolve,reject) => {
        
        pool.getConnection((err, connection) => {
            connection.query("SELECT count(*) as count FROM posts",(err, rows) => {
                let count = rows[0].count;
                connection.query("SELECT * FROM posts ORDER BY created_on DESC",(err, rows) => {
                    if (err) throw err;
                    connection.release();
                    rows.map((row, i) => {
                        rows[i].images = JSON.parse(row.images);
                    })
                    resolve({data:rows, count: count, status: 200});
                });
            })

        });

    });
}

export function getPostsByUrl(req, params) {
    return new Promise((resolve) => {
        pool.getConnection((err, connection) => {
            connection.query("SELECT * FROM posts WHERE url=?", params[0] ,(err, rows) => {
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

