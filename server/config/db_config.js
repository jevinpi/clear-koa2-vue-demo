const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    database: 'demo_db',
    password: 'jevin',
    user: 'root'
});

function poolConn (sql, values) {
    return  new Promise((resolve, reject) => {
        pool.getConnection( function (err, conn) {
            if (err) throw err;        
            conn.query(sql, values, function (err, data) {
                if (err) {
                    throw err;
                };
                conn.release();
                resolve(data);
            })
        });
    })
}

module.exports = poolConn;
