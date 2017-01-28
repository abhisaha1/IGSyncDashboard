var pool = require('../../config/mysql.config').pool;

export function getCommentsByPostId(req,params) {
    return new Promise((resolve) => {
        getConnections('instagram')
        .then((connection) => {
            fetch(`https://api.instagram.com/v1/media/${params[0]}/comments/?access_token=${connection.access_token}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                resolve(response.data)
            })
        })
        
    });
}

function getConnections(network) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {

            connection.query("SELECT * FROM connections WHERE network=?",network, function(err, rows) {
                if (err) throw err;
                connection.release();
                resolve(rows[0]);
            });

        });

    });
}