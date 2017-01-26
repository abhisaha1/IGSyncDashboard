var pool = require('../../config/mysql.config').pool;
import moment from 'moment'

export function getConnections() {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {

            connection.query("SELECT * FROM connections", function(err, rows) {
                if (err) throw err;
                connection.release();
                resolve(rows);
            });

        });

    });
}

export function insertConnection(data) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {

            let data = req.body.data;

            var msg = {
                access_token: data.access_token,
                network: data.network,
                username: data.user.username,
                user_id: data.user.id,
                user: JSON.stringify(data.user),
                created_on: moment.utc().format('YYYY-MM-DD HH:mm:ss')
            };
            //insert the message
            connection.query("INSERT INTO connections SET ?", msg, function(err, rows) {
                if (err) throw err;
                connection.release()
                resolve(true);
            });

        });

    });
}